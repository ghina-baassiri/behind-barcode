import React from 'react';
import { TextInput } from 'react-native';
import { FormInputStyles } from '../utilities/Styles';

export default function FormInput({ labelValue, placeholderText }) {

  return (
    <TextInput
      value={labelValue}
      style={FormInputStyles.input}
      numberOfLines={1}
      placeholder={placeholderText}
      placeholderTextColor='#666'
      underlineColorAndroid="transparent"
    />
  );
}
