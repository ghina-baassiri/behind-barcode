import React, { useState, useContext, useEffect } from 'react';
import { Text, View, TextInput, Image, Easing, TouchableOpacity, Animated, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

import { LinearGradient } from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

import { AuthContext } from '../navigation/AuthProvider';
import { LoginScreenStyles } from '../utilities/Styles';
import { CommonScreenStyles } from '../utilities/Styles';
import { animate } from '../utilities/Animation';
import * as GoogleSignIn from 'expo-google-sign-in';


export default function LoginScreen({ navigation }) {

  const [passwordVisibilityIcon, setpasswordVisibilityIcon] = useState('eye-off-outline')
  const [passwordVisibility, setpasswordVisibility] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const { setUser } = useContext(AuthContext)

  // Handles password visibility upon eye icon toggle
  const onPasswordVisibilityIconToggle = () => {
    passwordVisibilityIcon === 'eye-outline' ? setpasswordVisibilityIcon('eye-off-outline') : setpasswordVisibilityIcon('eye-outline')
    passwordVisibility === true ? setpasswordVisibility(false) : setpasswordVisibility(true)
  }

  // onMount
  useEffect(() => {   
    animate(Easing.ease)    
  }, [])

  // Called on Login button press: sends axios login api request  
  const onLoginPress = () => {
    const data = {
      email: email,
      password: password
    }
    axios.post(` http://192.168.43.152:8000/api/auth/login`, data).then(response => {        
      console.log('SUCCESS: Recieved Login API Response: ', response.data)
      if(response.status === 200) {
          const full_name = response.data.user.first_name + ' ' + response.data.user.last_name
          setUser(full_name)
          setLoggedIn(true)          
      } 
      else if(response.status === 422) {
        console.log('Login API Response Message: ', response.data.message)
        // if(response.data.message.includes("empty")) {
        //   if(response.data.message.includes("email"))
        //       //
        //   if(response.data.message.includes("password"))
        //       //                
        // }   
        if(response.data.message.includes("format" && "email")) {
          if(response.data.message.includes("email"))
              setEmail('')
          if(response.data.message.includes("password"))
              setPassword('')                
        }                                         
      }
      else {
        console.log('Some other error')
      }
    }).catch(err => {
      console.log('Catch Error: ', err)
    })   
  } 

  // Handle those changes and rerender upon change of user state
  useEffect(() => {
    console.log('_____________________')
    console.log('Logged in: ', loggedIn)
    if(loggedIn) {
      setEmail('')
      setPassword('')
      navigation.navigate('HomeTab')
    }    
  }, [loggedIn])


  return (
    <View style={LoginScreenStyles.container}>
      {/* <StatusBar backgroundColor='#1eb980' barStyle='light-content'/> */}
      <View style={LoginScreenStyles.header}>
        <Text style={LoginScreenStyles.text_header}>Welcome to BB!</Text>
      </View>
      <Animated.View style={LoginScreenStyles.footer}>

        <Text style={LoginScreenStyles.text_footer}>Email</Text>        
        <View style={LoginScreenStyles.action}>
          <Icon name={'mail-outline'} size={20} color='#05375a'/>
          <TextInput
            value={email}
            style={LoginScreenStyles.textInput}
            onChangeText={userEmail => setEmail(userEmail)}
            numberOfLines={1}
            placeholder='Email'
            placeholderTextColor='#bdbdbd'
            underlineColorAndroid="transparent"
            autoCapitalize='none'
            keyboardType='email-address'
            autoCorrect={false}
          />
          {email ?
          <Feather
            name='check-circle'
            size={20}
            color='green'
          />
          : null }
        </View>

        <Text style={{...LoginScreenStyles.text_footer, marginTop: 35}}>Password</Text>
        <View style={LoginScreenStyles.action}>
          <Icon name={'lock-closed-outline'} size={20} color='#05375a'/>
          <TextInput
            value={password}
            style={LoginScreenStyles.textInput}
            numberOfLines={1}
            placeholder='Password'
            placeholderTextColor='#bdbdbd'
            underlineColorAndroid="transparent"
            onChangeText={userPassword => setPassword(userPassword)}
            secureTextEntry={passwordVisibility}
          />
          <Icon name={passwordVisibilityIcon} 
            size={20} 
            style={{opacity:0.6}}
            onPress={onPasswordVisibilityIconToggle}
          />
        </View>

        <View style={LoginScreenStyles.button}>
          <TouchableOpacity
            onPress={onLoginPress}
            style={{...LoginScreenStyles.signIn, borderColor:'#17a672', borderWidth:1, marginTop: 15}}
          >
            <Text style={{...LoginScreenStyles.textSign, color:'#17a672'}}>Sign In</Text>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => alert('google')}
            style={{...LoginScreenStyles.signIn, backgroundColor:'#cf4332', marginTop: 15, flexDirection: 'row'}}
          >
            <Icon name={'logo-google'} size={22} style={{position:'absolute', left:30, top:13, color:'#fff'}}/>

            {/* <Icon name={'logo-google'} size={20} color='#fff'/> */}
            <Text style={{...LoginScreenStyles.textSign, color:'#fff'}}>Sign In with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => alert('fb')}
            style={{...LoginScreenStyles.signIn, backgroundColor:'#3c66c4', marginTop:15, marginBottom: 10, flexDirection: 'row'}}
          >
            <Icon name={'logo-facebook'} size={22} style={{position:'absolute', left:30, top:13, color:'#fff'}}/>
            <Text style={{...LoginScreenStyles.textSign, color:'#fff'}}>Login with Facebook</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={{...LoginScreenStyles.signIn, borderColor:'#17a672', borderWidth:1, marginTop: 15}}
          >
            <Text style={{...LoginScreenStyles.textSign, color:'#17a672'}}>Sign Up</Text>
          </TouchableOpacity> */}          
        </View>
        <View
            style={{
              borderBottomColor: '#e6e6e6',
              borderBottomWidth: 1,              
              width: 150,
              alignSelf:'center'
            }}
          />
          <TouchableOpacity
            style={{...CommonScreenStyles.navButton, justifyContent: 'center', alignItems: 'center'}}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={{...LoginScreenStyles.text_footer, fontSize: 15}}>New user? </Text>
            <Text style={{...LoginScreenStyles.text_footer,  textDecorationLine:'underline', fontSize: 15}}>Sign Up</Text>
          </TouchableOpacity>
      </Animated.View>
  </View>
  );
}