import React from 'react'
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import { CommonScreenStyles } from '../utilities/Styles';

export default function ProductMarketsScreen({ navigation }) {
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={CommonScreenStyles.container}>
        <Text style={CommonScreenStyles.title}>Product Markets Screen</Text>
      </View>
    </SafeAreaView>
  );
}