import * as React from 'react';
import {View, Text} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import TablesScreen from './screens/TablesScreen';
import ScanScreen from './screens/ScanScreen';
import { StatusBar } from 'expo-status-bar';
import PayScreen from './screens/PayScreen';

// Screen names
const homeName = 'Đơn Đặt';
const detailsName = 'Bàn';
const settingsName = 'Tôi';
const payName = 'Thanh Toán';
const scanName = "Quét mã";

const Tab = createBottomTabNavigator();


export default function MainContainer()
{
    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({route}) => ({
                tabBarIcon : ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if(rn === homeName){
                        iconName = focused ? 'home' : 'home-outline';
                    } else if(rn === detailsName){
                        iconName = focused ? 'grid' : 'grid-outline';
                    } else if(rn === settingsName){
                        iconName = focused ? 'person' : 'person-outline';
                    } else if(rn === payName){
                        iconName = focused ? 'journal' : 'journal-outline';
                    } else if(rn === scanName){
                        iconName = focused ? 'qr-code' : 'qr-code-outline';
                    }


                    return <Ionicons name={iconName} size={size} color={color}/>
                },
                })}>
            
                <Tab.Screen name={homeName} component={HomeScreen} />
                <Tab.Screen name={detailsName} component={TablesScreen} />
                <Tab.Screen name={settingsName} component={ProfileScreen} />
                <Tab.Screen name={payName} component={PayScreen} />
                <Tab.Screen name={scanName} component={ScanScreen} />

            </Tab.Navigator>
      </NavigationContainer>
    )
}