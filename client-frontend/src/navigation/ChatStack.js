import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '../screens/ChatScreen';
import ChatListScreen from '../screens/ChatListScreen';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ChatStackNavigation = createStackNavigator();

export default function ChatStack({navigation}) {

  
  return (
    <ChatStackNavigation.Navigator 
      initialRouteName='ChatList'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1eb980',
        },
        headerTitleStyle: {
          fontSize: 24,
        },
        headerTintColor: '#fff',
        headerStatusBarHeight:30,
        headerTitleAlign: 'left', 
        fontSize:20
              
      }}
    >
      <ChatStackNavigation.Screen 
        name="ChatList" 
        component={ChatListScreen} 
        options={{ 
          title: 'BB Chats',
          headerLeft: ()=>(
            <TouchableOpacity onPress={() => navigation.navigate('MarketStack')}>      
              <MaterialIcons
                name='navigate-before'
                color='#fff'
                size={24}   
                style={{paddingLeft:10}}                    
              />
            </TouchableOpacity>
          ),
          headerRight: ()=>(
            <TouchableOpacity onPress={() => navigation.navigate('ChatList')}>      
              <Feather
                  name='search'
                  size={24}
                  color='#fff'
                  style={{right:20}}
              />
            </TouchableOpacity>
          )
      
        }}
      />
      <ChatStackNavigation.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{
          headerRight:false,
          headerLeft: ()=>(
            <TouchableOpacity onPress={() => navigation.navigate('ChatList')}>      
              <MaterialIcons
                name='navigate-before'
                color='#fff'
                size={24}   
                style={{paddingLeft:10}}                    
              />
            </TouchableOpacity>
          )
      
        }}
      />    
    </ChatStackNavigation.Navigator>
  );
}

