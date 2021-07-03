import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity, LogBox } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { ListStyles } from '../utilities/Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios'

export default function ProductMarketsScreen({route, navigation}) {
  LogBox.ignoreAllLogs();
  
  const { token } = useContext(AuthContext)
  const [markets, setMarkets] = useState([]);

  const product = route.params.product
  console.log('product markets screen: ', product)

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
      console.log('Fetch Product Markets Error: ', err)
      
    })   
  }

  useEffect(() => {
    fetchProductMarkets(product)      
  }, [])


  return (
    <>

      <TouchableOpacity activeOpacity={.7} style={{position:'absolute', top:-40, left:320, zIndex:1}} 
          onPress={() => {
          
          let room = product.brand.split(' ').join('')
          console.log('go to chat room : ', room)
          navigation.navigate('ChatStack', {screen: 'Chat', params: {title: product.brand, chatRoom:`${room}_${product.barcode}`, image: product.image}})} }>
            
            <Image
              source={require('../../assets/chat.png')}
              resizeMode='contain'
              style={{width:35, height:35, tintColor:'#fff', right:20}}   
               
            />
      </TouchableOpacity>
    <View style={{flex:1, alignItems:'center',}}>
          
      {/* Product */}
      <View style={{...ListStyles.mainItemWrapper, paddingHorizontal:15, marginTop:20}}>                           
          <Image
            source={{uri:product.image}} 
            resizeMode='contain'
            style={styles.image}
          />   
          <Text style={{ color:'#000', fontSize:16, marginBottom:10, fontWeight:'bold',flexWrap: 'wrap', textAlign: 'center', alignSelf: 'center'}}>{product.brand}</Text>
          <Text style={{color:'#000', fontSize:13, marginBottom:2, alignSelf:'center'}}>{product.category}</Text>          
          <Text style={{fontSize:13, textAlign:'center'}}>{product.size} {product.unit}</Text>    
          
      </View>

      {/* Price per market */}
      
      {!markets ? 
      
        <View style={{alignItems:'center'}}>
          <Image source={require('../../assets/success.jpg')} style={{tintColor:'#1eb980', marginVertical:10, height:150, width:150}}/>
        </View>
        :
        <View style={{ alignItems:'center', justifyContent: 'center' }}>
          <View style={{...ListStyles.listWidth, flexDirection:'row',  justifyContent: 'center', borderWidth:1, borderColor:'#d4d4d4', borderTopLeftRadius:10, borderTopRightRadius: 10, backgroundColor:'#1eb980', height:35,  elevation:3 }}>
            <Text style={{textAlign: 'center', alignSelf: 'center', fontSize:18 , fontWeight:'bold', borderRightWidth:1, width:'68%',  borderColor:'#d4d4d4', color:'#fff' }} >Market</Text>
            <View style={{width:'32%', alignItems: 'center', justifyContent:'center', flexDirection:'row'}}>
              <Text style={{  textAlign:'center', fontSize:18,  fontWeight:'bold', color: '#fff' }} >Price </Text>
              <Text style={{  textAlign:'center', fontSize:14,  fontWeight:'bold', color: '#fff' }} >(LBP)</Text>
            </View>
          </View>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={markets}  
              renderItem={item => {
                return (
                  <View style={{...ListStyles.listWidth, flexDirection:'row', textAlign: 'center', alignItems:'center', justifyContent: 'center', borderWidth:1, borderColor:'#d4d4d4', backgroundColor:'#fff', height:50 }}>
                    <TouchableOpacity 
                      activeOpacity={.9}
                      style={{ flexDirection:'row', alignItems:'center', alignSelf: 'center', width:ListStyles.listWidth.width*0.68,  justifyContent: 'center', height:'100%', paddingHorizontal:4 }}
                      onPress={() => {
                        navigation.navigate('MarketStack', {screen: 'MarketProducts', params: {market: item.item}})}}
                    >
                      <View>
                      <Text style={{ height:'auto', textAlign: 'center',fontSize:16 , color:'#000'}} >{item.item.name}</Text> 
                      <Text style={{  height:'auto', textAlign: 'center',fontSize:13 , color:'#000', fontStyle: 'italic'}}>{item.item.address.address}</Text> 
                      </View>
                      <MaterialIcons
                        name='navigate-next'
                        color='#000'
                        size={20}   
                        style={{paddingLeft:5, position:'absolute',right:3 }}                    
                      />
                    </TouchableOpacity>
                    <View  style={{ justifyContent: 'center', alignItems: 'center', width:'32%', height:'100%', borderLeftWidth:1, borderColor:'#d4d4d4' }} >
                      <Text style={{ textAlign: 'center', fontSize:16, }} >{item.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    </View>
                  </View>
                )}}                      
                showsVerticalScrollIndicator={false}              
                contentContainerStyle={{paddingTop:1,paddingBottom:65}}
          />
        </View>
      }
      </View>
      </>
  )
}


const styles = StyleSheet.create({
  image: {
    width:120, 
    height:120
  },
  header: {
      width: '100%',
      height:30,
      justifyContent:'center',
      backgroundColor:'#1eb980',
      alignItems: 'center',
  }, 
  title: {
    justifyContent: 'center',
    color:'#fff',
    fontSize:22,
  },
  icon: {
    width:25, 
    height:25,
    marginLeft:10,
    tintColor: '#1eb980'
  } 
})