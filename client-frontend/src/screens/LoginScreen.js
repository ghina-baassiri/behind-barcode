import React, { useState, useContext, useEffect } from 'react'
import { Text, View, TextInput, TouchableOpacity, Animated } from 'react-native'
import { AuthContext } from '../navigation/AuthProvider'
import { ActivityIndicator } from 'react-native-paper'
import { BBThemeColor } from '../utilities/Colors'
import { BBLightGreyColor } from '../utilities/Colors'
import { BBRedColor } from '../utilities/Colors'
import Icon from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios'

export default function LoginScreen({ navigation }) {
  const [passwordVisibilityIcon, setpasswordVisibilityIcon] =
    useState('eye-off-outline')
  const [passwordVisibility, setpasswordVisibility] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const { user, setUser, setToken } = useContext(AuthContext)
  const [validationMsg, setValidationMsg] = useState({
    email: '',
    password: '',
  })
  const emailformat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  // Handle password visibility upon eye icon toggle
  const onPasswordVisibilityIconToggle = () => {
    passwordVisibilityIcon === 'eye-outline'
      ? setpasswordVisibilityIcon('eye-off-outline')
      : setpasswordVisibilityIcon('eye-outline')
    passwordVisibility === true
      ? setpasswordVisibility(false)
      : setpasswordVisibility(true)
  }

  useEffect(() => {
    setEmail('')
    setPassword('')
    setValidationMsg({ email: '', password: '' })
    if (user._id) navigation.navigate('HomeTab')
  }, [user])

  const onLoginPress = () => {
    const data = {
      email: email,
      password: password,
    }
    setValidationMsg({ email: '', password: '' })
    axios
      .post(`http://192.168.43.152:8000/api/login`, data)
      .then((response) => {
        if (response.status === 200) {
          setUser({
            name: response.data.client.user.name,
            _id: response.data.client.user.id,
            avatar: response.data.client.avatar,
          })
          setToken(response.data.token)
          setLoggedIn(true)
          setIsLoading(false)
          navigation.navigate('HomeTab')
        }
      })
      .catch((err) => {
        console.log('The Error: ', err.response)
        if (err.response) {
          if (err.response.status === 422) {
            console.log(
              'Login API Response Message: ',
              err.response.data.message
            )

            err.response.data.message.map((message) => {
              if (message.includes('email')) {
                setValidationMsg((prevState) => ({
                  ...prevState,
                  email: message,
                }))
              }
              if (message.includes('password')) {
                setPassword('')
                setValidationMsg((prevState) => ({
                  ...prevState,
                  password: message,
                }))
              }
            })
          } else if (err.response.status === 401) {
            alert('Invalid email or password')
            setEmail('')
            setPassword('')
          } else {
            console.log('Catch Another Error: ', err)
          }
        }
      })
  }

  return (
    <>
      {isLoading && (
        <ActivityIndicator
          size='large'
          color={BBThemeColor}
          animating={true}
          style={{
            opacity: 1,
            position: 'absolute',
            right: 0,
            left: 0,
            top: 0,
            bottom: 0,
          }}
        />
      )}

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>Welcome to BB</Text>
        </View>
        <Animated.View style={styles.footer}>
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
              {email && email.match(emailformat) ? (
                <Feather name='check-circle' size={20} color='green' />
              ) : email ? (
                <Feather name='x-circle' size={20} color={BBRedColor} />
              ) : null}
            </View>
            {validationMsg.email ? (
              <Text style={styles.text_validation}>{validationMsg.email}</Text>
            ) : null}

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
          <View style={styles.button}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setIsLoading(true)
                onLoginPress()
              }}
              style={{
                ...styles.signIn,
                backgroundColor: BBThemeColor,
                marginTop: 15,
              }}
            >
              <Text style={{ ...styles.textSign, color: '#fff' }}>Sign In</Text>
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
          <View
            style={{
              ...styles.navBtn,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ ...styles.text_footer, fontSize: 15 }}>
              New user?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text
                style={{
                  ...styles.text_footer,
                  textDecorationLine: 'underline',
                  fontSize: 15,
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </>
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
  signIn: {
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
  navBtn: {
    marginTop: 10,
    flexDirection: 'row',
  },
  navBtnText: {
    fontSize: 20,
    color: '#045d56',
  },
  navText: {
    fontSize: 20,
    color: '#000',
  },
})
