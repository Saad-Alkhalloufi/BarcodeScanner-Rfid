import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Dashboard, ReaderBarcode, Rfid } from '../src/screens';

import Icon from 'react-native-vector-icons/MaterialIcons'

import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';


const Tab = createMaterialBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator 
    barStyle={{
      backgroundColor: "black",
      position: "absolute",
      overflow: "hidden",
      margin: 20,
      borderRadius: 30,
    }}>
         
        
        
      <Tab.Screen  name="ReaderBarcode"  component={ReaderBarcode} options ={{
        
        
        
        tabBarIcon:({focused}) =>(
          <LottieView autoPlay={focused}

        source={require('../src/assets/Lottie/scan.json')} 
      />
    
          
        ),
        
        
        
        }} />
      <Tab.Screen  name="Rfid" component={Rfid} options ={{
        
        
        tabBarIcon:({focused}) =>(
          <LottieView autoPlay={focused} 

        source={require('../src/assets/Lottie/nfc1.json') } 
      />
          
          
        ),
        
        
        
        }} />
      <Tab.Screen  name="Logout"  component={Dashboard} options ={{
       
        tabBarIcon:({focused}) =>(
          
          
          <LottieView autoPlay={focused} 

        source={require('../src/assets/Lottie/logout1.json')} 
      />
          
           
        )
        }} />

    </Tab.Navigator>
  );
}


export default Tabs;

