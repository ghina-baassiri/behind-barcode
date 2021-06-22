import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity, LogBox } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonScreenStyles } from '../utilities/Styles';
import { ListStyles } from '../utilities/Styles';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { NavigationActions } from 'react-navigation';

import axios from 'axios'

export default function ProductMarketsScreen({route, navigation}) {
  LogBox.ignoreAllLogs();
  
  const { token } = useContext(AuthContext)
  const [markets, setMarkets] = useState([]);

  const product = route.params.product
  let market = {}


  function fetchProductMarkets(product) {
    axios.get(`http://192.168.43.152:8000/api/productMarkets/${product.barcode}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }}).then(response => {        
        if(response.status === 200) { 
          setMarkets(response.data.markets)
          return
        }      
    }).catch(err => {
      console.log('The Error: ', err)
      
    })   
  }

  useEffect(() => {
    fetchProductMarkets(product)      
  }, [])


  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center' }}>
      {/* Product */}
      <View style={ListStyles.mainItemWrapper}>                           
          <Image
            source={{uri:product.image}} 
            resizeMode='contain'
            style={ styles.image }
          />   
          <Text style={{ color:'#000', fontSize:20, marginTop:7, fontWeight:'bold'}}>{product.brand}</Text>
      
          <Text style={{marginTop:4}}>{product.category}</Text>

          <Text style={{marginTop:4}}>{product.size + ' ' + product.unit}</Text>   
      </View>

      {/* Price per market */}
        <View style={{...ListStyles.listWidth, flexDirection:'row',  justifyContent: 'center', borderWidth:1, borderColor:'#d4d4d4', borderTopLeftRadius:10, borderTopRightRadius: 10, backgroundColor:'#1eb980', height:35,  elevation:3 }}>
          <Text style={{textAlign: 'center', alignSelf: 'center', fontSize:18 , fontWeight:'bold', borderRightWidth:1, width:'65%',  borderColor:'#d4d4d4', color:'#fff' }} >Market</Text>
          <Text style={{textAlign: 'center', alignSelf: 'center', fontSize:18,  fontWeight:'bold', width:'35%', color: '#fff' }} >Price</Text>
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={markets}  
            renderItem={item => {
              return (
                <View style={{...ListStyles.listWidth, flexDirection:'row', textAlign: 'center', alignItems:'center', justifyContent: 'center', borderWidth:1, borderColor:'#d4d4d4', backgroundColor:'#fff', height:60 }}>
                    <TouchableOpacity 
                      style={{ alignSelf: 'center', width:ListStyles.listWidth.width*0.64,  justifyContent: 'center', height:'100%', paddingHorizontal:4 }}
                      onPress={() => {
                        navigation.navigate('MarketStack', {screen: 'MarketProducts', params: {market: item.item}})}}
                    >
                      <Text style={{ height:'auto', textAlign: 'center',fontSize:16 , color:'#000'}} >{item.item.name}</Text> 
                    </TouchableOpacity>
                    <View  style={{ justifyContent: 'center', alignItems: 'center', width:'35%', height:'100%', borderLeftWidth:1, borderColor:'#d4d4d4' }} >
                      <Text style={{ textAlign: 'center', fontSize:16, }} >{item.item.price}</Text>
                    </View>
                  </View>
              )}}                      
              showsVerticalScrollIndicator={false}              
              contentContainerStyle={{paddingTop:1,paddingBottom:65}}
        />
      </View>
  )
}


const styles = StyleSheet.create({
  image: {
    width:120, 
    height:120
  }
})