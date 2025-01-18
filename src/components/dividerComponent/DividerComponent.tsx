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
    marginVertical: 20, // Add spacing if needed
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%', // Adjust width as needed
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#000000', // Line color
  },
  orText: {
    marginHorizontal: 10, // Spacing around "or"
    fontSize: 14,
    fontWeight: '500',
    color: '#000', // Text color
  },
});

export default DividerComponent;
 