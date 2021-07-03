import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { CommonScreenStyles } from '../utilities/Styles';
import { screenHeight } from '../utilities/Dimensions';
import BarcodeScannerModal from '../components/BarcodeScannerModal';
import ProductNotFoundModal from '../components/ProductNotFoundModal';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios'

export default function BarcodeScannerScreen({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [failed, setFailed] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [product, setProduct] = useState(null);
  const [rerender, setRerender] = useState(true);

  const [showProductModal, setShowProductModal] = useState(false);
  const [showProductNotFoundModal, setShowProductNotFoundModal] = useState(false);
  const { token } = useContext(AuthContext);
  const isFocused = useIsFocused();
 

  useEffect(() => {
    console.log('isFocused: ', isFocused)
    console.log('failed: ', failed)  
    console.log('scanned: ', scanned)  
    console.log('error product: ', product)    
    console.log('showProductNotFoundModal: ', showProductNotFoundModal)

    if(!isFocused){
      setShowProductModal(false)
      setScanned(false) 
      setProduct(null)
    } else {
      if (rerender) {
        (async () => {
          // Camera access permission check
          const cameraStatus = await Camera.requestPermissionsAsync();
          setHasPermission(cameraStatus.status === 'granted');
        })()
        setShowProductModal(false)
        setScanned(false) 
        setProduct(null)
        setRerender(false)
      }
      if(failed) {
        setShowProductNotFoundModal(true) 
        setScanned(true)
        setProduct(null)   
        setFailed(false) 
      }
    }
  })

  

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true)
    fetchProduct(data)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  const fetchProduct = (barcode) => {
    console.log('fetch')
    axios.get(`http://192.168.43.152:8000/api/product/${barcode}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }})
    .then(response => { 
      if(response.data.product) {
        setProduct(response.data.product)
        setShowProductModal(true)
        return
      }
    })
    .catch(err => {
      // alert('Scan again')
      setFailed(true) 
      console.log('Fetch Product Error: ', err)      
    })   
  } 

  return (
    <View style={CommonScreenStyles.container}>
      { scanned ?
        <>
          {product ?
          <BarcodeScannerModal product={product} visibility={showProductModal} setVisibility={setShowProductModal} setScanned={setScanned} setProduct={setProduct} navigation={navigation}/>
          :
          <ProductNotFoundModal visibility={showProductNotFoundModal} setVisibility={setShowProductNotFoundModal} setScanned={setScanned}/>
          }
        </>
        :
          <Camera
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            ratio='16:9'
            style={StyleSheet.absoluteFillObject}
          /> 
          }
    </View> 
  );
}