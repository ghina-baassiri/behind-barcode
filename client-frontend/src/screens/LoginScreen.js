import React, { useState, useContext, useEffect } from 'react';
import { Text, View, TextInput, Image, Easing, TouchableOpacity, Animated, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

import Feather from 'react-native-vector-icons/Feather';

import { AuthContext } from '../navigation/AuthProvider';
import { LoginScreenStyles } from '../utilities/Styles';
import { CommonScreenStyles } from '../utilities/Styles';
import { animate } from '../utilities/Animation';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import * as GoogleSignIn from 'expo-google-sign-in';


export default function LoginScreen({ navigation }) {

  const [passwordVisibilityIcon, setpasswordVisibilityIcon] = useState('eye-off-outline')
  const [passwordVisibility, setpasswordVisibility] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const { setUser, setToken } = useContext(AuthContext)
  const [validationMsg, setValidationMsg] = useState({ 'email' :'', 'password': '' })
  const emailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  // Handles password visibility upon eye icon toggle
  const onPasswordVisibilityIconToggle = () => {
    passwordVisibilityIcon === 'eye-outline' ? setpasswordVisibilityIcon('eye-off-outline') : setpasswordVisibilityIcon('eye-outline')
    passwordVisibility === true ? setpasswordVisibility(false) : setpasswordVisibility(true)
  }

  // Handle those changes and rerender upon change of user state
  useEffect(() => {
    console.log('Logged in: ', loggedIn)    
      setEmail('')
      setPassword('')
      setValidationMsg({ email:'', password: '' })
      if(loggedIn) 
        navigation.navigate('HomeTab')
     
  }, [loggedIn])

  // Called on Login button press: sends axios login api request  
  const onLoginPress = () => {
    console.log('onLoginPress function')
    console.log('validation: ', validationMsg)
    const data = {
      email: email,
      password: password
    }
    setValidationMsg({ email:'', password: '' })

    axios.post(`http://192.168.43.152:8000/api/login`, data).then(response => {        
      console.log('SUCCESS: Recieved Login API Response: ', response.data)
      if(response.status === 200) {
          const full_name = response.data.client.user.first_name + ' ' + response.data.client.user.last_name
          setUser(full_name)
          setToken(response.data.token)
          setLoggedIn(true)    
          navigation.navigate('HomeTab')      
      }
      
    }).catch(err => {
      console.log('The Error: ', err.response)
      if (err.response) {
        if(err.response.status === 422) {
          console.log('Login API Response Message: ', err.response.data.message)

          err.response.data.message.map((message) => {
            if(message.includes("email")) {            
              setValidationMsg(prevState => ({
                ...prevState,
                email: message
              }))
            }
            if(message.includes("password")) {
              setPassword('')   
              setValidationMsg(prevState => ({
                ...prevState,
                password: message
              }))
            }         
          })                                      
        }
        else if(err.response.status === 401) {
          alert('Invalid email or password')
          setEmail('')
          setPassword('')
        }
        else {
          console.log('Catch Another Error: ', err)
        }
      }
    })   
  } 

  return (
    <View style={LoginScreenStyles.container}>
      <View style={LoginScreenStyles.header}>
        <Text style={LoginScreenStyles.text_header}>Welcome to BB</Text>
      </View>
      <Animated.View style={LoginScreenStyles.footer}>
        <View style={{ marginBottom: 10 }}>
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
            {email && email.match(emailformat) ?
            <Feather
              name='check-circle'
              size={20}
              color='green'
            />
            : email ?
            <Feather
              name='check-circle'
              size={20}
              color='#cf4332'
            />
            : null
          }
          </View>
          { validationMsg.email ?
            <Text style={LoginScreenStyles.text_validation}>{validationMsg.email}</Text>
            : null
          }

          <Text style={{...LoginScreenStyles.text_footer, marginTop: 25}}>Password</Text>
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
          { validationMsg.password ?
            <Text style={LoginScreenStyles.text_validation}>{validationMsg.password}</Text>
            : null
          }
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
            <Text style={{...LoginScreenStyles.textSign, color:'#fff'}}>Sign In with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => alert('fb')}
            style={{...LoginScreenStyles.signIn, backgroundColor:'#3c66c4', marginTop:15, marginBottom: 10, flexDirection: 'row'}}
          >
            <Icon name={'logo-facebook'} size={22} style={{position:'absolute', left:30, top:13, color:'#fff'}}/>
            <Text style={{...LoginScreenStyles.textSign, color:'#fff'}}>Login with Facebook</Text>
          </TouchableOpacity>         
        </View>
        <View
            style={{
              borderBottomColor: '#e6e6e6',
              borderBottomWidth: 1,              
              width: 150,
              alignSelf:'center'
            }}
          />
          <View style={{...CommonScreenStyles.navButton, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{...LoginScreenStyles.text_footer, fontSize: 15}}>New user? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')} >
              <Text style={{...LoginScreenStyles.text_footer,  textDecorationLine:'underline', fontSize: 15}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
      </Animated.View>
  </View>
  );
}