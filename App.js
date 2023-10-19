import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  RefreshControl,
  Button
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { BarCodeScanner } from 'expo-barcode-scanner';

import MainContainer from './navigation/MainContainer';

function App()
{
  return (
    <MainContainer/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default App;