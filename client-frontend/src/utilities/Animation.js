import { Animated } from 'react-native';
import { SplashScreenStyles } from '../utilities/Styles';
import { windowHeight } from '../utilities/Dimensions';

const opacity = new Animated.Value(0)
const y = new Animated.Value(0)
const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], { useNativeDriver: true })

// Easing animation function
export const animate = easing => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false,
      easing
    }).start();
};

const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, windowHeight * 0.25],
});

export const animatedStyles = [
    SplashScreenStyles.box,
    {
      opacity,
      width: size,
      height: size,
      resizeMode:'contain'
    },
];