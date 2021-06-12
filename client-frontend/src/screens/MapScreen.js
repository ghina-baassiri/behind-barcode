import React from 'react';
import { View } from 'react-native';
import Map from '../components/Map';
import MapView from 'react-native-maps';
import { MapStyles } from '../utilities/Styles';


import { CommonScreenStyles } from '../utilities/Styles';

export default function MapScreen({navigation}) {
  return (
    <View style={CommonScreenStyles.container}>
        <Map/>
    </View >
  );
}
