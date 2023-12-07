import { StatusBar } from 'expo-status-bar';
import { RootComponent, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  RefreshControl
} from 'react-native';
import axios from 'axios';

import AntDesign from 'react-native-vector-icons/AntDesign';
//import MainContainer from './navigation/MainContainer';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


const App = () => {

  const [list, setList] = useState([]);
  const [pro, setPro] = useState([]);
  const [list_OD, setList_OD] = useState([])
  const [visible, setVisible] = useState(false);
  const [visible_Pro, setVisible_Pro] = useState(false);
  const [visible_OD, setVisible_OD] = useState(false);
  const [visible_List_OD, setVisible_List_OD] = useState(false);

  // Orders
  const [o_t_id, set_o_t_id] = useState();
  const [o_t_id_old, set_o_t_id_old] = useState();
  const [o_number, set_o_number] = useState();
  const [o_br_id, set_o_br_id] = useState();

  // Order Detail
  const [od_o_id, set_od_o_id] = useState();
  const [od_pro_id, set_od_pro_id] = useState();
  const [od_pro_name, set_od_pro_name] = useState();
  const [od_quantity, set_quantity] = useState();
  const [od_price, set_price] = useState();
  const [o_cost, set_o_cost] = useState();

  

  // Slide
  const [hideId, set_hideId] = useState(null);

  const [refresh, setRefresh] = useState(false);

  const pullMe = () =>
  {
    setRefresh(true)

    axios({
      url: "http:/192.168.2.32:5555/ds_dondat",
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
  

  useEffect(() => {
    getList()
  }, [])
  const getList = () => {
    axios({
      url: "http:/192.168.2.32:5555/ds_dondat",
      method: "GET" 
    }).then((res)=>{
        // var response = res.data;
        // setList(response.data)
        // console.log(res.data)
        setList(res.data)
    }).catch(function(err)
    {
      console.log(err + ' hehe');
    })
  }

  const getPro = () => {
    axios({
      url: "http:/192.168.2.32:5555/dssanpham",
      method: "GET" 
    }).then((res)=>{
        setPro(res.data)
    }).catch(function(err)
    {
      console.log(err + ' getPro');
    })
  }

  const handleDelete = (item) =>{
    axios({
      url: "http:/192.168.2.32:5555/ds_dondat/delete?o_id=" + item.o_id,
      method: "DELETE" 
    }).then((res)=>{
        getList();
    }).catch(function(err)
    {
      console.log(err + ' hehe');
    })
  }

  const handleSave = (item) =>{

    if(hideId == null){
      const orders = {
        o_t_id: Number(o_t_id),
        o_number: Number(o_number),
        o_br_id : Number(o_br_id)
  
        // "o_t_id": o_t_id,
        // "o_number": o_number
      };
  
      console.log(orders);
      axios({
        url: "http:/192.168.2.32:5555/ds_dondat/add",
        method: "POST",
        data : orders,
        headers: {
          "Content-Type" : "application/json"
        } 
      }).then((res)=>{
          console.log(orders)
          console.log('5tan')
          getList();
          set_o_t_id()
          set_o_number()
          set_o_br_id()
          setVisible(false)
      }).catch(function(err)
      {
        console.log(err + ' hehe');
      })
    }
    else
    {
      const orders = {
        o_id: hideId,
        o_t_id: Number(o_t_id),
        o_t_id_old: Number(o_t_id_old),
        o_number: Number(o_number)
  
        // "o_t_id": o_t_id,
        // "o_number": o_number
      };
  
      console.log(orders);
      axios({
        url: "http:/192.168.2.32:5555/ds_dondat/edit",
        method: "POST",
        data : orders,
        headers: {
          "Content-Type" : "application/json"
        } 
      }).then((res)=>{
          console.log(orders)
          console.log('5tan')
          getList();
          set_o_t_id()
          set_o_number()
          setVisible(false)
      }).catch(function(err)
      {
        console.log(err + ' hehe');
      })
    }

    
  }
  // Chi tiết đơn đặt //
  const get_List_OD = (item)=>{
    const od_o_id = item.o_id;
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

  const handleList_OD = (item)=>{
    setVisible_List_OD(true)
    get_List_OD(item)
  }


  const add_OD = (item) =>{
    set_od_o_id(item.o_id)
    set_od_pro_id(1);
    set_quantity(1);
    set_price(29000)
    set_o_cost(item.o_cost)
    setVisible_OD(true);
    set_hideId(item.o_id)
  }

  const onChangeText_ProId = (value) =>
  {
    set_od_pro_id(value)
  }

  const onChangeText_SoLuong = (value) =>{
    set_quantity(value)
  }

  const onChangeText_Gia = (value) =>{
    set_price(value)
  }

  const add_OD_SAVE = (item) =>{
    const od = {
      o_id : od_o_id,
      od_pro_id : Number(od_pro_id),
      od_quantity : Number(od_quantity),
      od_price : Number(od_price),
      o_cost : Number(o_cost)
    };

    console.log(od);

    axios({
      url: "http:/192.168.2.32:5555/themchitietdondat_OD",
        method: "POST",
        data : od,
        headers: {
          "Content-Type" : "application/json"
        } 
    }).then((response)=>{
      console.log(od);
      console.log(" 5tan OD");
      getList();
      set_od_pro_id(1);
      set_quantity(1);
      set_price(29000);
      setVisible_OD(false)
    }).catch(function(err){
      console.log(err + " hehe OD")
    })
  }

  const del_OD = (item) =>{
    const od_id = item.od_id;
    const od_o_id = item.od_o_id;
    const od_price = item.od_price;
    const o_cost = item.o_cost;

    console.log(od_price);
    console.log(o_cost);
    axios({
      url: "http:/192.168.2.32:5555/chitietdondatt/delete?od_id=" 
      + od_id 
      + "&od_o_id=" + od_o_id
      + "&od_price=" + od_price
      + "&o_cost=" + o_cost,
      method: "GET"
    }).then((res)=>{
      console.log('Delete Done');
      get_List_OD(item);
    }).catch(function(err){
      console.log(err);
    })

    console.log(od_id);
  }

  const handleEdit = (item) =>{
    setVisible(true)
    set_hideId(item.o_id)
    set_o_t_id(item.o_t_id);
    set_o_t_id_old(item.o_t_id);
    set_o_number(item.o_number);
  }

  const handleVisibleModal = () =>{
    set_o_t_id(0);
    set_o_number(0);
    set_o_br_id(1);
    setVisible(!visible);
    set_hideId(null)
  }

  const handleVisiblePro = () =>{
    getPro();
    setVisible_Pro(!visible_Pro);
  }

  const handleVisibleModal_OD = () =>{
    set_od_pro_id(0);
    set_quantity(0);
    set_price(0);
    setVisible_OD(!visible_OD);
  }

  const handleVisibleModal_ListOD = ()=>{
    getList();
    setVisible_List_OD(!visible_List_OD);
  }

  const onChangeText_SoBan = (value) =>{
    set_o_t_id(value)
  }

  const onChangeText_SoNguoi = (value)=>{
    set_o_number(value)
  }

  const onChangeText_ChiNhanh = (value)=>{
    set_o_br_id(value)
  }
// https://oblador.github.io/react-native-vector-icons/
  return (
    <SafeAreaView>
      <View style={styles.header_container}>
        <Text style={styles.txt_main}>Số lượng: {list.length}</Text>
        <TouchableOpacity
          onPress={handleVisibleModal}
          style={styles.btnNewOrder}
        >
          {/* <Text style={styles.textButton}>Add Order</Text> */}
          <AntDesign name='rest' style={{color: 'red', fontSize: 50}} />
        </TouchableOpacity>

      </View>

      <View style={styles.viewSanPham}>
        <TouchableOpacity
          onPress={handleVisiblePro}
          style={styles.btnSanPham}
        >
          <Text style={styles.textSanPham}>Sản Phẩm</Text>
        </TouchableOpacity>
      </View>
      
      <Modal
        animationType='slide'
        visible={visible_Pro}
        style={styles.form}
      >
        <SafeAreaView>
          <View style={styles.form}>
            <Text
              style = {styles.label}
            > Sản Phẩm</Text>

            <ScrollView style={styles.sv_bottom}
                    refreshControl={
                      <RefreshControl
                        refreshing = {refresh}
                        onRefresh = {()=>pullMe()}
                      />
                    }
                  >
                    {pro?.map((item, index) => {
                      return (
                        <View style={styles.item_product} key={index}>
                          <View>
                            <Text style={styles.txt_item}>{item.pro_id}</Text>
                            <Text style={styles.txt_name}>{item.pro_name}</Text>
                            <Text style={styles.txt_name}>{item.pp_price}</Text>
                          </View>
                        </View>
                      )
                })}
              </ScrollView>

            <TouchableOpacity
              onPress={handleVisiblePro}
            >
              <Text style={styles.txtClose}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      <Modal
        animationType='slide'
        visible={visible}
        style={styles.form}
      >
        <SafeAreaView>
          <View style={styles.form}>
            <Text
              style = {styles.label}
            > Đơn Đặt {hideId}</Text>

            <Text
              style = {{
                fontSize : 15,
                fontWeight : 'bold'
              }}
            > {'\n'}
              Số bàn
            </Text>

            <TextInput
              value={String(o_t_id)}
              // value={o_t_id}
              style={styles.text_input}
              placeholder='Số bàn'
              onChangeText={onChangeText_SoBan}
            ></TextInput>

            <TextInput
              value={String(o_t_id_old)}
              style={{
                height: 0,
                width: 0
              }}
            ></TextInput>

            <Text
              style = {{
                fontSize : 15,
                fontWeight : 'bold'
              }}
            > {'\n'}
              Số người
            </Text>

            <TextInput
              value={String(o_number)}
              // value={o_number}
              style={styles.text_input}
              placeholder='Số người'
              onChangeText={onChangeText_SoNguoi}
            ></TextInput>

            <Text
              style = {{
                fontSize : 15,
                fontWeight : 'bold'
              }}
            > {'\n'}
              Chi Nhánh
            </Text>

            <TextInput
              value={String(o_br_id)}
              // value={o_number}
              style={styles.text_input}
              placeholder='Chi nhánh'
              onChangeText={onChangeText_ChiNhanh}
            ></TextInput>

            <TouchableOpacity
              onPress={handleSave}
              style={styles.btnContainer}
            >
              <Text style={styles.textButton}>
                {hideId == null ? "THÊM" : "CẬP NHẬT" }
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleVisibleModal}
            >
              <Text style={styles.txtClose}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>


      
      <Modal
        animationType='slide'
        visible={visible_List_OD}
      >
        <SafeAreaView>

          <View style={styles.form}>

            <Text style={ styles.label}>   CHI TIẾT ĐƠN ĐẶT</Text>
          

            <Text style={styles.txt_name}> Tổng Bill: {String(o_cost)} VNĐ</Text>
          <ScrollView>

            {list_OD?.map((item, index) => {
              return (
                <View style={styles.item_product} key={index}>
                  <View>
                    <Text style={styles.txt_item}>ID: {item.od_id}</Text>
                    <Text style={styles.txt_name}>{item.pro_name}</Text>
                    <Text style={styles.txt_name}>Số lượng {item.od_quantity}</Text>
                    <Text style={styles.txt_name}>{item.od_price} VNĐ</Text>
                    {/* <Text style={styles.txt_name}> Tổng Bill: {String(o_cost)} VNĐ</Text> */}
                    
                  </View>

                  <View>
                    <TouchableOpacity
                      onPress={ () =>del_OD(item)}
                    >
                      <Text style={styles.txt_delete}>XÓA</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            })}
            </ScrollView>
            <TouchableOpacity
                onPress={handleVisibleModal_ListOD}
              >
                <Text style={styles.txtClose}>Đóng</Text>
              </TouchableOpacity>
            </View>
        </SafeAreaView>
      </Modal>

      <Modal
        animationType='fade'
        visible={visible_OD}
      >
        <SafeAreaView>
          <View style={styles.form}>
            <Text style={styles.label}> Chi tiết Đơn đặt: {od_o_id}</Text>
            <TextInput
              value={String(od_o_id)}
              style={{
                height: 0,
                width: 0
              }}
            ></TextInput>

            <Text>Mã Thức Uống</Text>
            <TextInput
              value={String(od_pro_id)}
              // value={o_number}
              style={styles.text_input}
              onChangeText={onChangeText_ProId}
            ></TextInput>

            <Text>Số lượng</Text>
            <TextInput
              value={String(od_quantity)}
              // value={o_number}
              style={styles.text_input}
              onChangeText={onChangeText_SoLuong}
            ></TextInput>

            <Text>Giá</Text>
            <TextInput
              value={String(od_price)}
              // value={o_number}
              style={styles.text_input}
              onChangeText={onChangeText_Gia}
            ></TextInput>

            {/* <Text>Tổng Bill</Text> */}
            <TextInput
              value={String(o_cost)}
              style={{
                height: 0,
                width: 0
              }}
            ></TextInput>
            

            <TouchableOpacity
              onPress={add_OD_SAVE}
              style={styles.btnContainer}
            >
              <Text style={styles.textButton}>
                THÊM MÓN
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleVisibleModal_OD}
            >
              <Text style={styles.txtClose}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      
      <ScrollView style={styles.sv_bottom}
        refreshControl={
          <RefreshControl
            refreshing = {refresh}
            onRefresh = {()=>pullMe()}
          />
        }
      >

        {list?.map((item, index) => {
          return (
            <View style={styles.item_product} key={index}>
              <View>
                <Text style={styles.txt_item}>STT: {item.o_id}</Text>
                <Text style={styles.txt_name}>Bàn {item.o_t_id}/ {item.o_number} <AntDesign name='user' style={{color: 'blue', fontSize: 20}} /></Text>
                <Text style={styles.txt_name}>{item.o_cost} VNĐ</Text>
              </View>

              <View>

              <TouchableOpacity
                  onPress={ () =>handleList_OD(item)}
                >
                  <AntDesign name='infocirlceo' style={{color: 'blue', fontSize: 30}} />
                  {/* <Text style={styles.txt_order}>Detail</Text> */}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={ () =>add_OD(item)}
                >
                  <AntDesign name='pluscircleo' style={{color: 'green', fontSize: 30}} />
                  {/* <Text style={styles.txt_order}>Order</Text> */}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={ () =>handleEdit(item)}
                >
                  {/* <Text style={styles.txt_edit}>Edit</Text> */}
                  <AntDesign name='edit' style={{color: 'orange', fontSize: 30}} />
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={ () =>handleDelete(item)}
                >
                  <AntDesign name='delete' style={{color: 'red', fontSize: 20}} />
                  <Text style={styles.txt_delete}>Delete</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          )
        })}
      </ScrollView>

      <StatusBar style="auto" />

    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  header_container: {
    marginTop: 0,
    padding: 15,
    backgroundColor: '#eeeeee',
    flexDirection: 'row',
    justifyContent: 'space-between'

  },

  viewSanPham: {
    marginTop: -5,
    width: '100%',
    height: 60,
    // borderTopColor: 'black',
    // borderWidth: 2,
    backgroundColor: '#eeeeee',
    flexDirection: 'row',
    justifyContent: 'space-between'

  },

  btnSanPham: {
    marginTop: -10,
    width: '100%',
  },

  sv_bottom: {
    bottom: 0,
    marginBottom : 50
  },

  form:{
    padding: 15,
    backgroundColor: "#eeeeee",
    marginTop: 20,
    height: 500
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

  text_input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#e2e2e2",
    borderRadius: 10,
    marginTop: 10
  },

  txt_main: {
    fontSize: 35,
    fontWeight: "bold",
    color: 'red'
  },

  item_product: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e2e2",
    flexDirection: "row",
    justifyContent: "space-between"
  },

  txt_name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5
  },
  
  txt_item: {
    fontSize: 14,
    marginTop: 5
  },

  txt_delete: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    color: "red"
  },

  txt_order: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    color: "green"
  },

  txt_edit: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    color: "blue"
  },

  textButton: {
    padding: 15,
    backgroundColor: 'red',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    display: 'flex',
    textAlign : 'center',
    width: '100%',
    marginTop: 15,
    borderRadius: 10
  },

  textSanPham: {
    padding: 15,
    backgroundColor: 'red',
    display: 'flex',
    color: 'white',
    textAlign : 'center',
    width: '100%',
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 20,
    borderRadius: 10
  },

  label : {
    fontSize : 25,
    color: 'black',
    // backgroundColor : '#ffff',
    fontWeight : 'bold',
    textAlign : 'center'
  }
});
