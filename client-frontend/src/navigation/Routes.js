import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'
import HomeTab from './HomeTab'

const user = null

export default function Routes() {
  return (
    <NavigationContainer>
      {user ? <HomeTab /> : <AuthStack />}
    </NavigationContainer>
  )
}
