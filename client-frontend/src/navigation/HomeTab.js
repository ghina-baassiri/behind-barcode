import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountDetailsScreen from '../screens/AccountDetailsScreen';
import BarcodeScannerScreen from '../screens/BarcodeScannerScreen';
import ProductStack from '../navigation/ProductStack';
import MarketStack from '../navigation/MarketStack';
import ChatScreen from '../screens/ChatScreen';
import ChatTabBarButton from '../components/ChatTabBarButton';
import {BottomTabStyles} from '../utilities/Styles';
import { windowWidth } from '../utilities/Dimensions';

const HomeTabNavigation = createBottomTabNavigator();

export default function HomeTab() {
  return (
    <HomeTabNavigation.Navigator 
      initialRouteName='MarketStack'
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: -5,
          elevation: 0,
          backgroundColor: '#fff',
          borderRadius: 5,
          height: 65,
          width: windowWidth,
        }
      }}
    >
      
      <HomeTabNavigation.Screen 
        name="MarketStack" 
        component={MarketStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems:'center', justifyContent:'center', margin:8}}>
              <Image
                source={require('../../assets/market_outline.png')}
                resizeMode='contain'
                style={{
                  width:30,
                  height:30,
                  marginBottom:5,
                  
                  tintColor: focused ? '#1eb980' : '#748c94'
                }}
              />
              <Text style={{color: focused ? '#1eb980' : '#748c94', fontSize:9, fontWeight:'bold'}}>MARKETS</Text>
            </View>
          )
        }}
      />
      <HomeTabNavigation.Screen 
        name="ProductStack" 
        component={ProductStack} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems:'center', justifyContent:'center',margin:8}}>
              <Image
                source={require('../../assets/grocery_outline.png')}
                resizeMode='contain'
                style={{
                  width:30,
                  height:30,
                  marginBottom:5,
                  
                  tintColor: focused ? '#1eb980' : '#748c94'
                }}
              />
              <Text style={{color: focused ? '#1eb980' : '#748c94', fontSize:9, fontWeight:'bold'}}>PRODUCTS</Text>
            </View>
          )
        }}
      />

      <HomeTabNavigation.Screen 
        name="Chat" 
        component={ChatScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/chat.png')}
              resizeMode='contain'
              style={{
                width:35,
                height:35,                
                tintColor: '#fff'
              }}
            />
          ),
          tabBarButton: (props) => (
            <ChatTabBarButton {...props} />
          )
        }}
      />


      <HomeTabNavigation.Screen 
        name="BarcodeScanner" 
        component={BarcodeScannerScreen} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems:'center', justifyContent:'center', margin:8}}>
              <Image
                source={require('../../assets/barcode_outline.png')}
                resizeMode='contain'
                style={{
                  width:30,
                  height:30,
                  marginBottom:5,
                  
                  tintColor: focused ? '#1eb980' : '#748c94'
                }}
              />
              <Text style={{color: focused ? '#1eb980' : '#748c94', fontSize:9, fontWeight:'bold', width:90}}>BARCODE SCANNER</Text>
            </View>
          )
        }}
      />      
      <HomeTabNavigation.Screen 
        name="AccountDetails" 
        component={AccountDetailsScreen} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems:'center', justifyContent:'center', margin:8}}>
              <Image
                source={require('../../assets/user_outline.png')}
                resizeMode='contain'
                style={{
                  width:30,
                  height:30,
                  marginBottom:5,
                  
                  tintColor: focused ? '#1eb980' : '#748c94'
                }}
              />
              <Text style={{color: focused ? '#1eb980' : '#748c94', fontSize:9, fontWeight:'bold'}}>ACCOUNT</Text>
            </View>
          )
        }}
      />
    </HomeTabNavigation.Navigator>
  );
}
