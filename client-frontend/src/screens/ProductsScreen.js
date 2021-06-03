import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { CommonScreenStyles } from '../utilities/Styles';

export default function ProductsScreen({ navigation }) {
  return (
      <View style={CommonScreenStyles.container}>
        <Text style={CommonScreenStyles.title}>Products Screen</Text>
        <TouchableOpacity
          style={CommonScreenStyles.navButton}
          onPress={() => navigation.navigate('ProductMarkets')}
        >
          <Text style={CommonScreenStyles.navText}>Go to Product Markets Screen</Text>
        </TouchableOpacity>
      </View>
  );
}