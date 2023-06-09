import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Switch } from 'react-native';
import TimeFormatter from '../components/TimeFormatter';
// import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const Focus60Cycle = () => {

    let breakTimer = 0;
    const [isActive, setIsActive] = useState(false);
    const [timerCount, setTimer] = useState(breakTimer);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    // const navigation = useNavigation();

    useEffect(() => {
        let interval = null;
        let breakTimer = isEnabled ? 900 : 2700;
        setTimer(isEnabled ? 900 : 2700);

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
        Alert.alert('Pomodoro Times Up!', isEnabled ? 'Let\'s get into some work!' : 'Take a 15-minutes break', 
            {
                text: 'OK',
                onPress: () => console.log('OK Pressed')
            }
        );
    };
    return (
        <View style={styles.container}>
        <View style={styles.toggleWrapper}>
        <Text style={styles.toggleText}>Break</Text>
        <Switch style={styles.toggleSwitch}
        trackColor={{false: '#767577', true: '#5BC236'}}
        thumbColor={'#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        disabled = {isActive ? true : false}
        />
        <View style={styles.timerWrapper}>
        <Text style={styles.timerText}>{TimeFormatter(timerCount)}</Text>
        </View>
        <TouchableOpacity style={[styles.button, styles.buttonType1]} onPress={handleStartPause}>
        <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white', 
        flex: 1,
    },
    timerWrapper: {
        backgroundColor: 'black',
        borderRadius: 45,
        height: 180,
        width: 250,
//        marginTop: 180,
        marginVertical: 20,
    },
    timerText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 75,
    },
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
        //fontWeight: 'bold',
    },
    toggleWrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 120,
    },
    toggleSwitch: {
        marginBottom: 30,
    },
    toggleText: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingBottom: 10
    },
});

export default Focus60Cycle

