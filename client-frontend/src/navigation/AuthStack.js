import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import HomeTab from '../navigation/HomeTab';

const AuthStackNavigation = createStackNavigator();

export default function AuthStack() {

  return (
    <AuthStackNavigation.Navigator initialRouteName='Splash'>
      <AuthStackNavigation.Screen 
        name="Splash" 
        component={SplashScreen} 
        options={{ header: () => null }} 
      />
      <AuthStackNavigation.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ header: () => null }} 
      />
      <AuthStackNavigation.Screen 
        name="Signup" 
        component={SignupScreen} 
        options={{ header: () => null }} 
      />   
      <AuthStackNavigation.Screen 
        name="HomeTab" 
        component={HomeTab} 
        options={{ header: () => null }} 
      />     
    </AuthStackNavigation.Navigator>
  );
}

