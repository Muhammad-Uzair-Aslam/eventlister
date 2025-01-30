import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DividerComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20, 
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%', 
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#000000', 
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
});

export default DividerComponent;
 