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
    RefreshControl

} from 'react-native';

import axios from 'axios';

import AntDesign from 'react-native-vector-icons/AntDesign';

export default function TablesScreen({navigation}){

    const [list, setList] = React.useState([]);
    const [list_OD, setList_OD] = React.useState([]);
    const [order, setOrder] = React.useState([]);
    const [visible_Move, setVisible_Move] = React.useState(false);
    const [visible_Pay, setVisible_Pay] = React.useState(false);
    const [visible_ConfirmPay, setVisible_ConfirmPay] = React.useState(false);
    const [o_id_old, set_o_id_old] = React.useState();
    const [o_id_new, set_o_id_new] = React.useState();
    const [o_t_id, set_o_t_id] = React.useState();
    const [o_cost, set_o_cost] = React.useState();
    const [o_id_pay, set_o_id_pay] = React.useState();
    const [o_cost_pay, set_o_cost_pay] = React.useState();
    const [o_s_id, set_o_s_id] = React.useState();

    // Slide 
    const [hideId, set_HideId] = React.useState(null);

    React.useEffect(() => {
        getList()
    }, [])
    const getList = () => {
        axios({
            url: "http:/192.168.2.32:5555/dsban",
            method: "GET"
        }).then((res)=>{
            setList(res.data)
        }).catch(function(err)
        {
            console.log(err + ' Opps');
        })
    }
    
    const [refresh, setRefresh] = React.useState(false);

    const pullMe = () =>
    {
      setRefresh(true)

      axios({
        url: "http:/192.168.2.32:5555/dsban",
        method: "GET"
        }).then((res)=>{
            setList(res.data)
        }).catch(function(err)
        {
            console.log(err + ' Opps');
        })

      setTimeout(()=>{
        setRefresh(false)
      }, 500)
    }

    const get_Order = (item) =>
    {
      const t_id = item.t_id;
    axios({
      url: "http:/192.168.2.32:5555/getdondat?t_id=" + t_id,
      method: "GET"
    }).then((res)=>{
      setOrder(res.data)
      // set_o_cost(item.o_cost)
      // console.log(res.data)
      //console.log(item.od_o_id)
    }).catch(function(err){
      console.log(err);
    })
    }

    const handleVisibleMove = (item) =>{
      setVisible_Move(!visible_Move)
      get_Order(item)
      set_o_id_old(0)
      // console.log(get_Order(item))
      set_o_id_new(0)
      set_o_t_id(item.t_id)
      set_o_cost(0)
    }

     // Chi tiết đơn đặt //
    const get_List_OD = (item)=>{
      const od_o_id = item.orderID;
      axios({
        url: "http:/192.168.2.32:5555/chitietdondatt?o_id=" + od_o_id,
        method: "GET"
      }).then((res)=>{
        setList_OD(res.data)
        set_o_cost(item.o_cost)
        //console.log(res.data)
        //console.log(item.od_o_id)
      }).catch(function(err){
        console.log(err);
      })
  }

    const handleVisiblePay = (item) =>{
      setVisible_Pay(!visible_Pay)
      // get_Order(item)
      // set_o_id_old(0)
      // set_o_id_new(0)
      // set_o_t_id(item.t_id)
      // set_o_cost(0)
      get_List_OD(item)
    }

    const handleVisibleConfirmPay =(item) =>{
      setVisible_ConfirmPay(!visible_ConfirmPay)
      set_o_id_pay(item.od_o_id)
      set_o_cost_pay(item.o_cost)
      set_o_t_id(item.o_t_id)
      set_o_s_id(item.o_s_id)
      
    }

    const handleMove = (item) =>{

        const order = {
          o_t_id : Number(o_t_id),
          o_id_old: Number(o_id_old),
          o_id_new: Number(o_id_new),
          o_cost : Number(o_cost)
    
          // "o_t_id": o_t_id,
          // "o_number": o_number
        };
    
        console.log('o_id');
        console.log(o_cost);
        console.log(order);
        axios({
          url: "http:/192.168.2.32:5555/gopban",
          method: "POST",
          data : order,
          headers: {
            "Content-Type" : "application/json"
          } 
        }).then((res)=>{
            console.log(o_id_old)
            console.log('5tan')
            getList();
            setVisible_Move(false)
        }).catch(function(err)
        {
          console.log(err + ' hehe');
        })  
    }

    const handleConfirmPay = (item) =>{

      const order = {
        o_id : Number(o_id_pay),
        o_t_id: Number(o_t_id),
        s_id: Number(o_s_id),
        o_cost : Number(o_cost_pay)
      };
  
      console.log(order);
      axios({
        url: "http:/192.168.2.32:5555/thanhtoanmobile",
        method: "POST",
        data : order,
        headers: {
          "Content-Type" : "application/json"
        } 
      }).then((res)=>{
          getList();
          setVisible_Move(false)
      }).catch(function(err)
      {
        console.log(err + ' hehe');
      })  
  }

    const onChangeText_O_ID_OLD = (value) =>{
      set_o_id_old(value)
    }

    const onChangeText_O_ID_NEW = (value) =>{
      set_o_id_new(value)
    }

    const onChangeText_O_COST = (value) =>{
      set_o_cost(value)
    }
    
    return (
        <SafeAreaView>
            <View style={{flex : 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text
                    onPress={() => navigation.navigate('Đơn Đặt')}
                    style={{ fontSize: 26, fontWeight: 'bold'}}>Details Screen</Text>
            </View>

            <Modal
              animationType='slide'
              visible = {visible_Move}
            >
              <SafeAreaView>

                <View style={styles.form}>
                  <Text style={styles.label}>Gộp Bàn</Text>
                  <TextInput style={{height: 0, width: 0}}
                    value={String(o_t_id)}
                  >

                  </TextInput>

                  <Text
                    style = {{
                      fontSize : 15,
                      fontWeight : 'bold'
                    }}
                  > {'\n'}
                    Đơn hiện tại
                  </Text>
                  <ScrollView>

                    {order?.map((item, index) => {
                      return (
                        <View style={styles.item_product} key={index}>
                          
                          
                          <View>
                            <TextInput style={styles.text_input}
                            value={String(item.o_id)}
                            
                            ></TextInput>

                          <TextInput
                            style={styles.text_input}
                            value={String(item.o_cost)}
                          ></TextInput>

                          </View>
                        </View>
                      )
                    })}
                    </ScrollView>
                  
                    <Text
                    style = {{
                      fontSize : 15,
                      fontWeight : 'bold'
                    }}
                  > {'\n'}
                    Mời nhập lại đơn
                  </Text>

                    <TextInput
                    style={styles.text_input}
                    value={String(o_id_old)}
                    onChangeText={onChangeText_O_ID_OLD}
                  ></TextInput>

                   <TextInput
                    style={styles.text_input}
                    value={String(o_cost)}
                    onChangeText={onChangeText_O_COST}
                  ></TextInput>

                  
                    <Text
                      style = {{
                        fontSize : 15,
                        fontWeight : 'bold'
                      }}
                    > {'\n'}
                      
                      Gộp với đơn
                    </Text>

                  <TextInput
                    style={styles.text_input}
                    value={String(o_id_new)}
                    onChangeText={onChangeText_O_ID_NEW}
                  ></TextInput>

                  <TouchableOpacity
              onPress={handleMove}
              style={styles.btnContainer}
            >
              <Text style={styles.textButton}>
                GỘP
              </Text>
            </TouchableOpacity>

                  <TouchableOpacity
              onPress={handleVisibleMove}
            >
              <Text style={styles.txtClose}>Đóng</Text>
            </TouchableOpacity>
                </View>
              </SafeAreaView>
            </Modal>

            <Modal
        animationType='slide'
        visible={visible_Pay}
      >
        <SafeAreaView>

          <View style={styles.form}>

            <Text style={ styles.label}>   THANH TOÁN</Text>
          
          <ScrollView>

            {list_OD?.map((item, index) => {
              return (
                <View style={styles.item_product} key={index}>
                  <View>
                    <Text style={styles.txt_item}>ID: {item.od_id}</Text>
                    <Text style={styles.txt_name}>x{item.od_quantity} {item.pro_name}</Text>
                    <Text style={styles.txt_name}>{item.od_price} VNĐ</Text>
                    <Text style={styles.txt_name}>Tổng Bill: {String(item.o_cost)} VNĐ</Text>
                    <Text>__________________________________________________</Text>

                    <Text style={styles.txt_item}>
                      <TouchableOpacity
                        onPress={() =>handleVisibleConfirmPay(item)}>
                        <Text style={styles.textButton}>Thanh toán</Text>
                      </TouchableOpacity>
                    </Text>

                  </View>
                </View>
              )
            })}
            </ScrollView>



            <TouchableOpacity
                onPress={handleVisiblePay}
              >
                <Text style={styles.txtClose}>Đóng</Text>
              </TouchableOpacity>
            </View>
        </SafeAreaView>
      </Modal>

      <Modal
        animationType='slide'
        visible={visible_ConfirmPay}
      >
        <SafeAreaView>

          <View style={styles.form}>

            <Text style={ styles.label}>   XÁC NHẬN</Text>
          
            <TextInput
              value={String(o_id_pay)}
              style={styles.text_input}
            ></TextInput>

            <TextInput
              value={String(o_t_id)}
              style={styles.text_input}
            ></TextInput>

            <TextInput
              value={String(o_cost_pay)}
              style={styles.text_input}
            ></TextInput>

            <TextInput
              value={String(o_s_id)}
              style={styles.text_input}
            ></TextInput>

              <TouchableOpacity
                onPress={handleConfirmPay}
              >
                <Text style={styles.textButton}>Thanh Toán</Text>
              </TouchableOpacity>

            <TouchableOpacity
                onPress={handleVisibleConfirmPay}
              >
                <Text style={styles.txtClose}>Đóng</Text>
              </TouchableOpacity>
            </View>
        </SafeAreaView>
      </Modal>
            
            <ScrollView style={styles.sv_table}
              refreshControl={
                <RefreshControl
                  refreshing= {refresh}
                  onRefresh = {()=>pullMe()}
                />
              }
            >

              {list?.map((item, index) => {
                return (
                  <View style={styles.item_table} key={index}>
                    <View style={{
                        flexDirection : 'row',
                        width : '100%'
                        
                    }}>
                      <Text style={styles.txt_table}>BÀN : {item.t_id}
                        {'\n'}
                      
                      
                      {/* <Text style={styles.txt_name}>Vị trí : {item.t_position} / {item.t_seats} người</Text> */}
                      {
                          item.t_empty == 1 ?
                          <View
                            style={{
                              backgroundColor: '#1E90FF', 
                              flex: 5, 
                              height : 50,
                              width : 110,
                              borderRadius : 10,
                              alignItems : 'center',
                              justifyContent: 'center'
                            }}
                          >
                              <Text> 
                                Trạng thái : {item.t_empty}
                              </Text>
                          </View>
                          :
                          <View
                            style={{
                              backgroundColor: 'red', 
                              flex: 5, 
                              height: 50,
                              width : 110,
                              borderRadius : 10,
                              alignItems : 'center',
                              justifyContent: 'center'
                            }}
                          >
                              <Text>
                                Trạng thái : {item.t_empty}
                              </Text>
                          </View>
                      }

                      {
                          item.t_pay == 1 ?
                          <View
                            style={{
                              backgroundColor: 'green', 
                              flex: 5, 
                              height : 50,
                              left : 50,
                              width : '100%',
                              borderRadius : 10,
                              alignItems : 'center',
                              justifyContent: 'center',
                              padding : 10
                            }}
                          >
                              <Text>
                                  Thanh toán : {item.t_pay}
                              </Text>
                          </View>
                          :
                          <View
                            style={{
                              backgroundColor: '#808080', 
                              flex : 5, 
                              height: 50,
                              left : 50,
                              width : '100%',
                              borderRadius : 10,
                              alignItems : 'center',
                              justifyContent: 'center',
                              padding: 10
                            }}
                          >
                              <Text>
                                Thanh toán : {item.t_pay}
                              </Text>
                          </View>
                      }

                      <TouchableOpacity
                        onPress={() => handleVisibleMove(item)}
                      >
                        <AntDesign name='logout' style={{color: 'red', fontSize: 30, marginLeft: 10}} />
                      </TouchableOpacity>


                      {
                        item.t_empty == 1 ?
                        <View>
                          <Text></Text>
                        </View>
                        :
                        <TouchableOpacity
                        onPress={() => handleVisiblePay(item)}
                      >
                        <AntDesign name='check' style={{color: 'red', fontSize: 30, marginLeft: 10}} />
                      </TouchableOpacity>
                      }
                      

                      </Text>
                      
                    </View>
                  </View>
                )
              })}
              </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  
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
  