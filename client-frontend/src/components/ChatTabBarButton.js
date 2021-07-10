import React from 'react'
import { View, TouchableOpacity } from 'react-native'

export default function ChatTabBarButton({ children, onPress }) {
  return (
    <TouchableOpacity
      style={{
        top: -3,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 35,
          backgroundColor: '#1eb980',
          elevation: 3,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  )
}
