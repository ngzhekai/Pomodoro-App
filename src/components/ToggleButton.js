import React from 'react';
import { Switch, View, Text, StyleSheet } from 'react-native';

const ToggleButton = ({ isEnabled, toggleSwitch, isActive }) => {
    const {
        toggleWrapper,
        toggleText,
    } = styles;

    return (
        <View style={toggleWrapper}>
        <Text style={toggleText}>PomoBreak</Text>
        <Switch
        trackColor={{ false: '#767577', true: '#5BC236' }}
        thumbColor={'#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        disabled={isActive}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    toggleWrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
        paddingBottom: 50,
    },
    toggleText: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingBottom: 10,
        color: '#2C2C2E',
    },
});

export default ToggleButton;

