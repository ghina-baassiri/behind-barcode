import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { BBThemeColor } from '../utilities/Colors'
import ChatScreen from '../screens/ChatScreen'
import ChatListScreen from '../screens/ChatListScreen'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const ChatStackNavigation = createStackNavigator()

export default function ChatStack({ navigation }) {
  return (
    <ChatStackNavigation.Navigator
      initialRouteName='ChatList'
      screenOptions={{
        headerStyle: {
          backgroundColor: BBThemeColor,
        },
        headerTitleStyle: {
          fontSize: 24,
        },
        headerTintColor: '#fff',
        headerStatusBarHeight: 30,
        headerTitleAlign: 'left',
        fontSize: 20,
      }}
    >
      <ChatStackNavigation.Screen
        name='ChatList'
        component={ChatListScreen}
        options={{
          title: 'BB Chats',
          headerTitleStyle: {
            fontSize: 24,
            textAlign: 'center',
            left: -31,
          },
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                navigation.navigate('ProductStack', { screen: 'Products' })
              }
            >
              <MaterialIcons
                name='navigate-before'
                color='#fff'
                size={32}
                style={{ paddingLeft: 8 }}
              />
              {/* <Text style={{fontSize:15, color:'#fff', top:3, }}>Home</Text>  */}
            </TouchableOpacity>
          ),
        }}
      />
      <ChatStackNavigation.Screen
        name='Chat'
        component={ChatScreen}
        options={{
          title: '',
          headerRight: false,
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate('ChatList')}
            >
              <MaterialIcons
                name='navigate-before'
                color='#fff'
                size={32}
                style={{ paddingLeft: 8 }}
              />
              {/* <Text style={{fontSize:15, color:'#fff', top:3, }}>Home</Text>  */}
            </TouchableOpacity>
          ),
        }}
      />
    </ChatStackNavigation.Navigator>
  )
}
