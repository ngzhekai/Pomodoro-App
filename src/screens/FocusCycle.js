import React, { useState, useEffect, useRef, useContext } from 'react';
import { Alert } from 'react-native';
import LogContext from '../contexts/LogContext';
import Layout from '../components/Layout';
import Timer from '../components/Timer';
import ToggleButton from '../components/ToggleButton';
import TimerButton from '../components/TimerButton';
import { Audio } from 'expo-av';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('historyLog.db');

db.transaction((tx) => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, event TEXT, datetime DATETIME, timerType INTEGER, isCompleted INTEGER)' 
        //'DROP TABLE IF EXISTS logs' // for dropping database
    );
});

const FocusCycle = ({ is30Min }) => {
    
    const { setIsRunning } = useContext(LogContext);
    const { setLogs } = useContext(LogContext);
    const { setPomoCompletedCount } = useContext(LogContext);
    const [isActive, setIsActive] = useState(false);
    const [timerCount, setTimerCount] = useState(null);
    const [isEnabled, setIsEnabled] = useState(false);
    const [sound, setSound] = useState(null);
    const pausedTimerCountRef = useRef(null);
    //const breakTimer = isEnabled ? (is30Min ? 300 : 900) : is30Min ? 1500 : 2700;
    const breakTimer = isEnabled ? (is30Min ? 2 : 3) : is30Min ? 4 : 5; //for debug ya

    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    const insertLog = (message, isCompleted, timerType) => {
        const datetime = new Date().toISOString();

        db.transaction((tx) => {
            tx.executeSql('INSERT INTO logs (event, datetime, isCompleted, timerType) VALUES (?, ?, ?, ?)', [message, datetime, isCompleted, timerType],
                (_, { insertId }) => {
                    // insertion successful, fetch logs again to update the state
                    console.log('log inserted successfully: ', insertId);
                    fetchLogs();
                } 
            );
        });
    };


    const fetchLogs = () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM logs ORDER BY id DESC;', [], (_, { rows }) => {
                const logsData = rows._array;
                setLogs(logsData); // update logs in the context
            });
            db.transaction((tx) => {
                tx.executeSql('SELECT COUNT(*) as pomoCount FROM logs WHERE isCompleted = 1', [], (_, { rows }) => {
                    const { pomoCount } = rows.item(0);
                    setPomoCompletedCount(pomoCount);
                });
            });
        });
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    useEffect(() => {
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
                        insertLog(isEnabled 
                            ? `${is30Min ? '5min' : '15min'} PomoBreak` 
                            : `${is30Min ? '25min' : '45min'} PomoTimer`,
                            1, 
                            is30Min ? 30 : 60
                        );
                        setIsActive(false);
                        setIsRunning(false);
                        notifyAlert();
                        setIsEnabled((previousState) => !previousState);       
                        return breakTimer;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isActive, isEnabled, is30Min]);

    const handleStartPause = () => {
        setIsActive((previousState) => !previousState);
        setIsRunning((previousState) => !previousState);
        if (!isActive && pausedTimerCountRef.current !== null) {
            setTimerCount(pausedTimerCountRef.current);
        } else if (isActive) {
            pausedTimerCountRef.current = timerCount;
        }
        console.log('Start/Pause Pressed');
    };

    const handleReset = () => {
        setIsActive(false);
        setIsRunning(false);
        setTimerCount(breakTimer);
        pausedTimerCountRef.current = null;  
        insertLog(isEnabled 
            ? `${is30Min ? '5min' : '15min'} PomoBreak` 
            : `${is30Min ? '25min' : '45min'} PomoTimer`,
            0,
            is30Min ? 30 : 60
        );
        console.log('Reset Pressed');
    };

    const notifyAlert = async () => {
        if (sound) {
            sound.unloadAsync();
        }

        const { sound } = await Audio.Sound.createAsync(require('../assets/clock-alarm.mp3'));
        setSound(sound);
        await sound.playAsync();

        Alert.alert(
            'Pomodoro Times Up!',
            isEnabled ? "Let's get into some work!" : `Take ${is30Min ? 'a 5-minute' : 'a 15-minute'} break`,
            {
                text: 'OK',
                onPress: () => {
                    console.log('OK Pressed');
                    if (sound) {
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
