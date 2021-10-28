import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors } from '../utils/colors';
import { spacing, fontSize } from '../utils/sizes';
import { RoundButton } from './RoundButton';

export const Timing = ({changeTime}) => {
  return (
    <View style={styles.buttonWrap}>
        <RoundButton title="10" size={60} onPress={() => changeTime([10])}/>
        <RoundButton title="15" size={60} onPress={() => changeTime([15])}/>
        <RoundButton title="20" size={60} onPress={() => changeTime([20])}/>
      </View>
  );
};

const styles = StyleSheet.create({
  buttonWrap: {
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});