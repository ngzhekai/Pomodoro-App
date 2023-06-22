import React from 'react';
import { View, Text } from 'react-native';
import TimeFormatter from '../components/TimeFormatter';

const Timer = ({ timerCount }) => {
    const {
        timerWrapper,
        timerText,
    } = styles;

    return (
        <View style={timerWrapper}>
        <Text style={timerText}>{TimeFormatter(timerCount)}</Text>
        </View>
    );
};

const styles = {
    timerWrapper: {
        backgroundColor: '#2C2C2E',
        borderRadius: 100,
        height: 200,
        width: 200,
        marginBottom: 20,
    },
    timerText: {
        color: 'white',
        color: '#F2F2F7',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 80,
    },
};

export default Timer;

