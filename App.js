import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Test from './src/components/FocusCycle';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer style={styles.container}>
        <Tab.Navigator
        screenOptions={{
            headerTitle: 'Pomodoro',
            //tabBarActiveTintColor: '#1976d2',
            //tabBarInactiveTintColor: 'grey',
                tabBarStyle: {
                    backgroundColor: 'white',
                },
                headerStyle: {
                    //backgroundColor: 'papayawhip',
                    backgroundColor: '#C5F4E0',
                },
                headerTitleStyle:{ 
                    fontWeight: 'bold',
                        fontSize: 18,
                },
        }}
        >
        <Tab.Screen name={'30-Min Cycle'}
        options={{tabBarIcon: ({focused, color, size}) =>
                <AntDesign name={focused ? 'clockcircleo' : 'clockcircle'} size={size} color={color} />
        }}
        >{() => <Test is30Min={true} />}</Tab.Screen> 
        <Tab.Screen name={'60-Min Cycle'}
        options={{tabBarIcon: ({focused, color, size}) =>
                <AntDesign name={focused ? 'clockcircleo' : 'clockcircle'} size={size} color={color} />
        }}
        >{() => <Test is30Min={false}/>}</Tab.Screen>
        </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight || 0,
    },
})
