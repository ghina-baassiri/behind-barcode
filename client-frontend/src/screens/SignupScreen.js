import React, { useState, useContext, useEffect } from 'react';
import { Text, View, TextInput, Image, Easing, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

import Feather from 'react-native-vector-icons/Feather';

import { AuthContext } from '../navigation/AuthProvider';
import { LoginScreenStyles } from '../utilities/Styles';
import { CommonScreenStyles } from '../utilities/Styles';


export default function LoginScreen({ navigation }) {

  const [passwordVisibilityIcon, setpasswordVisibilityIcon] = useState('eye-off-outline')
  const [passwordVisibility, setpasswordVisibility] = useState(true)
  const [confirmPasswordVisibilityIcon, setconfirmPasswordVisibilityIcon] = useState('eye-off-outline')
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true)


  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState({
    text: '',
    longitude: '',
    latitude: ''
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [loggedIn, setLoggedIn] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const { setUser } = useContext(AuthContext)

  // Handles password visibility upon eye icon toggle
  const onPasswordVisibilityIconToggle = () => {
    passwordVisibilityIcon === 'eye-outline' ? setpasswordVisibilityIcon('eye-off-outline') : setpasswordVisibilityIcon('eye-outline')
    passwordVisibility === true ? setpasswordVisibility(false) : setpasswordVisibility(true)
  }

  // Handles confirmPassword visibility upon eye icon toggle
  const onConfirmPasswordVisibilityIconToggle = () => {
    confirmPasswordVisibilityIcon === 'eye-outline' ? setConfirmPasswordVisibilityIcon('eye-off-outline') : setConfirmPasswordVisibilityIcon('eye-outline')
    confirmPasswordVisibility === true ? setConfirmPasswordVisibility(false) : setConfirmPasswordVisibility(true)
  }

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
        <Text style={LoginScreenStyles.text_header}>Sign Up</Text>
      </View>
      <View style={LoginScreenStyles.footer}>
      <ScrollView style='flex;1'>

      <Text style={LoginScreenStyles.text_footer}>First Name</Text>        
        <View style={LoginScreenStyles.action}>
          <Icon name={'person-outline'} size={20} color='#05375a'/>
          <TextInput
            value={firstName}
            style={LoginScreenStyles.textInput}
            onChangeText={userFirstName => setFirstName(userFirstName)}
            numberOfLines={1}
            placeholder='First Name'
            placeholderTextColor='#bdbdbd'
            underlineColorAndroid="transparent"
            autoCapitalize='none'
            autoCorrect={false}
          />
          {firstName ?
          <Feather
            name='check-circle'
            size={20}
            color='green'
          />
          : null }
        </View>

        <Text style={{...LoginScreenStyles.text_footer, marginTop: 35}}>Last Name</Text>        
        <View style={LoginScreenStyles.action}>
          <Icon name={'person-outline'} size={20} color='#05375a'/>
          <TextInput
            value={lastName}
            style={LoginScreenStyles.textInput}
            onChangeText={userLastName => setLastName(userLastName)}
            numberOfLines={1}
            placeholder='Last Name'
            placeholderTextColor='#bdbdbd'
            underlineColorAndroid="transparent"
            autoCapitalize='none'
            autoCorrect={false}
          />
          {lastName ?
          <Feather
            name='check-circle'
            size={20}
            color='green'
          />
          : null }
        </View>

        <Text style={{...LoginScreenStyles.text_footer, marginTop: 35}}>Phone</Text>        
        <View style={LoginScreenStyles.action}>
          <Icon name={'call-outline'} size={20} color='#05375a'/>
          <TextInput
            value={phone}
            style={LoginScreenStyles.textInput}
            onChangeText={userPhone => setPhone(userPhone)}
            numberOfLines={1}
            placeholder='Phone'
            placeholderTextColor='#bdbdbd'
            underlineColorAndroid="transparent"
            autoCapitalize='none'
            autoCorrect={false}
          />
          {phone ?
          <Feather
            name='check-circle'
            size={20}
            color='green'
          />
          : null }
        </View>

        <Text style={{...LoginScreenStyles.text_footer, marginTop: 35}}>Address</Text>        
        <View style={LoginScreenStyles.action}>
          <Icon name={'location-outline'} size={20} color='#05375a'/>
          <TextInput
            value={address.text}
            style={LoginScreenStyles.textInput}
            onChangeText={userAddress => setAddress(userAddress)}
            numberOfLines={1}
            placeholder='Address'
            placeholderTextColor='#bdbdbd'
            underlineColorAndroid="transparent"
            autoCapitalize='none'
            autoCorrect={false}
          />
          {address.text ?
          <Feather
            name='check-circle'
            size={20}
            color='green'
          />
          : null }
        </View>

        <Text style={{...LoginScreenStyles.text_footer, marginTop: 35}}>Email</Text>        
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

        <Text style={{...LoginScreenStyles.text_footer, marginTop: 35}}>Confirm Password</Text>
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
            <Text style={{...LoginScreenStyles.textSign, color:'#17a672'}}>Sign Up</Text>
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
          <TouchableOpacity
            style={{...CommonScreenStyles.navButton, justifyContent: 'center', alignItems: 'center'}}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={{...LoginScreenStyles.text_footer, fontSize: 15}}>Already a user? </Text>
            <Text style={{...LoginScreenStyles.text_footer,  textDecorationLine:'underline', fontSize: 15}}>Sign In</Text>
          </TouchableOpacity>
          </ScrollView>

      </View>
  </View>
  );
}