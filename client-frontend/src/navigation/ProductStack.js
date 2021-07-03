import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsScreen from '../screens/ProductsScreen';
import ProductMarketsScreen from '../screens/ProductMarketsScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProductStackNavigation = createStackNavigator();

export default function ProductStack({navigation}) {

  return (
    <ProductStackNavigation.Navigator 
      initialRouteName='Products'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1eb980',
        },
        headerTintColor: '#fff',
        headerStatusBarHeight:25,
        headerTitleAlign: 'center',
         
      }}
      >
      <ProductStackNavigation.Screen 
        name="Products" 
        component={ProductsScreen} 
        options={{ header: () => null }} 
      />
      <ProductStackNavigation.Screen 
        name="ProductMarkets" 
        component={ProductMarketsScreen} 
        options={{
          title: '',
          headerLeft: ()=>(
            <TouchableOpacity onPress={() => navigation.navigate('Products')}>                   
              <MaterialIcons
                name='navigate-before'
                color='#fff'
                size={32}   
                style={{paddingLeft:8}}                    
              />
              {/* <Text style={{fontSize:15, color:'#fff', top:2}}>Products</Text>  */}
            </TouchableOpacity>
            
          )
      
        }}
      />    
    </ProductStackNavigation.Navigator>
  );
}

