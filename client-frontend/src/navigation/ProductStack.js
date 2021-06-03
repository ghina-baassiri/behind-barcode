import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsScreen from '../screens/ProductsScreen';
import ProductMarketsScreen from '../screens/ProductMarketsScreen';

const ProductStackNavigation = createStackNavigator();

export default function ProductStack() {

  return (
    <ProductStackNavigation.Navigator initialRouteName='Products'>
      <ProductStackNavigation.Screen 
        name="Products" 
        component={ProductsScreen} 
        options={{ header: () => null }} 
      />
      <ProductStackNavigation.Screen 
        name="ProductMarkets" 
        component={ProductMarketsScreen} 
        options={{ header: () => null }} 
      />    
    </ProductStackNavigation.Navigator>
  );
}

