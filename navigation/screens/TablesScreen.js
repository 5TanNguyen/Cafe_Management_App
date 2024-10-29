import * as React from "react";
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
  Dimensions,
} from "react-native";

import axios from "axios";

import AntDesign from "react-native-vector-icons/AntDesign";

const { width, height } = Dimensions.get("window");

export default function TablesScreen({ navigation }) {
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
    getList();
  }, []);
  const getList = () => {
    axios({
      url: "http://10.10.4.43:5555/dsban",
      method: "GET",
    })
      .then((res) => {
        setList(res.data);
      })
      .catch(function (err) {
        console.log(err + " Opps");
      });
  };

  const [refresh, setRefresh] = React.useState(false);

  const pullMe = () => {
    setRefresh(true);

    axios({
      url: "http://10.10.4.43:5555/dsban",
      method: "GET",
    })
      .then((res) => {
        setList(res.data);
      })
      .catch(function (err) {
        console.log(err + " Opps");
      });

    setTimeout(() => {
      setRefresh(false);
    }, 500);
  };

  const get_Order = (item) => {
    const t_id = item.t_id;
    axios({
      url: "http://10.10.4.43:5555/getdondat?t_id=" + t_id,
      method: "GET",
    })
      .then((res) => {
        setOrder(res.data);
        // set_o_cost(item.o_cost)
        // console.log(res.data)
        //console.log(item.od_o_id)
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const handleVisibleMove = (item) => {
    setVisible_Move(!visible_Move);
    get_Order(item);
    set_o_id_old(0);
    // console.log(get_Order(item))
    set_o_id_new(0);
    set_o_t_id(item.t_id);
    set_o_cost(0);
  };

  // Chi tiết đơn đặt //
  const get_List_OD = (item) => {
    const od_o_id = item.orderID;
    axios({
      url: "http://10.10.4.43:5555/chitietdondatt?o_id=" + od_o_id,
      method: "GET",
    })
      .then((res) => {
        setList_OD(res.data);
        set_o_cost(item.o_cost);
        //console.log(res.data)
        //console.log(item.od_o_id)
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const handleVisiblePay = (item) => {
    setVisible_Pay(!visible_Pay);
    // get_Order(item)
    // set_o_id_old(0)
    // set_o_id_new(0)
    // set_o_t_id(item.t_id)
    // set_o_cost(0)
    get_List_OD(item);
  };

  const handleVisibleConfirmPay = (item) => {
    setVisible_ConfirmPay(!visible_ConfirmPay);
    set_o_id_pay(item.od_o_id);
    set_o_cost_pay(item.o_cost);
    set_o_t_id(item.o_t_id);
    set_o_s_id(item.o_s_id);
  };

  const handleMove = (item) => {
    const order = {
      o_t_id: Number(o_t_id),
      o_id_old: Number(o_id_old),
      o_id_new: Number(o_id_new),
      o_cost: Number(o_cost),

      // "o_t_id": o_t_id,
      // "o_number": o_number
    };

    axios({
      url: "http://10.10.4.43:5555/gopban",
      method: "POST",
      data: order,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(o_id_old);
        console.log("5tan");
        getList();
        setVisible_Move(false);
      })
      .catch(function (err) {
        console.log(err + " hehe");
      });
  };

  const handleConfirmPay = (item) => {
    const order = {
      o_id: Number(o_id_pay),
      o_t_id: Number(o_t_id),
      s_id: Number(o_s_id),
      o_cost: Number(o_cost_pay),
    };

    console.log(order);
    axios({
      url: "http://10.10.4.43:5555/thanhtoanmobile",
      method: "POST",
      data: order,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        getList();
        setVisible_Move(false);
      })
      .catch(function (err) {
        console.log(err + " hehe");
      });
  };

  const onChangeText_O_ID_OLD = (value) => {
    set_o_id_old(value);
  };

  const onChangeText_O_ID_NEW = (value) => {
    set_o_id_new(value);
  };

  const onChangeText_O_COST = (value) => {
    set_o_cost(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text
          onPress={() => navigation.navigate("Đơn Đặt")}
          style={styles.headerText}
        >
          Details Screen
        </Text>
      </View>

      <Modal animationType="slide" visible={visible_Move}>
        <SafeAreaView style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.form}>
            <Text style={styles.label}>Gộp Bàn</Text>

            <Text style={styles.sectionTitle}>Đơn hiện tại</Text>
            <ScrollView>
              {order?.map((item, index) => (
                <View style={styles.item_product} key={index}>
                  <TextInput
                    style={styles.text_input}
                    value={String(item.o_id)}
                  />
                  <TextInput
                    style={styles.text_input}
                    value={String(item.o_cost)}
                  />
                </View>
              ))}
            </ScrollView>

            <Text style={styles.sectionTitle}>Mời nhập lại đơn</Text>
            <TextInput
              style={styles.text_input}
              value={String(o_id_old)}
              onChangeText={onChangeText_O_ID_OLD}
            />
            <TextInput
              style={styles.text_input}
              value={String(o_cost)}
              onChangeText={onChangeText_O_COST}
            />

            <Text style={styles.sectionTitle}>Gộp với đơn</Text>
            <TextInput
              style={styles.text_input}
              value={String(o_id_new)}
              onChangeText={onChangeText_O_ID_NEW}
            />

            <TouchableOpacity onPress={handleMove} style={styles.btnContainer}>
              <Text style={styles.textButton}>GỘP</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleVisibleMove}>
              <Text style={styles.txtClose}>Đóng</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <ScrollView
        style={styles.tableList}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
        }
      >
        {list?.map((item, index) => (
          <View style={styles.item_table} key={index}>
            <View style={styles.tableRow}>
              <Text style={styles.tableText}>
                BÀN : {item.t_id}
                {"\n"}
              </Text>
              {item.t_empty == 1 ? (
                <View
                  style={[styles.tableStatus, { backgroundColor: "#1E90FF" }]}
                >
                  <Text>Trạng thái : {item.t_empty}</Text>
                </View>
              ) : (
                <View style={[styles.tableStatus, { backgroundColor: "red" }]}>
                  <Text>Trạng thái : {item.t_empty}</Text>
                </View>
              )}
              {item.t_pay == 1 ? (
                <View
                  style={[styles.tableStatus, { backgroundColor: "green" }]}
                >
                  <Text>Thanh toán : {item.t_pay}</Text>
                </View>
              ) : (
                <View
                  style={[styles.tableStatus, { backgroundColor: "#808080" }]}
                >
                  <Text>Thanh toán : {item.t_pay}</Text>
                </View>
              )}
              <TouchableOpacity onPress={() => handleVisibleMove(item)}>
                <AntDesign name="logout" style={styles.icon} />
              </TouchableOpacity>
              {item.t_empty == 1 ? null : (
                <TouchableOpacity onPress={() => handleVisiblePay(item)}>
                  <AntDesign name="check" style={styles.icon} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  form: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  label: {
    fontSize: 22,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 10,
  },
  item_product: {
    flexDirection: "row",
    marginVertical: 5,
  },
  text_input: {
    width: width * 0.8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  btnContainer: {
    width: width * 0.6,
    marginVertical: 15,
    backgroundColor: "#ff6347",
    paddingVertical: 12,
    borderRadius: 5,
  },
  textButton: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  txtClose: {
    color: "blue",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  tableList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  item_table: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  tableText: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  tableStatus: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  icon: {
    color: "red",
    fontSize: 24,
    marginHorizontal: 10,
  },
});
