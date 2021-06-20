import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MarketProductsScreen from '../screens/MarketProductsScreen';
import MapScreen from '../screens/MapScreen';

const MarketStackNavigation = createStackNavigator();

export default function MarketStack() {

  return (
    <MarketStackNavigation.Navigator initialRouteName='Map'>
      <MarketStackNavigation.Screen 
        name="Map" 
        component={MapScreen} 
        options={{ header: () => null }} 
      />
      <MarketStackNavigation.Screen 
        name="MarketProducts" 
        component={MarketProductsScreen} 
        options={{ header: () => null }} 
      />    
    </MarketStackNavigation.Navigator>
  );
}

