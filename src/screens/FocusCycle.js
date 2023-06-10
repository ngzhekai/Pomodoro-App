import React, { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import Layout from '../components/Layout';
import Timer from '../components/Timer';
import ToggleButton from '../components/ToggleButton';
import TimerButton from '../components/TimerButton';
import { Audio } from 'expo-av';

const FocusCycle = ({ is30Min }) => {
    const [isActive, setIsActive] = useState(false);
    const [timerCount, setTimerCount] = useState(is30Min ? 10 : 2700);
    const [isEnabled, setIsEnabled] = useState(false);
    const [sound, setSound] = useState(null);
    const pausedTimerCountRef = useRef(null);

    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    
    useEffect(() => {
        const breakTimer = isEnabled ? (is30Min ? 5 : 900) : is30Min ? 10 : 2700;

        if (pausedTimerCountRef.current !== null) {
            setTimerCount(pausedTimerCountRef.current);
        } else {
            setTimerCount(breakTimer);
        }

        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setTimerCount((prevTimer) => {
                    if (prevTimer === 0) {
                        clearInterval(interval);
                        setIsActive(false);
                        notifyAlert();
                        setIsEnabled((previousState) => !previousState);
                        return breakTimer;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }

        // to pause the timer from counting down
        return () => {
            clearInterval(interval);
        };
    }, [isActive, isEnabled, is30Min]);

    const handleStartPause = () => {
        setIsActive((previousState) => !previousState);
        if (!isActive) {
            pausedTimerCountRef.current = timerCount;
        }
    };

    const handleReset = () => {
        setIsActive(false);
        setTimerCount(is30Min ? 10 : 2700);
        pausedTimerCountRef.current = null;
    };

    const notifyAlert = async () => {
        if (sound) {
            sound.unloadAsync();
        }

        const { sound } = await Audio.Sound.createAsync(
            require('../assets/clock-alarm.mp3')
        );
        setSound(sound);
        await sound.playAsync();

        Alert.alert(
            'Pomodoro Times Up!',
            isEnabled
            ? "Let's get into some work!"
            : `Take ${is30Min ? 'a 5-minute' : 'a 15-minute'} break`,
            {
                text: 'OK',
                onPress: () => {
                    console.log('OK Pressed');
                    if (sound) {
                        // stop the sound when the user dismiss the alert
                        sound.stopAsync();
                    }
                }
            }
        );
    };

    return (
        <Layout>
        <ToggleButton isEnabled={isEnabled} toggleSwitch={toggleSwitch} isActive={isActive} />
        <Timer timerCount={timerCount} />
        <TimerButton isActive={isActive} handleStartPause={handleStartPause} handleReset={handleReset} />
        </Layout>
    );
};

export default FocusCycle;

