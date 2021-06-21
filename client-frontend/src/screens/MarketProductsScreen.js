import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity, LogBox } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonScreenStyles, ListStyles } from '../utilities/Styles';
import axios from 'axios';

export default function MarketProductsScreen({ route, navigation }) {
  LogBox.ignoreAllLogs();

  const { token } = useContext(AuthContext)
  const [products, setProducts] = useState([]);

  const market = route.params.market
  let product = {}

  function fetchMarketProducts(market) {
    axios.get(`http://192.168.43.152:8000/api/marketProducts/${market.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }}).then(response => {        
        if(response.status === 200) { 
          setProducts(response.data.products)
          return
        }      
    }).catch(err => {
      console.log('The Error: ', err)
      
    })   
  }

  useEffect(() => {
    fetchMarketProducts(market)      
  }, [])

  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center' }}>
      {/* Market */}
      <View style={ListStyles.mainItemWrapper}>                           
          <Image
            source={{uri:market.logo}} 
            resizeMode='contain'
            style={styles.image}
          />   
          <Text style={{ color:'#000', fontSize:16, marginBottom:10, fontWeight:'bold'}}>{market.name}</Text>
          <Text style={{color:'#000', fontSize:13, marginBottom:2, textAlign:'center'}}>{market.phone.slice(0, 2) +' '+market.phone.slice(2, 9) }</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Map',{address:market.address})}>
            <Image
              source={require('../../assets/map.png')}
              resizeMode='contain'
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={{marginBottom:4, fontSize:13, textAlign:'center'}}>{market.address.address}</Text>

          <View style={{flexDirection:'row', marginVertical:5}}>
              <RatingView numOfStars={market.rating}/>                
          </View>       
      </View>

      {/* Products prices */}
        <View style={{...ListStyles.listWidth, flexDirection:'row',  justifyContent: 'center', borderWidth:1, borderColor:'#d4d4d4', borderTopLeftRadius:10, borderTopRightRadius: 10, backgroundColor:'#1eb980', height:35,  elevation:3 }}>
          <Text style={{textAlign: 'center', alignSelf: 'center', fontSize:18 , fontWeight:'bold', borderRightWidth:1, width:'65%',  borderColor:'#d4d4d4', color:'#fff' }} >Product</Text>
          <Text style={{textAlign: 'center', alignSelf: 'center', fontSize:18,  fontWeight:'bold', width:'35%', color: '#fff' }} >Price</Text>
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={products}  
            renderItem={item => {
              product = item.item

              return (
                  <View style={{...ListStyles.listWidth, flexDirection:'row', textAlign: 'center', alignItems:'center', justifyContent: 'center', borderWidth:1, borderColor:'#d4d4d4', backgroundColor:'#fff', height:60 }}>
                    <TouchableOpacity 
                      style={{ alignSelf: 'center', width:ListStyles.listWidth.width*0.64,  justifyContent: 'center', height:'100%', paddingHorizontal:4 }}
                      onPress={() => {navigation.navigate('ProductStack', {screen: 'ProductMarkets', params: {product:product}})}}
                    >
                      <Text style={{  height:'auto', textAlign: 'center',fontSize:16 , color:'#000', borderBottomColor:"#1eb980"}} >{product.brand} </Text> 
                      <Text style={{  height:'auto', textAlign: 'center',fontSize:13 , color:'#000', fontStyle: 'italic'}}>{product.size} {product.unit}</Text> 

                    </TouchableOpacity>
                    <View  style={{ justifyContent: 'center', alignItems: 'center', width:'35%', height:'100%', borderLeftWidth:1, borderColor:'#d4d4d4' }} >
                      <Text style={{ textAlign: 'center', fontSize:16 }} >{product.price}</Text>
                    </View>
                    
                  </View>
              )}}                      
              showsVerticalScrollIndicator={false}              
              contentContainerStyle={{paddingTop:1,paddingBottom:65}}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width:120, 
    height:120,
    marginBottom:8,
    borderRadius:10
  },
  icon: {
    width:35, 
    height:35,
    marginBottom:4,
    borderRadius:10
  }
})

function RatingView(numOfStars) {
  var stars=[]
    // console.log("PROP ",numOfStars.numOfStars)
    if(numOfStars.numOfStars > 0) {
      for (let i = 0; i < numOfStars.numOfStars; i++) {
        stars.push(
          <Image 
            source={require('../../assets/star.png')} 
            resizeMode='contain'
            style={{width:19, height:19, marginRight:2, tintColor:'#1eb980'}}
          />
        )        
      }
    }
    if(numOfStars.numOfStars != 5) {
      for (let i = 0; i < 5-numOfStars.numOfStars; i++) {
        // console.log('empty star')
        stars.push(
          <Image 
            source={require('../../assets/star_outline.png')} 
            resizeMode='contain'
            style={{width:19, height:19,marginRight:2, tintColor:'#a9a9a9'}}
          />
        )
      }
    }
    // console.log('Star', stars.length)
  return (
    <View style={{flexDirection:'row'}}>
      {stars}
    </View>
  )  
}