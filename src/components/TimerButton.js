import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

const TimerButton = ({ isActive, handleStartPause, handleReset }) => {
    const {
        container,
        button,
        buttonType1,
        buttonText,
    } = styles;

    return (
        <View style={container}>
        <TouchableOpacity
        style={[button, buttonType1]}
        onPress={handleStartPause}
        >
        <Text style={buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={[button, buttonType1]}
        onPress={handleReset}
        >
        <Text style={buttonText}>Reset</Text>
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 105,
        paddingVertical: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        elevation: 8,
        borderRadius: 12,
    },
    buttonType1: {
        //backgroundColor: '#8B1874',
        backgroundColor: '#E5E5EA',
    },
    buttonText: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: 'normal',
    },
});

export default TimerButton;
