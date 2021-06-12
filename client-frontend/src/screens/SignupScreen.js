import React, { useState, useContext, useEffect } from 'react';
import { Text, View, TextInput, Image, Easing, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';

import { LoginScreenStyles } from '../utilities/Styles';
import { CommonScreenStyles } from '../utilities/Styles';
import * as Location from 'expo-location';

export default function LoginScreen({ navigation }) {

  const [passwordVisibilityIcon, setpasswordVisibilityIcon] = useState('eye-off-outline')
  const [passwordVisibility, setpasswordVisibility] = useState(true)
  const [confirmPasswordVisibilityIcon, setConfirmPasswordVisibilityIcon] = useState('eye-off-outline')
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')


  const [validationMsg, setValidationMsg] = useState({ 'email' :'', 'password': '', 'name': '', 'phone': '' })
  const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  const phoneNumberFormat = /^(961(3|70|71|80|81)|(03|70|71|80|81))\d{6}$/

  // Handle those changes and rerender upon change of user state
  useEffect(() => {
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setName('')
      setPhone('')
      setValidationMsg({ email:'', password: '', name: '', phone: '' })   
     
  }, [])
  
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
  const onSignUpPress = () => {
    const data = {
      email: email,
      password: password,
      name: name,
      phone: phone
    }
    axios.post(`http://192.168.43.152:8000/api/clientRegister`, data).then(response => {        
      console.log('SUCCESS: Recieved SignUp API Response: ', response.data)
      if(response.status === 200) {
        navigation.navigate('Login')      
      }
    }).catch(err => {
      console.log('The Registration API Error: ', err.response)
      if (err.response) {
        if(err.response.status === 422) {
          console.log('Register API Response Message: ', err.response.data.message)

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
            if(message.includes("phone")) {
              setPhone('')   
              setValidationMsg(prevState => ({
                ...prevState,
                phone: message
              }))
            } 
                            
          })                                      
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
        <Text style={LoginScreenStyles.text_header}>Let's join BB</Text>
      </View>
      <View style={{...LoginScreenStyles.footer}}>
      <ScrollView style={{paddingBottom: 5}}>
        <View style={{ marginBottom: 10 }}>
          <Text style={LoginScreenStyles.text_footer}>Name</Text>        
          <View style={LoginScreenStyles.action}>
            <Icon name={'person-outline'} size={20} color='#05375a'/>
            <TextInput
              value={name}
              style={LoginScreenStyles.textInput}
              onChangeText={userName => setName(userName)}
              numberOfLines={1}
              placeholder='Name'
              placeholderTextColor='#bdbdbd'
              underlineColorAndroid="transparent"
              autoCapitalize='none'
              autoCorrect={false}
            />
            {name ?
            <Feather
              name='check-circle'
              size={20}
              color='green'
            />
            : null
          }
          </View>
          { validationMsg.name ?
            <Text style={LoginScreenStyles.text_validation}>{validationMsg.name}</Text>
            : null
          }
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={LoginScreenStyles.text_footer}>Phone</Text>        
          <View style={LoginScreenStyles.action}>
            <Icon name={'call-outline'} size={20} color='#05375a'/>
            <TextInput
              value={phone}
              style={LoginScreenStyles.textInput}
              onChangeText={userPhone => setPhone(userPhone)}
              numberOfLines={1}
              placeholder='e.g. 71999999'
              placeholderTextColor='#bdbdbd'
              underlineColorAndroid="transparent"
              autoCapitalize='none'
              autoCorrect={false}
            />
            {phone && phone.match(phoneNumberFormat) ?
              <Feather
                name='check-circle'
                size={20}
                color='green'
              />
              : phone ?
              <Feather
                name='check-circle'
                size={20}
                color='#cf4332'
              />
            : null
           }
          </View>
          { validationMsg.phone ?
            <Text style={LoginScreenStyles.text_validation}>{validationMsg.phone}</Text>
            : null
          }
        </View>

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
            {email && email.match(emailFormat) ?
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
        </View>

        <View style={{ marginBottom: 10 }}>
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

        <View style={{ marginBottom: 10 }}>
        <Text style={{...LoginScreenStyles.text_footer, marginTop: 25}}>Confirm Password</Text>
          <View style={LoginScreenStyles.action}>
            <Icon name={'lock-closed-outline'} size={20} color='#05375a'/>
            <TextInput
              value={confirmPassword}
              style={LoginScreenStyles.textInput}
              numberOfLines={1}
              placeholder='Password'
              placeholderTextColor='#bdbdbd'
              underlineColorAndroid="transparent"
              onChangeText={userPassword => setConfirmPassword(userPassword)}
              secureTextEntry={confirmPasswordVisibility}
            />
            <Icon name={confirmPasswordVisibilityIcon} 
              size={20} 
              style={{opacity:0.6}}
              onPress={onConfirmPasswordVisibilityIconToggle}
            />
          </View>
          { validationMsg.password ?
            <Text style={LoginScreenStyles.text_validation}>{validationMsg.password}</Text>
            : null
          }
        </View>

        <View style={LoginScreenStyles.button}>
          <TouchableOpacity
            onPress={onSignUpPress}
            style={{...LoginScreenStyles.signIn, backgroundColor:'#17a672', marginTop: 15, marginBottom:15}}
          >
            <Text style={{...LoginScreenStyles.textSign, color:'#fff'}}>Sign Up</Text>
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
            <Text style={{...LoginScreenStyles.text_footer, fontSize: 15}}>Already a user? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={{...LoginScreenStyles.text_footer,  textDecorationLine:'underline', fontSize: 15}}>Sign In</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
      </View>
  </View>
  );
}