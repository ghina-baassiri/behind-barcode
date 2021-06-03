import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, SafeAreaView, Image } from 'react-native';
import { CommonScreenStyles } from '../utilities/Styles';


const CustomHeader= ({title}) => {
  return (
    <View style={{flexDirection: 'row', height: 50, borderWidth: 1, borderColor:'red'}}>
      <View style={{flex: 1, justifyContent: 'center', borderColor: 'red', borderWidth: 1}}>
        <Image 
          style={{width:30, height: 30}} 
          source={require('../../assets/market_outline.png')}
          resizeMode='contain'
        />
        {/* <Text style={{textAlign:'center'}}>Title</Text> */}
      </View>
      <View style={{flex: 1, justifyContent: 'center', borderColor: 'red', borderWidth: 1}}>
        <Text style={{textAlign:'center'}}>{title}</Text>
      </View>     
      <View style={{flex:1}}></View> 
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{flex:1}}>
      <CustomHeader title='Home'/>
      <View style={CommonScreenStyles.container}>
        <Text>Home</Text>
        <TouchableOpacity
          style={CommonScreenStyles.navButton}
          onPress={() => navigation.navigate('Products')}
        >
          <Text>Check Products</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
