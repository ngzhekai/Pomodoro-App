import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Pomo from './src/screens/FocusCycle';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer style={styles.container}>
        <Tab.Navigator
        screenOptions={{
            headerTitle: 'PomoTimer',
                tabBarStyle: {
                    backgroundColor: 'white',
                },
                headerStyle: {
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
        >{() => <Pomo is30Min={true} />}</Tab.Screen> 
        <Tab.Screen name={'60-Min Cycle'}
        options={{tabBarIcon: ({focused, color, size}) =>
                <AntDesign name={focused ? 'clockcircleo' : 'clockcircle'} size={size} color={color} />
        }}
        >{() => <Pomo is30Min={false}/>}</Tab.Screen>
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
