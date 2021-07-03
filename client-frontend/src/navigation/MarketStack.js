import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MarketProductsScreen from '../screens/MarketProductsScreen';
import MapScreen from '../screens/MapScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MarketStackNavigation = createStackNavigator();

export default function MarketStack({navigation}) {

  return (
    <MarketStackNavigation.Navigator 
      initialRouteName='Map'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1eb980',
        },
        headerTintColor: '#fff',
        headerStatusBarHeight:25,
        headerTitleAlign: 'center',         
      }}
    >
      <MarketStackNavigation.Screen 
        name="Map" 
        component={MapScreen} 
        options={{ header: () => null }} 
      />
      <MarketStackNavigation.Screen 
        name="MarketProducts" 
        component={MarketProductsScreen} 
        options={{
          title: '',
          headerRight:false,
          headerLeft: ()=>(
            <TouchableOpacity onPress={() => navigation.navigate('Map')} style={{flexDirection:'row', top:5}}> 
              <MaterialIcons
                name='navigate-before'
                color='#fff'
                size={24}   
                style={{paddingLeft:10}}                    
              />
              <Text style={{fontSize:15, color:'#fff', top:2}}>Markets</Text> 
            </TouchableOpacity>            
          )      
        }}
      />    
    </MarketStackNavigation.Navigator>
  );
}