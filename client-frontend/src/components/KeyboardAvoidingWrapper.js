import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import {KeyboardAvoidingView, ScrollView, touchableWithoutfeedback, Keyboard} from 'react-native';

export default function KeyboardAvoidingWrapper({children}) {
  return (
    <KeyboardAvoidingView style={{flex:1}}>
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {children}
            </TouchableWithoutFeedback>
        </ScrollView>
    </KeyboardAvoidingView>
  );
}
