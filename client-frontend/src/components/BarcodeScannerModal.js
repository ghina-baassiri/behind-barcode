import React from 'react'
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  Modal,
  StyleSheet,
} from 'react-native'
import { BBThemeColor } from '../utilities/Colors'
import Feather from 'react-native-vector-icons/Feather'

export default function BarcodeScannerModal({
  product,
  visibility,
  setVisibility,
  setScanned,
  navigation,
}) {
  return (
    <Modal animationType='slide' visible={visibility} transparent={true}>
      <View style={styles.modalContainer}>
        <Feather
          name='x'
          size={19}
          color='#000'
          style={{ top: 13, right: 10, position: 'absolute' }}
          onPress={() => {
            setScanned(false)
            setVisibility(false)
          }}
        />
        <View>
          <Image
            source={{ uri: product.image }}
            resizeMode='contain'
            style={{ marginTop: 10, height: 160, width: 160 }}
          />
          <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>
            {product.brand}
          </Text>

          <Text style={{ marginTop: 4, fontSize: 15 }}>{product.category}</Text>

          <Text style={{ marginTop: 4, fontSize: 15 }}>
            {product.size + ' ' + product.unit}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('ProductStack', {
              screen: 'ProductMarkets',
              params: { product: product },
            })
          }}
          style={{ ...styles.btn, marginVertical: 20, alignSelf: 'center' }}
        >
          <Text style={{ ...styles.btnText, color: '#fff' }}>View Prices</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 20,
  },
  body: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  footer: {
    width: '100%',
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: BBThemeColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  btn: {
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: BBThemeColor,
  },
  btnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  btn_outline: {
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: BBThemeColor,
  },
})
