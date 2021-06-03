import React, { useEffect } from 'react';
import { Text, View, Easing, TouchableOpacity, Animated } from 'react-native';
import { SplashScreenStyles } from '../utilities/Styles';
import { LinearGradient } from 'expo-linear-gradient';
import { animate, animatedStyles } from '../utilities/Animation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function SplashScreen({ navigation }) {

    // onMount
    useEffect(() => {   
        animate(Easing.ease)    
    }, [])
      
    // On get started press function
    const onGetStartedPress = () => {
        navigation.navigate('Login')
    }
      
    return (
        <View style={SplashScreenStyles.container}>
            <View style={SplashScreenStyles.header}>
                <Animated.Image
                    source={require('../../assets/logo-final.png')}
                    style={SplashScreenStyles.logo, animatedStyles}
                />
            </View>
            <View style={SplashScreenStyles.footer}>
                <Text style={SplashScreenStyles.title}>Grocery shop efficiently!</Text>
                <Text style={SplashScreenStyles.text}>Sign in with account</Text>
                <View style={SplashScreenStyles.button}>
                    <TouchableOpacity onPress={onGetStartedPress} >
                        <LinearGradient
                            colors={['#1eb980', '#2e8e6b', '#17a672']}
                            style={SplashScreenStyles.signIn}
                        >
                            <Text style={SplashScreenStyles.textSign}>Get Started</Text>
                            <MaterialIcons
                                name='navigate-next'
                                color='#fff'
                                size={20}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


