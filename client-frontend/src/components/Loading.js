import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { LoadingComponentStyles } from '../utilities/Styles';

export default function Loading() {

  return (
    <View style={LoadingComponentStyles.container}>
      <ActivityIndicator size='large' color='#6646ee' />
    </View>
  );
}
