import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Image } from 'react-native';
import { ListStyles } from '../utilities/Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function MarketItem({ item, setSelectedId }) {
  
  {console.log('In MarketItem component')}
  {console.log('image directory: ', item.logo)}

  // Calculate market rating average
  

  return (
    
    <TouchableOpacity 
      key={item.id} 
      style={ ListStyles.itemWrapper }
      onPress={item=>setSelectedId(item.id)}
    >
        <View>
          <Image
              source={require('../../assets/fresh_mart.png')} // error using item.logo
              style={ ListStyles.image }
          />
        </View>
        <View style={{flex: 1.4}}>
            <Text style={ ListStyles.name }>{item.name}</Text>
            <Text>{item.phone}</Text>
            <Text>{item.delivery ? 'Delivery Available' : 'Delivery Not Available'}</Text>
            <Text>Address</Text>
            <View style={{flexDirection:'row'}}>
              
              <Text>Rate</Text>
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
  );
}
