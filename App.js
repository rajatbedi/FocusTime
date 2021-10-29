import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FocusInput } from './src/features/focus/FocusInput';
import { FocusedSubjects } from './src/features/focus/FocusedSubjects';
import { Timer } from './src/features/timer/Timer';

import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';

const SUBJECTSTAT = {
  completed: 1,
  canceled: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusSubjectHistory, setFocusSubjectHistory] = useState([]);

  const addFocusSubjectHistoryWithStatus = (subject, status) => {
    setFocusSubjectHistory([...focusSubjectHistory, {key: focusSubjectHistory.length + 1, subject, status }]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem(
        'FocusHistory',
        JSON.stringify(focusSubjectHistory)
      );
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('FocusHistory');
      if (history && JSON.parse(history).length) {
        setFocusSubjectHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusSubjectHistory]);

  return (
    <SafeAreaView style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusSubjectHistoryWithStatus(
              focusSubject,
              SUBJECTSTAT.completed
            );
            setFocusSubject(null);
          }}
          onCancel={() => {
            addFocusSubjectHistoryWithStatus(
              focusSubject,
              SUBJECTSTAT.canceled
            );
            setFocusSubject(null);
          }}
        />
      ) : (
        <>
          <FocusInput addSubject={setFocusSubject} />
          <FocusedSubjects subjectsHistory={focusSubjectHistory} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
  },
});
