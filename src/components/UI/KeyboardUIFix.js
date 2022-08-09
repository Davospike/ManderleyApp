import React, {useEffect, useState} from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from "react-native";

/**
 * Displays opacity depending on whether the keyboard is visible or not. This can be used to correct
 * for the displayed keyboard without having to support flexbox, in which case KeyboardAvoidingView
 * could be used instead.
 */
export default function KeyboardUIFix(){

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  function _keyboardDidShow(){
    setIsKeyboardVisible(true);
  }

  function _keyboardDidHide(){
    setIsKeyboardVisible(false);
  }

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  return (
    <TouchableWithoutFeedback>
      <View style={{backgroundColor: 'red', width: '100%', height: isKeyboardVisible ? 300 : 0}}/>
    </TouchableWithoutFeedback>
  );
}