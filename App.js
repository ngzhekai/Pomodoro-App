import React from 'react';
import { LogProvider } from './src/contexts/LogContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Pomo from './src/screens/FocusCycle';
import History from './src/screens/HistoryLog.js';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer style={styles.container}>
        <LogProvider>
        <Tab.Navigator screenOptions={tabScreenOptions}>
        <Tab.Screen 
        name={'30-Min Cycle'}
        component={PomoScreen}
        initialParams={{ is30Min: true }}
        options={tabOptions}
        /> 
        <Tab.Screen 
        name={'History'}
        component={History}
        options={tabOptions}
        />
        <Tab.Screen 
        name={'60-Min Cycle'}
        component={PomoScreen}
        initialParams={{ is30Min: false }}
        options={tabOptions}
        />
        </Tab.Navigator>
        </LogProvider>
        </NavigationContainer>
    );
}

const tabScreenOptions = ({ route }) => ({
    headerTitle: 'PomoTimer',
    tabBarStyle: {
        backgroundColor: 'white',
    },
    headerStyle: {
        //backgroundColor: '#C5F4E0',
        backgroundColor: '#7D7AFF',
    },
    headerTitleStyle:{ 
        fontWeight: 'bold',
        fontSize: 18,
    },
    tabBarIcon: ({ focused, color }) => {
        let iconName;

        if (route.name === '30-Min Cycle' || route.name === '60-Min Cycle') {
            iconName = focused ? 'ios-timer' : 'ios-timer-outline';
            return <Ionicons name={iconName} size={28} color={color} />;
        } else if (route.name === 'History') {
            iconName = 'history';
            return <MaterialCommunityIcons name={iconName} size={30} color={color} />;
        }

        return null;
    },
});

const tabOptions = {
    // color based on https://developer.apple.com/design/human-interface-guidelines/color
    tabBarActiveTintColor: '#0A84FF', 
    tabBarInactiveTintColor: '#8E8E93',
    style: {
        height: 20,
    },
};

const PomoScreen = ({ route }) => {
    const { is30Min } = route.params;

    return <Pomo is30Min={is30Min} />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight || 0,
    },
})
