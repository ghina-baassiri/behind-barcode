import React, { useState, useEffect, useContext } from 'react'
import { Text, View, TouchableOpacity, FlatList, Animated, Image } from 'react-native'
import { AuthContext } from '../navigation/AuthProvider';
import { MARKETS_DATA } from '../utilities/Data';
import { y, onScroll } from '../utilities/Animation';
import { CommonScreenStyles } from '../utilities/Styles';
import { ListStyles } from '../utilities/Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Avatar } from 'react-native-paper';
import axios from 'axios';


export default function MarketsScreen({ navigation }) {

  const [selectedId, setSelectedId] = useState(null);
  const [markets, setMarkets] = useState([]);
  const { token } = useContext(AuthContext)


  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

  useEffect(() => {
    fetchAllMarkets()

    // if(selectedId) {
    //   const response = fetchMarketProducts()
    //   console.log('market: ', response.market, '<br>products: ', response.products)
    //   navigation.navigate('MarketProducts', { market: response.market, products: response.products })
    // }        
  }, [])


  const fetchAllMarkets = () => {
    axios.get(`http://192.168.43.152:8000/api/allMarkets`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }})
      .then(response => {        
        console.log('SUCCESS: Recieved allMarkets API Response: ', response.data.markets)        
        setMarkets(response.data.markets)
        return
      })
      .catch(err => {
      console.log('The Error: ', err)      
    })   
  }

  const fetchMarketProducts = () => {
    axios.get(`http://192.168.43.152:8000/api/marketProducts`, selectedId).then(response => {        
      console.log('SUCCESS: Recieved marketProducts API Response: ', response.data)
      if(response.status === 200) { 
        return { market: response.data.market, products: response.data.products }
      }
      
    }).catch(err => {
      console.log('The Error: ', err)
      
    })   
  }


  const onItemPress = ({ item }) => {
    setSelectedId(item.id)
    console.log('navigate')
    navigation.navigate('MarketProducts', { marketId: selectedId })
  }

  return (
      <View style={CommonScreenStyles.container}>
          <FlatList
            bounces={true}
            keyExtractor={item => item.id.toString()}
            data={markets}
            renderItem={item => {
              return (

                <TouchableOpacity 
                  key={item.id} 
                  style={ ListStyles.itemWrapper }
                  onPress={() => navigation.navigate('MarketProducts', { marketId: item.item.id })}
                >
                    <View>  
                      { !item.item.logo ?
                          <Avatar.Image size={24} source={{uri: 'https//upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}} />
                        :
                          <Image
                            source={{uri:item.item.logo }} 
                            resizeMode='contain'
                            style={ ListStyles.image }
                          />
                      }                    
                      
                    </View>
                    <View style={{flex: 1.4}}>
                        <Text style={ ListStyles.name }>{item.item.name}</Text>
                        <Text>{item.item.phone}</Text>
                        <Text>{item.item.delivery ? 'Delivery Available' : 'Delivery Not Available'}</Text>
                        <Text>{item.item.address.address}</Text>
                        <View style={{flexDirection:'row'}}>
                          
                          <Text>Rate: {item.item.rating}</Text>
                        </View>
                        
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
            contentContainerStyle={{paddingTop:0}}
            {...{onScroll}}
          />
      </View> 

  );
}