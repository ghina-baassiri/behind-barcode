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

export default function ProductNotFoundModal({
  visibility,
  setVisibility,
  setScanned,
}) {
  return (
    // <Text>hello</Text>
    <Modal animationType='slide' visible={visibility} transparent={true}>
      <View style={styles.modalBg}>
        <View style={styles.modalContainer}>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../../assets/cancel.png')}
              style={{ marginVertical: 10, height: 120, width: 120 }}
            />
          </View>
          <Text
            style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}
          >
            Product scanned is not found..
          </Text>

          <TouchableOpacity
            activeOpacity={1}
            style={{
              ...styles.btn,
              borderColor: '#1eb980',
              borderWidth: 1,
              marginTop: 15,
            }}
            onPress={() => {
              setScanned(false)
              setVisibility(false)
            }}
          >
            <Text style={styles.btnText}>Scan Another Product</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BBThemeColor,
  },
  btn: {
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
})
