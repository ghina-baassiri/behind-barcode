import React, { useEffect } from 'react'
import {
  Text,
  View,
  Easing,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { animate, animatedStyles } from '../utilities/Animation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    animate(Easing.ease)
  }, [])

  const onGetStartedPress = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animated.Image
          source={require('../../assets/logo-final.png')}
          style={(styles.logo, animatedStyles)}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>Grocery shop efficiently!</Text>
        <Text style={styles.text}>Sign in with account</Text>
        <View style={styles.button}>
          <TouchableOpacity activeOpacity={0.7} onPress={onGetStartedPress}>
            <LinearGradient
              colors={['#1eb980', '#2e8e6b', '#17a672']}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcons name='navigate-next' color='#fff' size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BBThemeColor,
  },
  header: {
    flex: 2.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 0.7,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 50,
  },
  logo: {
    width: width_logo,
    height: height_logo,
    resizeMode: 'contain',
  },
  title: {
    color: '#045d56',
    fontSize: 26,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
})
