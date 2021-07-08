import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Image, View, Modal, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function SuccessModal({ navigation }) {
  
    return (
        <Modal animationType='slide' visible={true} transparent={true} >
            <View style={styles.modalBg}>
                <View style={styles.modalContainer}>
                    <View style={{alignItems:'center'}}>
                        
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Image source={require('../../assets/success.jpg')} style={{tintColor:'#1eb980', marginVertical:10, height:150, width:150}}/>
                    </View>
                    <Text style={{marginVertical:30, fontSize:20, textAlign:'center'}}>Congratulations you are successfully registered!</Text>
                
                    <TouchableOpacity activeOpacity={1} style={styles.footer} onPress={() => navigation.navigate('Login')}>
                        <MaterialIcons
                            name='navigate-next'
                            color='#000'
                            size={20}
                        />
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
        alignItems:'center',
        justifyContent:'center'
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal:20,
        paddingVertical:30,
        borderRadius:20,
        elevation:20
    },
    footer: {
        width: '100%',
        height:40,
        alignItems:'flex-end',
        justifyContent:'center'
    }
})
