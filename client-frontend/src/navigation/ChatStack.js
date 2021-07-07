import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
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
          headerTitleStyle: {
            fontSize:24,
            textAlign:'center',
            left:-31
          },
          headerLeft: ()=>(
            <TouchableOpacity onPress={() =>  navigation.navigate('ProductStack', {screen: 'Products'})}  >  
              <MaterialIcons
                name='navigate-before'
                color='#fff'
                size={32}   
                style={{paddingLeft:8}}                    
              />
              {/* <Text style={{fontSize:15, color:'#fff', top:3, }}>Home</Text>  */}
            </TouchableOpacity>
          )
      
        }}
      />
      <ChatStackNavigation.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{
          title:'',
          headerRight:false,
          headerLeft: ()=>(
            <TouchableOpacity onPress={() =>  navigation.navigate('ChatList')}>  
              <MaterialIcons
                name='navigate-before'
                color='#fff'
                size={32}   
                style={{paddingLeft:8}}                    
              />
              {/* <Text style={{fontSize:15, color:'#fff', top:3, }}>Home</Text>  */}
            </TouchableOpacity>
          )
      
        }}
      />    
    </ChatStackNavigation.Navigator>
  );
}

