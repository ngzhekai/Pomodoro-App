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
        backgroundColor: 'black',
        borderRadius: 45,
        height: 180,
        width: 250,
        marginBottom: 20,
    },
    timerText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 75,
    },
};

export default Timer;

