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
    TouchableWithoutFeedback,
    Dimensions,

} from 'react-native';

import Swiper from 'react-native-swiper';

import axios from 'axios';

import AntDesign from 'react-native-vector-icons/AntDesign';

import moment from 'moment';

export default function ProfileScreen({navigation}){

    const [list, setList] = React.useState([]);
    const [wallet, setWallet] = React.useState([]);
    const [calendar, set_calendar] = React.useState([]);
    const [visible_Move, setVisible_Move] = React.useState(false);
    const [visible_GetWallet, setVisible_GetWallet] = React.useState(false);
    const [visible_Calendar, setVisible_Calendar] = React.useState(false);
    const [o_id_old, set_o_id_old] = React.useState();
    const [o_id_new, set_o_id_new] = React.useState();
    const [o_t_id, set_o_t_id] = React.useState();
    const [o_cost, set_o_cost] = React.useState();
    const [o_id_pay, set_o_id_pay] = React.useState();
    const [o_cost_pay, set_o_cost_pay] = React.useState();
    const [o_s_id, set_o_s_id] = React.useState();
    const [timekeeping, set_timekeeping] = React.useState();
    const [transaction, set_transaction] = React.useState();
    const [v_schedule, set_v_schedule] = React.useState(false);

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
            console.log(err + ' getList');
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
            console.log(err + ' pullUp');
        })

      setTimeout(()=>{
        setRefresh(false)
      }, 500)
    }


    const [form , setForm] = React.useState({
      darkMode: true,
      wifi: true,
      showCollaborators: true,
      accessibilityMode: false,
    })
    
    const SECTIONS = [
      {
        header: 'Preferences',
        icon: 'settings',
        items: [
          { icon: 'calendar', color: '#fe9400', label: 'Lịch làm việc', type: 'link', func: 'getCalendar' },
          { icon: 'check', color: '#fe9400', label: 'Ca đã trực', type: 'link', func: 'getTimekeeping' },
          { icon: 'star', color: '#DC143C', label: 'Lương', type: 'link', func: 'get_Wallet' },

          {
            id: 'darkMode',
            icon: 'cloud',
            color: '#007afe', 
            label: 'Dark Mode', 
            type: 'toggle'
          },

          {
            id: 'wifi',
            icon: 'wifi',
            color: '#007afe', 
            label: 'Wi-Fi', 
            type: 'toggle'
          },
        ],
      },
      {
        header: 'Help',
        icon: 'help-cirle',
        items: [
          { icon: 'question', color: '#8e8d91', label: 'Báo lỗi', type: 'link', func: 'getBug'},
          { icon: 'calendar', color: '#8e8d91', label: 'Lịch', type: 'link', func: 'getSchedule'},
        ],
      },
    ]

    const PROFILE_PICTURE = 'https://besthqwallpapers.com/Uploads/6-4-2020/127311/lockheed-martin-f-16i-sufa-general-dynamics-f-16-fighting-falcon-f-16i-sufa-israeli-fighter-israeli-air-force.jpg'

    const get_TimeKeeping = () =>
    {
      const u_id = 1;
    axios({
      url: "http:/192.168.2.32:5555/getChamCong?u_id=" + u_id,
      method: "GET"
    }).then((res)=>{
      set_timekeeping(res.data)
    }).catch(function(err){
      console.log(err);
    })
    }

    const get_Wallet = () => {
      const u_id = 1;
      axios({
          url: "http:/192.168.2.32:5555/getVi?u_id=" + u_id,
          method: "GET"
      }).then((res)=>{
          setWallet(res.data)
      }).catch(function(err)
      {
          console.log(err + ' getWallet');
      })
  }

  const get_Calendar = () => {
    const u_id = 1;
    axios({
        url: "http:/192.168.2.32:5555/getLich?u_id=" + u_id,
        method: "GET"
    }).then((res)=>{
        set_calendar(res.data)
    }).catch(function(err)
    {
        console.log(err + ' get_Calendar');
    })
}

  const get_Transaction = () => {
    const u_id = 1;
    axios({
        url: "http:/192.168.2.32:5555/getPGD?u_id=" + u_id,
        method: "GET"
    }).then((res)=>{
        set_transaction(res.data)
    }).catch(function(err)
    {
        console.log(err + ' get_transaction');
    })
}

  const dangki_Lich = (item) => {
    const u_id = 1;
    const cd_id = item.cd_id
    axios({
        url: "http:/192.168.2.32:5555/dangkiLich?u_id=" + u_id + '&cd_id=' + cd_id,
        method: "GET"
    }).then((res)=>{
        get_Calendar();
    }).catch(function(err)
    {
        console.log(err + ' dangki_Lich');
    })
  }

    const handleVisibleCalendar = () =>{
      setVisible_Calendar(!visible_Calendar);
      get_Calendar();
    }

    const handleVisibleGetWallet = () => {
      setVisible_GetWallet(!visible_GetWallet)
      get_Wallet();
      get_Transaction();
    }

    const handleVisibleMove = () => {
      setVisible_Move(!visible_Move)
      get_TimeKeeping();
    }

    const handleVisibleSchedule = () => {
      set_v_schedule(!v_schedule);
      get_Calendar();
    }

    // const dates= [
    //   { weekday : 'Sun', date: new Date()},
    //   { weekday : 'Sun', date: new Date()},
    //   { weekday : 'Sun', date: new Date()},
    //   { weekday : 'Sun', date: new Date()},
    //   { weekday : 'Sun', date: new Date()},
    //   { weekday : 'Sun', date: new Date()},
    //   { weekday : 'Sun', date: new Date()},
    // ];

    const swiper = React.useRef();

    const {width} = Dimensions.get('screen');

    const [ value, setValue] = React.useState(new Date());

    const [week, setWeek] = React.useState(0);

    const weeks = React.useMemo(() =>{
      const start = moment(start).add(week, 'weeks').startOf('week');

      return [-1, 0, 1].map(adj => {
        return Array.from({ length: 7 }).map((_, index)=> {
          const date = moment(start).add(adj, 'week').add(index, 'day');

          return {
            weekday: date.format('ddd'),
            date: date.toDate(),
          };
        });
      });
    }, [week]);

    return (
        <SafeAreaView>
            {/* <View style={{flex : 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text
                    onPress={() => navigation.navigate('Đơn Đặt')}
                    style={{ fontSize: 26, fontWeight: 'bold'}}>Details Screen</Text>
            </View> */}

            <Modal
              animationType='slide'
              visible = {visible_Calendar}
            >
              <SafeAreaView>

                <View style={styles.form_wallet}>
                  <Text style={styles.label}>Lịch Làm</Text>

                  <TouchableOpacity
                    onPress={handleVisibleCalendar}
                  >
                    <Text style={styles.txtClose}>Đóng</Text>
                  </TouchableOpacity>

                  <ScrollView style={styles.sv_tk}>

                    {calendar?.map((item, index) => {
                      return (
                        <View style={[styles.item_table, {flexDirection: 'row'}]} key={index}>
          
                          <View style={{
                            flexDirection: 'row',
                            width : '70%',
                            height: 60,
                            backgroundColor: '#fff',
                            borderRadius: 10,
                          }}>
                            <Text style={styles.txt_table}>
                              <View style={{ width: '55%', height: 50, alignItems:'center', justifyContent: 'center',}}>
                                <Text style={[styles.txt_name, {marginLeft: 10, color: 'red'}]}>{(item.cd_date).toString().split('T')[0] }</Text>
                                <Text style={[styles.txt_name, {marginLeft: 10}]}>{item.s_name} | {item.hours}h </Text>
                              </View>
                              {'\n'}
                              </Text>
                              <View style={{ 
                                        backgroundColor: 'white', 
                                        marginTop: 5, 
                                        width: '55%', 
                                        height: 50, 
                                        alignItems:'center', 
                                        justifyContent: 'center', 
                                        borderWidth: 2, 
                                        borderRadius: 10,
                                        borderColor: 'black'
                                    }}>
                                <Text style={[styles.txt_name, {marginLeft: 1}]}>{item.u_name}</Text>
                              </View>
                      
                            
                            </View>
                            { 
                              item.u_id == 4 ?
                              <TouchableOpacity
                                onPress = { () => dangki_Lich(item)}
                                style={{
                                  position: 'relative',
                                  right: -7,
                                  width: '30%',
                                  backgroundColor: '#DC143C',
                                  borderRadius: 15,
                                  borderWidth: 1,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <AntDesign name='edit'
                                  style={{
                                    fontSize: 30,
                                  }}
                                />
                                <Text>{item.cd_id}</Text>
                              </TouchableOpacity>

                            :
                            
                              <TouchableOpacity
                              style={{
                                right: -50,
                                width: '20%',
                                //backgroundColor: '#DC143C',
                                borderRadius: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              
                            </TouchableOpacity>

                          }
                          
                        </View>
                      )
                    })}
                    </ScrollView>
                </View>
              </SafeAreaView>
            </Modal>

            <Modal
              animationType='slide'
              visible = {v_schedule}
            >
              <SafeAreaView style={{flex: 1}}>
                <View style={[styles.containterCLD, { backgroundColor: '#ffff'}]}>
                  <Text style={styles.label}>Schedule</Text>

                  <TouchableOpacity
                    onPress={handleVisibleSchedule}
                  >
                    <Text style={[styles.txtClose, { marginBottom: 10}]}>Đóng</Text>
                  </TouchableOpacity>

                  <View style={styles.picker}>
                    <Swiper 
                      index={1} 
                      ref={swiper} 
                      showsPagination={false} 
                      loop={false}
                      onIndexChanged={
                        ind => {
                          if(ind === 1){
                            return;
                          }

                          setTimeout(()=>{
                            const newIndex = ind - 1
                            const newWeek = week + newIndex
                            setWeek(newWeek);
                            setValue(moment(value).add(newIndex, 'week').toDate());
                            swiper.current.scrollTo(1, false);
                          }, 100)
                        }
                      }
                    > 
                      {weeks.map((dates, index)=>(
                        <View 
                          style={[styles.itemRow, { paddingHorizontal: 16}]} 
                          key={index}>
                        {dates.map((item, dateIndex)=>{
                          const isActive = 
                            value.toDateString() === item.date.toDateString();
                          return (
                            <TouchableWithoutFeedback 
                              key={dateIndex} 
                              onPress={()=> setValue(item.date)}>
                              <View 
                                style={[
                                  styles.item, 
                                  isActive && { 
                                    backgroundColor: '#111', 
                                    borderColor: '#111'
                                  },
                                ]}
                              >
                                <Text 
                                  style={[
                                    styles.itemWeekday,
                                    isActive && {color: '#fff'},
                                  ]}>{item.weekday}</Text>
                                <Text 
                                  style={[styles.itemDate, isActive && {color:'#fff'}]}>
                                    {item.date.getDate()}</Text>
                              </View>
                            </TouchableWithoutFeedback>
                          );
                        })}
                      </View>
                      ))}
                    </Swiper>
                  </View>

                  <View style={{flex: 1, paddingVertical: 24, paddingHorizontal: 16,}}>
                      <Text style={styles.contentText}>
                        {value.toDateString()}
                      </Text>

                      <View style={styles.placholder}>
                        <View style={styles.placeholderContent}>
                          {/*    */}
                        </View>
                      </View>

                      <View style={styles.footer}>
                        <TouchableOpacity style={styles.btn}
                          onPress={ () => {
                            // handle onPress
                          }}  
                        >
                          <Text style={styles.btnText}>Schedule</Text>
                        </TouchableOpacity>
                      </View>
                  </View>
                </View>
              </SafeAreaView>
            </Modal>

            <Modal
              animationType='slide'
              visible = {visible_Move}
            >
              <SafeAreaView>

                <View style={styles.form}>
                  <Text style={styles.label}>Ca đã trực</Text>

                  <TouchableOpacity
                    onPress={handleVisibleMove}
                  >
                    <Text style={styles.txtClose}>Đóng</Text>
                  </TouchableOpacity>

                  <ScrollView style={styles.sv_tk}>

                    {timekeeping?.map((item, index) => {
                      return (
                        <View style={styles.item_table} key={index}>
                          
                          
                          <View style={{
                            flexDirection : 'row',
                            width : '100%'
                          }}>
                            <Text style={styles.txt_table}>TK Id : {item.tk_id} | {item.s_name}
                              {'\n'}

                              <View>
                                <Text style={styles.txt_name}>{item.u_name} | </Text>
                              </View>

                              <View>
                                <Text style={styles.txt_name}>{item.tk_date}</Text>
                              </View>
                      
                            </Text>
                      
                          </View>
                        </View>
                      )
                    })}
                    </ScrollView>


                </View>
              </SafeAreaView>
            </Modal>

            <Modal
              animationType='slide'
              visible = {visible_GetWallet}
            >
              <SafeAreaView>

                <View style={styles.form_wallet}>
                  <Text style={styles.label}>Ví của tôi {'\n'}</Text>

                  <ScrollView style={[styles.sv_bottom, {height: 200}]}>

                    {wallet?.map((item, index) => {
                      return (
                        <View style={[styles.item_table, {height: 140}]} key={index}>
                          
                          
                          <View style={{
                            flexDirection : 'row',
                            width : '100%',
                            height: 100,
                          }}>
                            <Text style={styles.txt_table}>Tiền tích lũy : {Intl.NumberFormat({style: 'currency', currency:'VND', maximumFractionDigits: 3}).format(item.w_money_earned)} VNĐ
                              {'\n'}{'\n'}

                              <View
                                 style={{
                                  backgroundColor: '#A9A9A9', 
                                  flex: 5, 
                                  height : 70,
                                  width : 150,
                                  borderRadius : 10,
                                  alignItems : 'center',
                                  justifyContent: 'center',
                                  padding: 10,
                                  borderWidth: 1,
                                  borderColor: 'white',
                                }}
                              >
                                <Text style={styles.txt_name}>Tiền đã rút :{'\n'} {Intl.NumberFormat({style: 'currency', currency:'VND', maximumFractionDigits: 3}).format(item.w_money_withdraw)} VNĐ </Text>
                              </View>

                              <View
                                 style={{
                                  backgroundColor: '#A9A9A9', 
                                  flex: 5, 
                                  height : 70,
                                  left : 50,
                                  width : 150,
                                  borderRadius : 10,
                                  alignItems : 'center',
                                  justifyContent: 'center',
                                  padding : 10,
                                  borderWidth: 1,
                                  borderColor: 'white',
                                }}
                              >
                                <Text style={styles.txt_name}> Số dư :{'\n'}  {Intl.NumberFormat({style: 'currency', currency:'VND', maximumFractionDigits: 3}).format(item.w_surplus)} VNĐ </Text>
                              </View>
                      
                            </Text>
                      
                          </View>
                        </View>
                      )
                    })}
                    </ScrollView>

                    <TouchableOpacity
                    onPress={handleVisibleGetWallet}
                  >
                    <Text style={styles.txt_Close}>Đóng</Text>
                  </TouchableOpacity>

                  <View style={{flexDirection: 'row', alignItems: 'center', top: 20,}}>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                    <View>
                      <Text style={{
                        width: 150,
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#ffff'
                        }}
                      >
                        Lịch sử rút tiền
                      </Text>
                    </View>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                  </View>

                  <ScrollView style={styles.sv_tran}>

                    {transaction?.map((item, index) => {
                      return (
                        <View style={styles.item_table} key={index}>
                          
                          <View style={{
                            flexDirection : 'row',
                            width : '100%'
                            }}
                          >
                            <Text style={[
                                    styles.txt_table, 
                                    {
                                      height: 50,
                                      marginLeft: -7,
                                      marginRight: 10,
                                      borderWidth: 1,
                                      borderColor: 'red', 
                                      padding: 7,
                                      borderRadius: 10,
                                    }]}
                            >
                              {item.tran_id} | {Intl.NumberFormat({style: 'currency', currency:'VND', maximumFractionDigits: 3}).format(item.tran_money)} VNĐ
                              {'\n'}
                            </Text>
                            <View
                                style={{

                                }}
                            >
                              <Text style={[styles.txt_name, {marginRight: 20}]}>Ngày Tạo:  </Text> 
                              <Text>{ (item.tran_created).toString().split('T')[0] } </Text>
                              {/* <Text>{ Intl.DateTimeFormat("vi-VN",{dateStyle:'short', timeStyle: 'short'}).format(item.tran_created)} </Text> */}

                            </View>

                            <View>
                              <Text style={styles.txt_name}>Ngày Lấy: </Text>
                              <Text>{(item.tran_updated).toString().split('T')[0] }</Text>
                            </View>
                      
                            
                        </View>
                      </View> 
                          
                      )
                    })}
                  </ScrollView>

                   
                </View>
              </SafeAreaView>
            </Modal>

            <ScrollView contentContainerStyle={styles.containter}>
              <View style={styles.profile}>
                <TouchableOpacity
                  onPress ={ () => {
                    // handle onPress
                  }}>
                    <View style={styles.profileAvatarWrapper}>
                      <Image
                        alt="Profile Picture"
                        source={{uri: PROFILE_PICTURE}}
                        style={styles.profileAvatar}
                      />

                      <View style={styles.profileAction}>
                        <AntDesign name='edit' />
                      </View>
                    </View>
                  </TouchableOpacity>

                <Text style={styles.profileName}>Hữu Tấn</Text>
                <Text style={styles.profileAddress}>An Hoàn, Ninh Kiều, Cần Thơ</Text>
              </View>

              {SECTIONS.map(({ header, items}) =>(
                <View style={styles.section} key={header}>
                  <Text style={styles.sectionHeader}>{header}</Text>

                  {items.map(({id, label, type, icon, color, func}) => (
                    <TouchableOpacity
                    key={icon}
                    onPress={() => {
                      // handle onPress
                    }}>
                      <View style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: color}]}>
                          <AntDesign name={icon} color='#fff' size={18} />
                        </View>
                        <Text style={styles.rowLabel}>{label}</Text>

                        <View style={{ flex: 1}}></View>

                        {type === 'toggle' && (
                          <Switch 
                            value={form[id]}
                            onValueChange={value => setForm({ ...form, [id]: value})}
                            />
                        )}

                        {type === 'link' && (func === 'getCalendar') && (
                          <TouchableOpacity
                            onPress={handleVisibleCalendar}
                          >
                            <AntDesign
                              name='right'
                              color='#0c0c0c'
                              size={22}
                              />
                          </TouchableOpacity>
                        )}
                        
                        {type === 'link' && (func === 'getTimekeeping') && (
                          <TouchableOpacity
                            onPress={handleVisibleMove}
                          >
                            <AntDesign
                              name='right'
                              color='#0c0c0c'
                              size={22}
                              />
                          </TouchableOpacity>
                        )}

                        {type === 'link' && (func === 'get_Wallet') && (
                          <TouchableOpacity
                            onPress={handleVisibleGetWallet}
                          >
                            <AntDesign
                              name='right'
                              color='#0c0c0c'
                              size={22}
                              />
                          </TouchableOpacity>
                        )}

                        {type === 'link' && (func === 'getSchedule') && (
                          <TouchableOpacity
                            onPress={handleVisibleSchedule}
                          >
                            <AntDesign
                              name='right'
                              color='#0c0c0c'
                              size={22}
                              />
                          </TouchableOpacity>
                        )}

                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}

            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  
    containter: {
      paddingVertical: 24,
     // backgroundColor: 'red',
    }, 
    
    profile: {
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },

    profileName: {
      marginTop: 20,
      fontSize: 19,
      fontWeight: '600',
      color: '#414d63',
      textAlign: 'center',
    },
    
    profileAddress: {
      marginTop: 5,
      fontSize: 16,
      color: '#989898',
      textAlign: 'center',
    },

    profileAvatar: {
      width: 72,
      height: 72,
      borderRadius: 9999,
      borderColor: 'red'
    },

    profileAction: {
      width: 28,
      height: 28,
      borderRadius: 9999,
      backgroundColor: '#007bff',
      position: 'absolute',
      right: -4,
      bottom: -10,
      alignItems: 'center',
      justifyContent: 'center'
    },

    section: {
      paddingHorizontal: 24,
    },

    sectionHeader: {
      paddingVertical: 12,
      fontSize: 12,
      fontWeight: '600',
      color: '#9e9e9e',
      textTransform: 'uppercase',
      letterSpacing: 1.1,
    },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: 50,
      backgroundColor: '#FFF8DC',
      borderRadius: 8,
      marginBottom: 12,
      paddingHorizontal: 12,
    },

    rowIcon: {
      width: 32,
      height:32,
      borderRadius: 999,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },

    rowLabel: {
      fontSize: 17,
      color: '#0c0c0c',
    },

    sv_tk : {
      top: 30,
      marginBottom : 250
    },
    
    sv_bottom : {
      top: 0,
      bottom: 10,
      height: 210,
      marginBottom : 20,
      // backgroundColor: 'red'
    },

    sv_tran : {
      top: 30,
      marginBottom : 750
    },

    sv_table: {
      top: 1000,
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
      fontSize: 14,
      fontWeight: "bold",
      marginTop: 5,
    },
    
    txt_table: {
      fontSize: 17,
      marginTop: 5,
      fontWeight : "bold",
      color: 'red',
    },

    txtClose:{
      padding: 15,
      borderWidth: 1,
      borderRadius: 10,
      color: 'white',
      backgroundColor: 'black',
      textAlign: 'center',
      marginTop: 1,
    },

    txt_Close:{
      padding: 15,
      borderWidth: 1,
      borderRadius: 10,
      color: 'white',
      backgroundColor: 'black',
      textAlign: 'center',
      marginTop: -10,
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
      marginTop: 20,
      marginBottom: 20,
    },

    form_wallet:{
      padding: 15,
      backgroundColor: "gray",
      marginTop: 30,
      marginBottom: 20,
    },

    label : {
      fontSize : 25,
      color: '#ffff',
      // backgroundColor : '#ffff',
      fontWeight : 'bold',
      textAlign : 'center',
    },

    containterCLD:{
      flex: 1,
      paddingVertical: 24,
    },

    itemRow: {
      //width,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginHorizontal: -4
    },

    item: {
      flex: 1,
      height: 50,
      marginHorizontal: 4,
      paddingVertical: 6,
      paddingHorizontal: 4,
      borderWidth: 1,
      borderColor: '#e3e3e3',
      borderRadius: 10,
      alignItems: 'center',
      flexDirection: 'column',
    },

    itemWeekday: {
      fontSize: 13,
      fontWeight: '500',
      color: 'red',
      marginBottom: 4,
    },

    itemDate: {
      fontSize: 15,
      fontWeight: '600',
      color: '#111',
    },

    picker: {
      flex: 1,
      maxHeight: 74,
      paddingVertical: 12,
      alignItems: 'center',
    },

    contentText: {
      fontSize: 17,
      fontWeight: '600',
      color: '#999',
      marginBottom: 12,
    },

    placholder: {
      flex: 1,
      height: 400,
    },

    placeholderContent: {
      borderWidth: 4,
      borderColor: '#e5e7eb',
      borderStyle: 'dashed',
      borderRadius: 9,
      flex: 1,
    },

    footer:{
      marginTop: 24,
      paddingHorizontal: 16,
    },

    btn: {
      flexDirection: 'row',
      backgroundColor: '#007aff',
      borderWidth: 1,
      borderColor: '#007aff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },

    btnText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#fff',
    }

});
  