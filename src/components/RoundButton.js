import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const RoundButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles(size).container, style]}>
      <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    container: {
      color: 'white',
      width: size,
      height: size,
      borderRadius: size / 2,
      borderColor: 'white',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: size / 3,
      color: 'white',
    },
  });
