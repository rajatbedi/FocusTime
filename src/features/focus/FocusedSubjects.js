import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';

import { colors } from '../../utils/colors';
import { fontSize } from '../../utils/sizes';

export const FocusedSubjects = ({ subjectsHistory }) => {
const historyList = ({item, index}) => {
  return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};

  return (
    <View style={styles.container}>
      {!!subjectsHistory.length && (
        <>
          <Text style={styles.titleText}>Items you focused on:</Text>
          <FlatList
            style={{flex:1 }}
            data={subjectsHistory}
            keyExtractor={item => item.key.toString()}
            renderItem={historyList}
            contentContainerStyle={{flex:1,alignItems: 'center' }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: fontSize.lg,
  },
  historyItem: (status) => ({
    fontSize: fontSize.md,
    color: status > 1 ? 'red' : 'green'
  })
});
