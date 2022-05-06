import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,Alert, ToastAndroid } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BackButton from '../components/BackButton';
import Background from '../components/Background';
import { render } from 'react-dom';

export default function ReaderBarcode({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data,setData]=useState([]);
  const [loading,setloading]=useState([true]);
  const [text, setText] = useState('Not yet scanned');
  
  
  

  const askForCameraPermission = async() => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      
    
  }
  

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
    

  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = async({ type, data }) => {
    
    setScanned(true);
   
      try {
        const response = await fetch('https://api.casaticketing.ma/api/P6MXWJD9HRJ5VL1MESMU/barCodeScan', {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            barcode: data
          }),
          });
        
        let message = "Aucune reponse";
        
        if (response != null) { 
          switch(response.status) {
          case 200:
            message = "Authorized";
            break;
          case 403:
            message = "SCANNED A LOT";
            break;
          
          case 404:
            message = "NOT FOUND";
            break;
     
          case 400:
            message = "MISSED ARGUMENT";
            break;
          default:
              message = "not interpreted : "+ response.status;
              break;
          }
        }
        alert('Code : '+ data+' - Response : ' + message);
       // ToastAndroid.showWithGravity('Code : '+ data+ "\n"+'Response : ' + message ,
        // ToastAndroid.LONG,
        // ToastAndroid.CENTER,
         
        //)
      } catch (error) {
        console.error(error);
      }
    
    
    
  
  };
  
  
  
  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
    <Background>
        
        
          <View style={styles.container}>
            <Text style={{ margin: 10 }}>No access to camera</Text>
             <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
          </View>
    
    </Background>
      
      )
  }

  // Return the View
  return (
    <Background>
      
      <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>
      <Text style={styles.maintext}>{text}</Text>

      {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='#000' />}
    </View>
    </Background>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#000'
  }
});