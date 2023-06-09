import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Layout from '../components/Layout';
import Timer from '../components/Timer';
import ToggleButton from '../components/ToggleButton';
import TimerButton from '../components/TimerButton';

const FocusCycle = ({ is30Min }) => {
  const [isActive, setIsActive] = useState(false);
  const [timerCount, setTimerCount] = useState(is30Min ? 10 : 2700);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    let interval = null;
    const breakTimer = isEnabled ? (is30Min ? 5 : 900) : is30Min ? 10 : 2700;
    setTimerCount(breakTimer);

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
    } else {
      clearInterval(interval);
    }

    // to pause the timer from counting down
    return () => clearInterval(interval);
  }, [isActive, isEnabled, is30Min]);

  const handleStartPause = () => {
    setIsActive((previousState) => !previousState);
  };

  const notifyAlert = () => {
    Alert.alert(
      'Pomodoro Times Up!',
      isEnabled
        ? "Let's get into some work!"
        : `Take ${is30Min ? 'a 5-minute' : 'a 15-minute'} break`,
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed'),
      }
    );
  };

  return (
    <Layout>
      <ToggleButton isEnabled={isEnabled} toggleSwitch={toggleSwitch} isActive={isActive} />
      <Timer timerCount={timerCount} />
      <TimerButton isActive={isActive} handleStartPause={handleStartPause} />
    </Layout>
  );
};

export default FocusCycle;

