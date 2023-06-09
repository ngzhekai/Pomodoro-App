import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Switch } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import Layout from '../components/Layout';

const Focus30Cycle = () => {
    const [is30Min, setIs30Min] = useState(true);

    let breakTimer = null;
    const [isActive, setIsActive] = useState(false);
    const [timerCount, setTimer] = useState(breakTimer);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    // const navigation = useNavigation();

    useEffect(() => {
        let interval = null;

        if (is30Min) {
            breakTimer = isEnabled ? 5 : 10;
            setTimer(isEnabled ? 5 : 10);
        } else {
            breakTimer = isEnabled ? 900 : 2700;
            setTimer(isEnabled ? 900 : 2700);
        }

        if (isActive) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === 0) {
                        clearInterval(interval);
                        setIsActive(false);
                        notifyAlert();
                        setIsEnabled(!isEnabled);
                        return breakTimer;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }

        // to pause the timer from counting down
        return () => clearInterval(interval);
        }, [isActive, isEnabled]);

    const handleStartPause = () => {
        setIsActive(!isActive);
    };

    const notifyAlert = () => {
        Alert.alert('Pomodoro Times Up!', isEnabled ? 'Let\'s get into some work!' : 'Take a 5-minutes break', 
            {
                text: 'OK',
                onPress: () => console.log('OK Pressed')
            }
        );
    };
    return (
        <Layout toggleSwitch={toggleSwitch} isEnabled={isEnabled} isActive={isActive} timerCount={timerCount} handleStartPause={handleStartPause}/>
    );

}

export default Focus30Cycle
