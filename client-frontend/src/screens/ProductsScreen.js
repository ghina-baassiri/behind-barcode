import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, TextInput, StyleSheet } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonScreenStyles, LoginScreenStyles } from '../utilities/Styles';
import { ListStyles } from '../utilities/Styles';
import { windowWidth } from '../utilities/Dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ActivityIndicator } from 'react-native-paper';
import Svg from 'react-native-svg';
import {Image as SvgImage}  from 'react-native-svg';
import axios from 'axios'


export default function ProductsScreen({ navigation }) {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [borderWidth, setBorderWidth] = useState(1);


  const { token } = useContext(AuthContext)
  let product = {}

  const fetchAllProducts = () => {
    axios.get(`http://192.168.43.152:8000/api/allProducts`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }})
    .then(response => {        
      setIsLoading(false)
      setProducts(response.data.products)
      setFilteredProducts(response.data.products)
      return
    })
    .catch(err => {
    console.log('The Error: ', err)      
    })   
  }

  const searchFilter = (text) => {
    if(text) {
      const newData = products.filter((item) => {
        const itemData = item.brand ? item.brand.toUpperCase() : ''.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData) > -1
      })
    setFilteredProducts(newData)
    setSearch(text)
    }
    else {
      setFilteredProducts(products)
      setSearch(text)
    }
  }

  const onFocus = () => {
    setBorderWidth(2.5)
  }

  const onBlur = () => {
    setBorderWidth(1)
  }

  useEffect(() => {
    fetchAllProducts()       
  }, [])

  return ( 
    <View style={CommonScreenStyles.container}>
      {isLoading &&  <ActivityIndicator size='large' color='#1eb980' animating={true} style={{opacity:1, position:'absolute', right:0,left:0,top:0,bottom:0 }}/>}
      <View style={{paddingVertical:5, backgroundColor:'#1eb980', zIndex:1, width:'100%', alignItems:'center'}}>
        <TextInput
          style={{...styles.textInput, borderWidth:borderWidth }}
          value={search}
          placeholder='Search Product'
          underlineColorAndroid='transparent'
          onChangeText={(text)=>searchFilter(text)}
          onFocus={ () => onFocus() }
          onBlur={ () => onBlur() }
        />
      </View>
        <FlatList
          bounces={true}
          keyExtractor={(item, index) => index.toString()}
          data={filteredProducts}        
          renderItem={item => {
            product = item.item
            return (
                <TouchableOpacity                   
                  style={ ListStyles.itemWrapper }
                  onPress={() => navigation.navigate('ProductMarkets', { product: product})}
                >
                  <View style={{ elevation:3, flexDirection:'row', padding: 10, alignContent:'center', borderColor: '#1eb980', borderWidth:1.5, borderRadius:20, backgroundColor:'#fff'}}>
                      <Svg width={90} height={90} style={{ paddingVertical:10, marginRight:5}}>
                          <SvgImage
                              href={product.image}
                              width={80}
                              height={80}                                
                          />
                      </Svg>
                      <View >
                          <Text style={{ color:'#000', fontSize:16, marginTop:7, fontWeight:'bold'}}>{product.brand}</Text>
                      
                          <Text style={{paddingVertical:1}}>{product.category}</Text>

                          <Text style={{paddingVertical:1}}>{product.size + ' ' + product.unit}</Text>
                      </View>  
                      <View style={{position:'absolute', right:3, top:83}}>
                        <MaterialIcons
                          name='navigate-next'
                          color='#000'
                          size={20}
                        />
                      </View> 

                  </View>
                </TouchableOpacity>
                  )}}
                
                showsVerticalScrollIndicator={false}              
                contentContainerStyle={{paddingTop:5,paddingBottom:65}}
                />
      </View> 
  )
}


const styles = StyleSheet.create({
  textInput: {
    height: 50,
    width: windowWidth*0.9,
    paddingLeft: 20,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius:20,
    borderColor: '#1eb980', 
  }
})