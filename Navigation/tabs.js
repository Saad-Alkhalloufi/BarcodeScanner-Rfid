import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Dashboard, ReaderBarcode, Rfid } from '../src/screens';
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
         
         
        
      <Tab.Screen  name='ReaderBarcode'  component={ReaderBarcode} options ={({ navigation }) => ({
        
        headerTitle: '',
          headerTransparent: true,
          
        
        tabBarIcon:({focused}) =>(
          <LottieView autoPlay={focused}

        source={require('../src/assets/Lottie/scan.json') } 
      />
    
          
        ),
        
        
        
        })} />
      <Tab.Screen  name="Rfid" component={Rfid} options = {({ navigation }) => ({
        
        
        tabBarIcon:({focused}) =>(
          <LottieView autoPlay={focused} 

        source={require('../src/assets/Lottie/nfc1.json')   }
      
      />
          
          
        ),
        
        
        
        })} />
      <Tab.Screen  name="Logout"  component={Dashboard} options ={({ navigation }) => ({
       
        tabBarIcon:({focused}) =>(
          
          
          <LottieView autoPlay={focused} 
          

        source={require('../src/assets/Lottie/logout1.json')}
      />
      
           
        ),
        })} />

    </Tab.Navigator>
  );
}


export default Tabs;

