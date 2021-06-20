import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { CommonScreenStyles } from '../utilities/Styles';
import { ListStyles } from '../utilities/Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios'


export default function ProductsScreen({ navigation }) {

  const [products, setProducts] = useState([]);
  const { token } = useContext(AuthContext)
 

  const fetchAllProducts = () => {
    axios.get(`http://192.168.43.152:8000/api/allProducts`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }})
    .then(response => {        
      // console.log('SUCCESS: Recieved allProducts API Response: ', response.data.products)        
      setProducts(response.data.products)
      return
    })
    .catch(err => {
    console.log('The Error: ', err)      
    })   
  }


  useEffect(() => {
    fetchAllProducts()       
  }, [])

  return ( 
    <View style={CommonScreenStyles.container}>
      
        <FlatList
          bounces={true}
          keyExtractor={item => item.barcode.toString()}
          data={products}        
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