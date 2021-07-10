import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, StatusBar } from 'react-native'
import { AuthContext } from '../navigation/AuthProvider'
import { Camera } from 'expo-camera'
import { windowHeight, windowWidth } from '../utilities/Dimensions'
import BarcodeScannerModal from '../components/BarcodeScannerModal'
import ProductNotFoundModal from '../components/ProductNotFoundModal'
import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'

export default function BarcodeScannerScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null)
  const [failed, setFailed] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [product, setProduct] = useState(null)
  const [rerender, setRerender] = useState(true)

  const [showProductModal, setShowProductModal] = useState(false)
  const [showProductNotFoundModal, setShowProductNotFoundModal] =
    useState(false)
  const { token } = useContext(AuthContext)
  const isFocused = useIsFocused()

  // Reset the states on each time the screen is focused
  useEffect(() => {
    if (!isFocused) {
      setShowProductModal(false)
      setScanned(false)
      setProduct(null)
    } else {
      if (rerender) {
        ;(async () => {
          const cameraStatus = await Camera.requestPermissionsAsync()
          setHasPermission(cameraStatus.status === 'granted')
        })()
        setShowProductModal(false)
        setScanned(false)
        setProduct(null)
        setRerender(false)
      }
      if (failed) {
        setShowProductNotFoundModal(true)
        setScanned(true)
        setProduct(null)
        setFailed(false)
      }
    }
  })

  // Called directly after a barcode is scanned
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true)
    fetchProduct(data)
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  // Fetch the product holding the scanned barcode
  const fetchProduct = (barcode) => {
    console.log('fetch')
    axios
      .get(`http://192.168.43.152:8000/api/product/${barcode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.product) {
          setProduct(response.data.product)
          setShowProductModal(true)
          return
        }
      })
      .catch((err) => {
        setFailed(true)
        console.log('Fetch Product Error: ', err)
      })
  }

  return (
    <View style={styles.container}>
      {scanned ? (
        <>
          {product ? (
            <BarcodeScannerModal
              product={product}
              visibility={showProductModal}
              setVisibility={setShowProductModal}
              setScanned={setScanned}
              navigation={navigation}
            />
          ) : (
            <ProductNotFoundModal
              visibility={showProductNotFoundModal}
              setVisibility={setShowProductNotFoundModal}
              setScanned={setScanned}
            />
          )}
        </>
      ) : (
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          ratio='16:9'
          style={StyleSheet.absoluteFillObject}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth,
    height: windowHeight,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
})
