import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, TextInput, StyleSheet } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonScreenStyles, LoginScreenStyles } from '../utilities/Styles';
import { ListStyles } from '../utilities/Styles';
import { windowWidth } from '../utilities/Dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios'


export default function ProductsScreen({ navigation }) {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');

  const { token } = useContext(AuthContext)
 

  const fetchAllProducts = () => {
    axios.get(`http://192.168.43.152:8000/api/allProducts`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }})
    .then(response => {        
      // console.log('SUCCESS: Recieved allProducts API Response: ', response.data.products)        
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

  useEffect(() => {
    fetchAllProducts()       
  }, [])

  return ( 
    <View style={CommonScreenStyles.container}>
      <TextInput
        style={styles.textInput}
        value={search}
        placeholder='Search Product'
        underlineColorAndroid='transparent'
        onChangeText={(text)=>searchFilter(text)}
      />
        <FlatList
          bounces={true}
          keyExtractor={(item, index) => index.toString()}
          data={filteredProducts}        
          renderItem={item => {
            return (
                <TouchableOpacity 
                  
                  style={ ListStyles.itemWrapper }
                  onPress={() => navigation.navigate('ProductMarkets', { productBarcode: item.item.barcode })}
                >
                  {console.log('BARCODEEE: ', item.item.barcode)}
                      <View>                          
                        <Image
                          source={{uri:item.item.image }} 
                          resizeMode='contain'
                          style={ ListStyles.image }
                        />                                         
                        
                      </View>
                      <View style={{flex: 1.4}}>
                          <Text style={{ color:'#000', fontSize:20, marginTop:7}}>{item.item.brand}</Text>
                      
                          <Text style={{marginTop:7}}>{item.item.category}</Text>

                          <Text style={{marginTop:7}}>{item.item.size + ' ' + item.item.unit}</Text>
                      </View>
                      <View style={{flex:0.2}}>
                        <MaterialIcons
                          name='navigate-next'
                          color='#000'
                          size={20}
                        />
                      </View>
                        
                    </TouchableOpacity>
                  )}}
                
                showsVerticalScrollIndicator={false}              
                contentContainerStyle={{paddingTop:10,paddingBottom:65}}
                />
      </View> 
  )
}


const styles = StyleSheet.create({
  textInput: {
    height: 50,
    width: windowWidth*0.9,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#fff'
  }
})