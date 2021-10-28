import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';

import { RoundButton } from '../../components/RoundButton';
import { fontSize, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

export const FocusInput = ({ addSubject }) => {
  const [subject, setSubject] = useState('');

  const onChangeHandler = (value) => {
    setSubject(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What would you like to focus on?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter item you want to focus on"
          onChangeText={onChangeHandler}
          value={subject}
        />
        <RoundButton
          size={50}
          title="+"
          onPress={() => {
            if(subject != '') {
              addSubject(subject);
            }
            Keyboard.dismiss();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center',
    padding: spacing.md
  },
  title: {
    fontSize: fontSize.lg,
    color: colors.white,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  input: {
    flex: 1,
    marginEnd: spacing.sm,
  },
});
