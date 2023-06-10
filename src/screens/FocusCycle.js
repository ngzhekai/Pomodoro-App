import React, { useState, useEffect, useRef } from 'react';
import { Alert, StyleSheet, Text, View, FlatList } from 'react-native';
import Layout from '../components/Layout';
import Timer from '../components/Timer';
import ToggleButton from '../components/ToggleButton';
import TimerButton from '../components/TimerButton';
import { Audio } from 'expo-av';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('historyLog.db');

db.transaction((tx) => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT)'
    );
});

const FocusCycle = ({ is30Min }) => {
    const {
        historyList,
        historyTitle,
        textList,
    } = styles;

    const [isActive, setIsActive] = useState(false);
    const [timerCount, setTimerCount] = useState(is30Min ? 10 : 2700);
    const [isEnabled, setIsEnabled] = useState(false);
    const [sound, setSound] = useState(null);
    const pausedTimerCountRef = useRef(null);
    const breakTimer = isEnabled ? (is30Min ? 5 : 900) : is30Min ? 10 : 15;
    const [logs, setLogs] = useState([]);

    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    
    useEffect(() => {
        fetchLogs();
    }, []);


    const insertLog = (message) => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO logs (message) VALUES (?)', [message],
                (_, { insertId }) => {
                    // insertion successful, fetch logs again to update the state
                    fetchLogs();
                } 
            );
        });
    };

    const fetchLogs = () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM logs ORDER BY id DESC;', [], (_, { rows }) => {
                const logsData = rows._array;
                setLogs(logsData);
            });
        });
    };

    
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
                        insertLog(isEnabled ? `${is30Min ? '30min' : '60min'} PomoBreak Completed` : 
                            `${is30Min ? '30min' : '60min'} PomoTimer Completed`)
;
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
        if (!isActive && pausedTimerCountRef.current !== null) {
            setTimerCount(pausedTimerCountRef.current);
        } else if (isActive) {
            pausedTimerCountRef.current = timerCount;
        }
    };

    const handleReset = () => {
        setIsActive(false);
        setTimerCount(breakTimer);
        pausedTimerCountRef.current = null;  
        insertLog(isEnabled ? `Resets ${is30Min ? '30min' : '60min'} PomoBreak` : 
            `Resets ${is30Min ? '30min' : '60min'} PomoTimer`);
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

    const renderLogItem = ({ item }) => (
        <Text key={item.id} style={textList}>{item.message}</Text>
    );


    return (
        <Layout>
        <ToggleButton isEnabled={isEnabled} toggleSwitch={toggleSwitch} isActive={isActive} />
        <Timer timerCount={timerCount} />
        <TimerButton isActive={isActive} handleStartPause={handleStartPause} handleReset={handleReset} />
        <View style={historyList}>
        <Text style={historyTitle}>History </Text>
        <FlatList
        data={logs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderLogItem }
        />
        </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    historyList: {
        marginTop: 19,
        marginBottom: 14,
        flex: 1,
    },
    historyTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        textTransform: 'capitalize',
        paddingBottom: 8,
    },
    textList: {
        paddingBottom: 10,
    },
});

export default FocusCycle;

