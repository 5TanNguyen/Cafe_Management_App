import React, {useState,  useEffect} from 'react';
import { 
    SafeAreaView,
    StyleSheet,
    View, 
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Modal,
    RefreshControl,
    Button

} from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { BarCodeScanner } from 'expo-barcode-scanner';

import axios from 'axios';

import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ScanScreen({navigation}){
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned');

    const askForCameraPermission = () =>{
        (async () =>{
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted')
        })()
    }

    // Request Camera Permission
    useEffect(()=> {
        askForCameraPermission();
    }, []);

    // What happens when we scan the bar code
    const handleBarCodeScanned = ({type, data}) =>{
        setScanned(true);
        setText(data);
        console.log('Type: ' + type + '\nData: ' + data)
    }

    // Check permission and return the screens
    if(hasPermission === null){
        return(
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>
        )
    }

    if(hasPermission === false){
        return(
            <View style={styles.container}>
                <Text style={{margin: 10}}>No access to camera</Text>
                <Button title={'Allow camera'} onPress={()=> askForCameraPermission()} />
            </View>
        )
    }
    
    return (
      <View style={styles.container}>
          <View style={styles.barcodebox}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{height: 400, width: 400}} />
          </View>
          <Text style={styles.maintext}>{text}</Text>

          {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
      </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato',
    },

    maintext: {
        fontSize: 16,
        margin: 20,

    },

    sv_table: {
      bottom: 0,
      marginBottom : 0,
      margin: 10,
    },
  
    item_table: {
      padding: 15,
      marginBottom : 5,
      borderRadius : 15,
      backgroundColor: "#DCDCDC"
    },
  
    txt_name: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 5
    },
    
    txt_table: {
      fontSize: 20,
      marginTop: 5,
      fontWeight : "bold",
      alignItems : 'center',
      justifyContent : 'center'
    },

    txtClose:{
      padding: 10,
      borderWidth: 1,
      borderRadius: 10,
      color: 'white',
      backgroundColor: 'black',
      textAlign: 'center',
      marginTop: 5
    },

    textButton: {
      padding: 15,
      backgroundColor: 'red',
      display: 'flex',
      textAlign : 'center',
      width: '100%',
      marginTop: 15,
      borderRadius: 10
    },

    text_input: {
      padding: 10,
      borderWidth: 1,
      borderColor: "#e2e2e2",
      borderRadius: 10,
      marginTop: 10
    },

    form:{
      padding: 15,
      backgroundColor: "gray",
      marginTop: 20
    },

    label : {
      fontSize : 25,
      color: '#ffff',
      // backgroundColor : '#ffff',
      fontWeight : 'bold',
      textAlign : 'center',
    }
  
});
  