import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonScreenStyles } from '../utilities/Styles';
import { ListStyles } from '../utilities/Styles';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios'

export default function ProductMarketsScreen({route}) {

  const { token } = useContext(AuthContext)
  const [product, setProduct] = useState({});
  const [markets, setMarkets] = useState([]);

  console.log('props ', route.params.productBarcode)

  function fetchProductMarkets(barcode) {
    console.log('fetchProductMarkets barcode: ', barcode)
    axios.get(`http://192.168.43.152:8000/api/productMarkets/`+ barcode, {
      headers: {
        'Authorization': `Bearer ${token}`
      }}).then(response => {        
        console.log('SUCCESS-Data: ', response.data)
        if(response.status === 200) { 
          setMarkets(response.data.productMarketsDetails.markets)
          setProduct(response.data.productMarketsDetails.product)
          return
        }      
    }).catch(err => {
      console.log('The Error: ', err)
      
    })   
  }

  useEffect(() => {
    fetchProductMarkets(route.params.productBarcode)      
  }, [])

  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      {console.log('product: ',product)}
      {console.log('markets: ', markets)}
      {/* Product */}
      <View style={{alignItems:'center', justifyContent:'center', flex:0.2, paddingTop: 90}}>                           
          <Image
            source={{uri:product.image }} 
            resizeMode='contain'
            style={ styles.image }
          />   
          <Text style={{ color:'#000', fontSize:20, marginTop:7}}>{product.brand}</Text>
      
          <Text style={{marginTop:4}}>{product.category}</Text>

          <Text style={{marginTop:4}}>{product.size + ' ' + product.unit}</Text>   
      </View>

      {/* Price per market */}
      <View style={{flex:0.8, }}>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={markets}  
            renderItem={item => {
              return (
                <View  style={ ListStyles.itemWrapper } >
                    <View>                         
                      <Image
                        source={{uri:item.item.logo }} 
                        resizeMode='contain'
                        style={ ListStyles.image }
                      />    
                    </View>
                    <View style={{flex: 1}}>

                    <Text style={{ color:'#000', fontSize:20, marginBottom:10}}>{item.item.name}</Text>
                    
                    <Text style={{ color:'#000', fontSize:15, marginBottom:5}}>Price: {item.item.price} LBP</Text>

                    <Text style={{ color:'#000', fontSize:15, marginBottom:5}}>{item.item.phone.slice(0, 2) +' '+item.item.phone.slice(2, 9) }</Text>
                    <Text style={{ color:'#000', fontSize:15, marginBottom:5}}>{item.item.address.address }</Text>

                    <View style={{flexDirection:'row'}}>
                      <Text style={{marginBottom:5}}>Delivery: </Text> 
                      {item.item.delivery ? 
                        <Feather
                          name='check-circle'
                          size={15}
                          color='green'
                          style={{top:3}}
                        /> : 
                        <Feather
                          name='x-circle'
                          size={17}
                          color='#cf4332'
                          style={{top:1}}
                        />}
                      
                    </View>
                    
                    <View style={{flexDirection:'row', marginBottom:5}}>
                        {console.log('Rating',item.item.rating)}
                        {<RatingView numOfStars={item.item.rating}/>}                  
                    </View>              
                </View>
        
                </View>
              )}}
                      
              showsVerticalScrollIndicator={false}              
              contentContainerStyle={{paddingTop:50,paddingBottom:65}}
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  image: {
    width:120, 
    height:120
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
            style={{width:19, height:19, marginRight:2}}
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