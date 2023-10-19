import * as React from 'react';
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
    Image,
    FeatherIcon,
    Switch,
    StatusBar

} from 'react-native';

import axios from 'axios';

import AntDesign from 'react-native-vector-icons/AntDesign';

import momoQR from './momo-qr-code.jpg'
import vcbQR from './vcb-qr-code.jpg'

export default function PayScreen({navigation}){

    const [visible_VCB, set_visible_VCB] = React.useState(false);

    const handleVisibleVCB = () =>
    {
        set_visible_VCB(!visible_VCB);
    }

    return (
        <SafeAreaView style={styles.containter}>
            <StatusBar style="light" />

            <Modal
                animationType='slide'
                visible = {visible_VCB}
            >
                <SafeAreaView>
                    <View style={styles.form}>
                        
                        <Text style={styles.label}>THÔNG TIN NGƯỜI NHẬN</Text>

                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                        }}>

                            <View
                            style={{
                              backgroundColor: '#A9A9A9', 
                              flex: 5, 
                              height : 50,
                              width : 100,
                              borderRadius : 10,
                              borderWidth: 1,
                              alignItems : 'center',
                              justifyContent: 'center'
                            }}
                          >
                              <Text style={styles.title_vcb}> 
                                Số Tài Khoản
                                1018610888                                
                              </Text>
                          </View>

                          <View
                            style={{
                              backgroundColor: '#A9A9A9', 
                              flex: 5, 
                              height : 50,
                              width : 100,
                              borderRadius : 10,
                              borderWidth: 1,
                              alignItems : 'center',
                              justifyContent: 'center'
                            }}
                          >
                              <Text style={styles.title_vcb}> 
                                Người Nhận
                                NGUYEN HUU TAN                                
                              </Text>
                          </View>
                        </View>
                        <View style={{
                            marginTop: 10,
                            marginBottom: 10,
                            height: 40,
                            width: '100%',
                            backgroundColor: '#696969',
                            borderWidth: 2,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',


                        }}>
                            <Text style={styles.title_vcb}>NỘI DUNG CK: '05'</Text>
                        </View>
                        <Image source={vcbQR}
                            style={{
                                marginTop: 0,
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                width: '80%',
                                height: '60%',
                                // resizeMode: 'stretch',
                                borderRadius: 15,
                            }} 
                        />

                        <TouchableOpacity
                            onPress={handleVisibleVCB}
                        >
                            <Text style={styles.txtClose}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

            </Modal>
           
            <Image source={momoQR} 
                style={{
                    marginTop: 5,
                    margin: 5,
                    width: '90%',
                    height: '90%',
                    borderRadius: 15,
                }} 
            />

            <Text style={styles.txt_item}>
                <TouchableOpacity
                    onPress={() => handleVisibleVCB()}>
                        <Text style={styles.textButton}>Chuyển Khoản</Text>
                    </TouchableOpacity>
            </Text>
            
        </SafeAreaView>
    )


}

const styles = StyleSheet.create({
  
    containter: {
      paddingVertical: 24,
      alignItems: 'center',
      justifyContent: 'center',
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
    },

    txt_item: {
        fontSize: 14,
        marginTop: -10
    },

    title_vcb: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },

    txt_vcb: {
        fontSize: 18,
        color: 'white',
    },

    textButton: {
        padding: 15,
        backgroundColor: '#3CD371',
        display: 'flex',
        textAlign : 'center',
        width: '100%',
        marginTop: 15,
        borderRadius: 10,
        borderWidth: 1,

    },

    txtClose:{
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        color: 'white',
        backgroundColor: '#3CD371',
        textAlign: 'center',
        marginTop: 5
    },
  
});
  