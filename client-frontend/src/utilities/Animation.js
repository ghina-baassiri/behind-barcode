import { Animated, StyleSheet } from 'react-native'
import { windowHeight } from '../utilities/Dimensions'

const opacity = new Animated.Value(0)
const y = new Animated.Value(0)

// Easing animation function
export const animate = (easing) => {
  opacity.setValue(0)
  Animated.timing(opacity, {
    toValue: 1,
    duration: 1200,
    useNativeDriver: false,
    easing,
  }).start()
}

const size = opacity.interpolate({
  inputRange: [0, 1],
  outputRange: [0, windowHeight * 0.25],
})

const styles = StyleSheet.create({
  box: {},
})

export const animatedStyles = [
  styles.box,
  {
    opacity,
    width: size,
    height: size,
    resizeMode: 'contain',
  },
]
