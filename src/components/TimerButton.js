import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const TimerButton = ({ isActive, handleStartPause }) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles.buttonType1]}
      onPress={handleStartPause}
    >
      <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    paddingVertical: 10,
    marginHorizontal: 80,
    marginVertical: 10,
    elevation: 8,
    borderRadius: 5,
  },
  buttonType1: {
    backgroundColor: '#8B1874',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TimerButton;

