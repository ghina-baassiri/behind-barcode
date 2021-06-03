import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { CommonScreenStyles } from '../utilities/Styles';

export default BackButton = ({isHome, navigation}) => {
    return (
        <View>
            {
                isHome ?
                null
                : 
                <TouchableOpacity style={{marginLeft:15, marginTop:50, flexDirection: 'row', alignItems: 'center'}}
                    onPress={()=>navigation.goBack()}
                >
                    <Image 
                        style={{width:15, height: 15}} 
                        source={require('../../assets/back.png')}
                        resizeMode='contain'
                    />
                </TouchableOpacity> 
            }
        </View>
    );
  }