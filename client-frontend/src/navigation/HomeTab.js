import React, { useState, useEffect, useContext } from 'react';
import {Text, View, Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotificationsScreen from '../screens/NotificationsScreen';
import BarcodeScannerScreen from '../screens/BarcodeScannerScreen';
import ProductStack from '../navigation/ProductStack';
import MarketStack from '../navigation/MarketStack';
import ChatStack from '../navigation/ChatStack';
import ChatTabBarButton from '../components/ChatTabBarButton';
import { windowWidth } from '../utilities/Dimensions';
import { BadgeContext } from '../navigation/BadgeProvider';
import {firebaseConfig} from '../utilities/config';
import firebase from 'firebase';
require('firebase/firestore');


export default function HomeTab() {

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); 
  }

  const db = firebase.firestore();

  const [allMessages, setAllMessages] = useState([]);
  const HomeTabNavigation = createBottomTabNavigator();
  const { badge } = useContext(BadgeContext)

  // useEffect(() => {
  //   db
  //   .collection('notifications')
  //   .onSnapshot(collection => {
  //     db
  //     .collection('notifications')
  //     .orderBy('createdAt', 'desc')
  //     .get()
  //     .then(snapshot => {
  //       let msgs = snapshot.docs.map((doc, index) => ({
  //         barcode: doc.data().barcode,
  //         createdAt: doc.data().createdAt.toDate(),
  //         details: doc.data().details,
  //         title: doc.data().title,
  //         users: doc.data().users
  //       }))
  //       setAllMessages(msgs)
  //     })
  //   });  
  // }, [])
  
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
    {console.log('FROM HOMETAB BADGE = ', badge)}
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
                  left:5,
                  tintColor: focused ? '#1eb980' : '#748c94'
                }}
              />
              <Text style={{color: focused ? '#1eb980' : '#748c94', fontSize:8, fontWeight:'bold', left:5,}}>MARKETS</Text>
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
                  left:-3,
                  tintColor: focused ? '#1eb980' : '#748c94'
                }}
              />
              <Text style={{color: focused ? '#1eb980' : '#748c94', fontSize:8, fontWeight:'bold', left:-3,}}>PRODUCTS</Text>
            </View>
          )
        }}
      />

      <HomeTabNavigation.Screen 
        name="ChatStack" 
        component={ChatStack}
        options={{
          tabBarVisible: false,
          tabBarIcon: () => (
            <Image
              source={require('../../assets/chat.png')}
              resizeMode='contain'
              style={{
                width:27,
                height:27,                
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
                  right:-3,
                  marginBottom:5,
                  tintColor: focused ? '#1eb980' : '#748c94'
                }}
              />
              <Text style={{color: focused ? '#1eb980' : '#748c94', fontSize:8, fontWeight:'bold', right:-15, width:90}}>SCAN BARCODE</Text>
            </View>
          )
        }}
      />      
      <HomeTabNavigation.Screen 
        name="Notifications" 
        component={NotificationsScreen} 
        options={{
          tabBarBadge: badge > 0 ? badge: null,
          tabBarBadgeStyle: {
            top:10,
            left:-4,
            position:'absolute'
          },
          tabBarIcon: ({focused}) => (
            <View style={{alignItems:'center', justifyContent:'center', margin:8, top:1.5}}>
              <Image
                source={require('../../assets/bell_outline.png')}
                resizeMode='contain'
                style={{
                  width:27,
                  height:27,
                  marginBottom:5,
                  right:5,
                  tintColor: focused ? '#1eb980' : '#748c94'
                }}
              />
              <Text style={{color: focused ? '#1eb980' : '#748c94', fontSize:8, fontWeight:'bold', right:5}}>NOTIFICATIONS</Text>
            </View>
          )
        }}
      />
    </HomeTabNavigation.Navigator>
  );
}
