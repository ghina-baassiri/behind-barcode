import React, { useState, useEffect, useContext } from 'react';
import { useIsFocused } from "@react-navigation/native";
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity, LogBox, ActivityIndicator } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { ListStyles, LoginScreenStyles } from '../utilities/Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';

export default function MarketProductsScreen({ route, navigation }) {
  LogBox.ignoreAllLogs();

  const { user, token } = useContext(AuthContext)
  const [products, setProducts] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [rated, setRated] = useState(false)
  const [loading, setLoading] = useState(false)

  const market = route.params.market
  const isFocusedHistory = useIsFocused();


  const fetchRated = (userId, marketId) => {
    axios.get(`http://192.168.43.152:8000/api/rated/${marketId}/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }})
    .then(response => {  
      console.log('GOT RATED OF ', market.name)           
      setRated(response.data.rated)
      return
    })
    .catch(err => {
    console.log('rated Error: ', err)      
    })   
  }


  function fetchMarketProducts(market) {
    axios.get(`http://192.168.43.152:8000/api/marketProducts/${market.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }}).then(response => {  
        console.log('GOT PRODUCTS OF ', market.name)           
        if(response.status === 200) { 
          setLoading(false)
          setProducts(response.data.products)
        }      
    }).catch(err => {
      setLoading(false)
      setErrorMsg(err)
      console.log('fetchMarketProducts Error: ', err)
      
    })   
  } 

  useEffect(() => {
      setLoading(true)
      fetchRated(user._id, market.id)
      fetchMarketProducts(market) 

  }, [isFocusedHistory])




  return (
    <View style={{flex:1, alignItems:'center', }}>
      {/* Market */}
      <View style={{...ListStyles.mainItemWrapper, paddingHorizontal:15, marginTop:20}}>                           
          <Image
            source={{uri:market.logo}} 
            resizeMode='contain'
            style={styles.image}
          />   
          <Text style={{ color:'#000', fontSize:16, marginBottom:10, fontWeight:'bold'}}>{market.name}</Text>
          <TouchableOpacity activeOpacity={.9} onPress={() => navigation.navigate('Map',{address:market.address})}>
            <Image
              source={require('../../assets/map.png')}
              resizeMode='contain'
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={{color:'#000', fontSize:13, marginBottom:2, textAlign:'center'}}>{market.phone.slice(0, 2) +' '+market.phone.slice(2, 9) }</Text>
          <View style={{flexDirection:'row'}}>
            <Text style={{marginBottom:4}}>Delivery: </Text> 
            {market.delivery ? 
            <Feather
                name='truck'
                size={17}
                color='#1eb980'
                style={{top:1}}
            /> : 
            <Feather
                name='truck'
                size={17}
                color='red'
                style={{top:1}}
            />}
            
        </View>
          <Text style={{marginBottom:4, fontSize:13, textAlign:'center'}}>{market.address.address}</Text>

          <View style={{flexDirection:'row', marginVertical:5}}>
              <RatingView numOfStars={market.rating}/>                
          </View>     
          <View>
            {/* {!rated && <TouchableOpacity style={styles.btn} onPress={()=> {}}>
              <Text style={styles.btnText}>Rate</Text>
            </TouchableOpacity> } */}
          </View>  
      </View>

      {/* Products prices */}
        <View style={{...ListStyles.listWidth, flexDirection:'row',  justifyContent: 'center', borderWidth:1, borderColor:'#d4d4d4', borderTopLeftRadius:10, borderTopRightRadius: 10, backgroundColor:'#1eb980', height:35,  elevation:3 }}>
          <Text style={{textAlign: 'center', alignSelf: 'center', fontSize:18 , fontWeight:'bold', borderRightWidth:1, width:'68%',  borderColor:'#d4d4d4', color:'#fff' }} >Product</Text>
          <View style={{width:'32%', alignItems: 'center', justifyContent:'center', flexDirection:'row'}}>
              <Text style={{  textAlign:'center', fontSize:18,  fontWeight:'bold', color: '#fff' }} >Price </Text>
              <Text style={{  textAlign:'center', fontSize:14,  fontWeight:'bold', color: '#fff' }} >(LBP)</Text>
            </View>
        </View>
        { loading && <ActivityIndicator size='large' color='#1eb980' animating={true} style={{opacity:1, position:'absolute', right:0,left:0,top:250,bottom:0 }}/>}
        { (!loading && errorMsg!='') && <Text style={{  color:'#ccc', fontSize:20,top:70}}>No Products</Text>}
        { (!loading && products!=[]) && 
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={products}  
            renderItem={item => {

              return (
                  <View style={{...ListStyles.listWidth, flexDirection:'row', textAlign: 'center', alignItems:'center', justifyContent: 'center', borderWidth:1, borderColor:'#d4d4d4', backgroundColor:'#fff', height:60 }}>
                    <TouchableOpacity 
                      activeOpacity={0.7}
                      style={{ flexDirection:'row', alignItems:'center', alignSelf: 'center', width:ListStyles.listWidth.width*0.68,  justifyContent: 'center', height:'100%', paddingHorizontal:2 }}
                      onPress={() => {
                        navigation.navigate('ProductStack', {screen: 'ProductMarkets', params: {product:item.item}})
                      }}
                    > 
                      <View>
                        <Text style={{  height:'auto', textAlign: 'center',fontSize:16 , color:'#000', borderBottomColor:"#1eb980"}} >{item.item.brand} </Text> 
                        <Text style={{  height:'auto', textAlign: 'center',fontSize:13 , color:'#000', fontStyle: 'italic'}}>{item.item.size} {item.item.unit}</Text> 
                      </View>
                      <MaterialIcons
                        name='navigate-next'
                        color='#000'
                        size={20}   
                        style={{paddingLeft:5, position:'absolute',right:3, bottom:3}}                    
                      />
                    </TouchableOpacity>
                    <View  style={{ justifyContent: 'center', alignItems: 'center', width:'32%', height:'100%', borderLeftWidth:1, borderColor:'#d4d4d4' }} >
                      <Text style={{ textAlign: 'center', fontSize:16 }} >{item.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>                      
                    </View>                    
                  </View>
              )}}                      
              showsVerticalScrollIndicator={false}              
              contentContainerStyle={{paddingTop:1,paddingBottom:65}}
        />}
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
    width:30, 
    height:30,
    marginBottom:4,
    borderRadius:10
  },
  btn: {
    width:  60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop:15,
    backgroundColor:'#1eb980'
},
btnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color:'#fff'
}, 
})

function RatingView(numOfStars) {
  var stars=[]
    // console.log("PROP ",numOfStars.numOfStars)
    if(numOfStars.numOfStars > 0) {
      for (let i = 0; i < numOfStars.numOfStars; i++) {
        stars.push(
          <Image 
            key={'stars_' + i}
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
            key={'stars_empty' + i}
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