import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors } from '../utils/colors';
import { spacing, fontSize } from '../utils/sizes';

const minutesToMilliSec = (minutes) => {
  return minutes * 60 * 1000;
};

export const CountDown = ({ minutes, isPause, onProgress, onEnd }) => {
  const [milliSec, setMilliSec] = useState(minutesToMilliSec(minutes));
  const interval = useRef(null);

  const countDown = () => {
    setMilliSec((time) => {
      if (time === 0) {
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    if (isPause) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPause]);

  const minute = Math.floor(milliSec / 1000 / 60) % 60;
  const second = Math.floor(milliSec / 1000) % 60;

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  useEffect(() => {
    setMilliSec(minutesToMilliSec(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(milliSec / minutesToMilliSec(minutes));
    if (milliSec === 0) {
      onEnd();
    }
  }, [milliSec]);

  return (
    <Text style={styles.countDownText}>
      {formatTime(minute)}:{formatTime(second)}
    </Text>
  );
};

const styles = StyleSheet.create({
  countDownText: {
    backgroundColor: 'rgba(94,132,226,0.3)',
    padding: spacing.lg,
    fontSize: fontSize.xxxl,
    fontWeight: 'bold',
    color: colors.white,
  },
});
