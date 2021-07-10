import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios'
import { BBThemeColor } from '../utilities/Colors'
import { BBLightGreyColor } from '../utilities/Colors'
import { windowHeight, windowWidth } from '../utilities/Dimensions'
import SuccessModal from '../components/SuccessModal'

export default function SignupScreen({ navigation }) {
  const [passwordVisibilityIcon, setpasswordVisibilityIcon] =
    useState('eye-off-outline')
  const [passwordVisibility, setpasswordVisibility] = useState(true)
  const [confirmPasswordVisibilityIcon, setConfirmPasswordVisibilityIcon] =
    useState('eye-off-outline')
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(true)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [success, setSuccess] = useState(false)

  const [validationMsg, setValidationMsg] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
  })
  const emailFormat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  const phoneNumberFormat = /^(961(3|70|71|80|81)|(03|70|71|80|81))\d{6}$/

  // Handle those changes and rerender upon change of user state
  useEffect(() => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setName('')
    setPhone('')
    setValidationMsg({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: '',
    })
  }, [])

  // Handles password visibility upon eye icon toggle
  const onPasswordVisibilityIconToggle = () => {
    passwordVisibilityIcon === 'eye-outline'
      ? setpasswordVisibilityIcon('eye-off-outline')
      : setpasswordVisibilityIcon('eye-outline')
    passwordVisibility === true
      ? setpasswordVisibility(false)
      : setpasswordVisibility(true)
  }

  // Handles confirmPassword visibility upon eye icon toggle
  const onConfirmPasswordVisibilityIconToggle = () => {
    confirmPasswordVisibilityIcon === 'eye-outline'
      ? setConfirmPasswordVisibilityIcon('eye-off-outline')
      : setConfirmPasswordVisibilityIcon('eye-outline')
    confirmPasswordVisibility === true
      ? setConfirmPasswordVisibility(false)
      : setConfirmPasswordVisibility(true)
  }

  // Called on Login button press: sends axios login api request
  const onSignUpPress = () => {
    const data = {
      email: email,
      password: password,
      name: name,
      phone: phone,
    }
    axios
      .post(`http://192.168.43.152:8000/api/clientRegister`, data)
      .then((response) => {
        console.log('SUCCESS: Recieved SignUp API Response: ', response.data)
        if (response.status === 200) {
          if (confirmPassword && !validationMsg.confirmPassword) {
            console.log('SUCCESS')
            setSuccess(true)
          }
        }
      })
      .catch((err) => {
        console.log('The Registration API Error: ', err.response)
        if (err.response) {
          if (err.response.status === 422) {
            console.log(
              'Register API Response Message: ',
              err.response.data.message
            )

            err.response.data.message.map((message) => {
              if (message.includes('name')) {
                setValidationMsg((prevState) => ({
                  ...prevState,
                  name: message,
                }))
              }
              if (message.includes('email')) {
                setValidationMsg((prevState) => ({
                  ...prevState,
                  email: message,
                }))
              }
              if (message.includes('password')) {
                setPassword('')
                setConfirmPassword('')
                setValidationMsg((prevState) => ({
                  ...prevState,
                  password: message,
                }))
              }
              if (message.includes('phone')) {
                setPhone('')
                setValidationMsg((prevState) => ({
                  ...prevState,
                  phone: message,
                }))
              }
            })
          } else {
            console.log('Catch Another Error: ', err)
          }
        }
      })
  }

  useEffect(() => {
    if (confirmPassword && password && confirmPassword != password) {
      setValidationMsg((prevState) => ({
        ...prevState,
        confirmPassword: "Passwords don't match",
      }))
    } else if (confirmPassword && password && confirmPassword == password) {
      setValidationMsg((prevState) => ({
        ...prevState,
        confirmPassword: '',
      }))
    }
  }, [confirmPassword])

  useEffect(() => {
    if (validationMsg.password && password.length > 5) {
      setValidationMsg((prevState) => ({
        ...prevState,
        password: '',
      }))
    }
  }, [password])

  useEffect(() => {
    if (validationMsg.email && email.match(emailFormat)) {
      setValidationMsg((prevState) => ({
        ...prevState,
        email: '',
      }))
    }
  }, [email])

  useEffect(() => {
    if (validationMsg.phone && phone.match(phoneNumberFormat)) {
      setValidationMsg((prevState) => ({
        ...prevState,
        phone: '',
      }))
    }
  }, [phone])

  useEffect(() => {
    if (validationMsg.name && name) {
      setValidationMsg((prevState) => ({
        ...prevState,
        name: '',
      }))
    }
  }, [name])

  return (
    <View style={{ backgroundColor: BBThemeColor }}>
      {success ? <SuccessModal navigation={navigation} /> : null}
      <View style={styles.header}>
        <Text style={styles.text_header}>Let's join BB</Text>
      </View>
      <View style={styles.footer}>
        <ScrollView
          style={{ paddingBottom: 5 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.text_footer}>Name</Text>
            <View style={styles.action}>
              <Icon name={'person-outline'} size={20} color='#05375a' />
              <TextInput
                value={name}
                style={styles.textInput}
                onChangeText={(userName) => setName(userName)}
                numberOfLines={1}
                placeholder='Name'
                placeholderTextColor={BBLightGreyColor}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
                autoCorrect={false}
              />
              {name ? (
                <Feather name='check-circle' size={20} color='green' />
              ) : null}
            </View>
            {validationMsg.name ? (
              <Text style={styles.text_validation}>{validationMsg.name}</Text>
            ) : null}
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={styles.text_footer}>Phone</Text>
            <View style={styles.action}>
              <Icon name={'call-outline'} size={20} color='#05375a' />
              <TextInput
                value={phone}
                style={styles.textInput}
                onChangeText={(userPhone) => setPhone(userPhone)}
                numberOfLines={1}
                placeholder='e.g. 71999999'
                placeholderTextColor={BBLightGreyColor}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
                autoCorrect={false}
              />
              {phone && phone.match(phoneNumberFormat) ? (
                <Feather name='check-circle' size={20} color='green' />
              ) : phone ? (
                <Feather name='x-circle' size={20} color='#cf4332' />
              ) : null}
            </View>
            {validationMsg.phone ? (
              <Text style={styles.text_validation}>{validationMsg.phone}</Text>
            ) : null}
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
              <Icon name={'mail-outline'} size={20} color='#05375a' />
              <TextInput
                value={email}
                style={styles.textInput}
                onChangeText={(userEmail) => setEmail(userEmail)}
                numberOfLines={1}
                placeholder='Email'
                placeholderTextColor={BBLightGreyColor}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
                keyboardType='email-address'
                autoCorrect={false}
              />
              {email && email.match(emailFormat) ? (
                <Feather name='check-circle' size={20} color='green' />
              ) : email ? (
                <Feather name='check-circle' size={20} color='#cf4332' />
              ) : null}
            </View>
            {validationMsg.email ? (
              <Text style={styles.text_validation}>{validationMsg.email}</Text>
            ) : null}
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ ...styles.text_footer, marginTop: 25 }}>
              Password
            </Text>
            <View style={styles.action}>
              <Icon name={'lock-closed-outline'} size={20} color='#05375a' />
              <TextInput
                value={password}
                style={styles.textInput}
                numberOfLines={1}
                placeholder='Password'
                placeholderTextColor={BBLightGreyColor}
                underlineColorAndroid='transparent'
                onChangeText={(userPassword) => setPassword(userPassword)}
                secureTextEntry={passwordVisibility}
              />
              <Icon
                name={passwordVisibilityIcon}
                size={20}
                style={{ opacity: 0.6 }}
                onPress={onPasswordVisibilityIconToggle}
              />
            </View>
            {validationMsg.password ? (
              <Text style={styles.text_validation}>
                {validationMsg.password}
              </Text>
            ) : null}
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ ...styles.text_footer, marginTop: 25 }}>
              Confirm Password
            </Text>
            <View style={styles.action}>
              <Icon name={'lock-closed-outline'} size={20} color='#05375a' />
              <TextInput
                value={confirmPassword}
                style={styles.textInput}
                numberOfLines={1}
                placeholder='Password'
                placeholderTextColor={BBLightGreyColor}
                underlineColorAndroid='transparent'
                onChangeText={(userPassword) =>
                  setConfirmPassword(userPassword)
                }
                secureTextEntry={confirmPasswordVisibility}
              />
              <Icon
                name={confirmPasswordVisibilityIcon}
                size={20}
                style={{ opacity: 0.6 }}
                onPress={onConfirmPasswordVisibilityIconToggle}
              />
            </View>

            {validationMsg.confirmPassword ? (
              <Text style={styles.text_validation}>
                {validationMsg.confirmPassword}
              </Text>
            ) : null}
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onSignUpPress}
              style={{
                ...styles.signUp,
                backgroundColor: '#17a672',
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              <Text style={{ ...styles.btnText, color: '#fff' }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomColor: BBLightGreyColor,
              borderBottomWidth: 1,
              width: 150,
              alignSelf: 'center',
            }}
          />
          <View style={styles.container}>
            <Text style={styles.text_footer}>Already a user? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  ...styles.text_footer,
                  textDecorationLine: 'underline',
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth,
    height: windowHeight,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: '#05375a',
    fontSize: 16,
  },
  text_validation: {
    color: '#cf4332',
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    alignItems: 'center',
    marginTop: 10,
  },
  signUp: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
