import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {BottomTabStyles} from '../utilities/Styles';

export default function ChatTabBarButton({ children, onPress }) {
  return (
    <TouchableOpacity
        style={{
            top: -25,
            justifyContent: 'center',
            alignItems: 'center',
            ...BottomTabStyles.shadow
        }}
        onPress={onPress}
    >
        <View style={{
            width: 60,
            height: 60,
            borderRadius: 35,
            backgroundColor: '#1eb980',
            ...BottomTabStyles.shadow
        }}>
            {children}
        </View>
    </TouchableOpacity>
  );
}


