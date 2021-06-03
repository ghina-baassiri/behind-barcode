import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FormButtonStyles } from '../utilities/Styles';

export default function FormButton({ buttonTitle, ...rest }) {
    return (
      <TouchableOpacity style={FormButtonStyles.buttonContainer} {...rest}>
        <Text style={FormButtonStyles.buttonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    );
  }