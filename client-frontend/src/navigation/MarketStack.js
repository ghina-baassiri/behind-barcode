import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MarketsScreen from '../screens/MarketsScreen';
import MarketProductsScreen from '../screens/MarketProductsScreen';

const MarketStackNavigation = createStackNavigator();

export default function MarketStack() {

  return (
    <MarketStackNavigation.Navigator initialRouteName='Markets'>
      <MarketStackNavigation.Screen 
        name="Markets" 
        component={MarketsScreen} 
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

