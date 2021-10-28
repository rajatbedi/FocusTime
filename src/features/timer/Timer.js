import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Vibration,
  Platform,
  Alert,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { colors } from '../../utils/colors';
import { spacing, fontSize } from '../../utils/sizes';

import { CountDown } from '../../components/CountDown';
import { RoundButton } from '../../components/RoundButton';
import { Timing } from '../../components/Timing';
import { useKeepAwake } from 'expo-keep-awake';

const DEFAULT_TIME = [0.1];
const DEFAULT_PROGRESS = 1;
const DEFAULT_STARTED_STATE = false;

export const Timer = ({ focusSubject, onTimerEnd, onCancel }) => {
  useKeepAwake();
  const interval = useRef(null);
  const [isStarted, setIsStarted] = useState(DEFAULT_STARTED_STATE);
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);

  const progressHandler = (progress) => {
    setProgress(progress);
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(DEFAULT_PROGRESS);
    setIsStarted(DEFAULT_STARTED_STATE);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate, 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const onEnd = () => {
    vibrate();
    alert();
    setMinutes(...minutes);
    setProgress(DEFAULT_PROGRESS);
    setIsStarted(DEFAULT_STARTED_STATE);
  };

  const alert = () => {
    Alert.alert(
      `Complete Focusing`,
      `You spend ${minutes} minutes on "${focusSubject}"`,
      [
        {
          text: 'Ok',
          onPress: () => {
            onTimerEnd();
            Vibration.cancel();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.countDownContainer}>
        <CountDown
          isPause={!isStarted}
          onProgress={progressHandler}
          minutes={minutes}
          onEnd={onEnd}
        />
      </View>
      <View style={{ marginTop: spacing.xl }}>
        <Text style={styles.focusText}>Focusing on:</Text>
        <Text style={styles.focusTitle}>{focusSubject}</Text>
      </View>

      <View style={{ marginTop: spacing.md }}>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 5 }}
        />
      </View>

      <Timing changeTime={changeTime} />

      <View style={styles.buttonWrap}>
        {isStarted ? (
          <RoundButton title="Pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundButton title="Start" onPress={() => setIsStarted(true)} />
        )}
        <View style={{ padding: spacing.md }}>
          <RoundButton
            title="Cancel"
            size={60}
            textStyle={{ fontSize: 15 }}
            onPress={() => onCancel()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  focusText: {
    color: colors.white,
    fontSize: fontSize.md,
    textAlign: 'center',
  },
  focusTitle: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countDownContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrap: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
});
