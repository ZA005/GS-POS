import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Setup1 from '../screens/setup_sceens/setup1';
import Setup2 from '../screens/setup_sceens/setup2';
import Setup3 from '../screens/setup_sceens/setup3';
import SetupComplete from '../screens/setup_sceens/setup_complete';
import Dashboard from '../screens/Dashboard/Dashboard';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Dashboard"
                screenOptions={{
                    headerShown: false,
                }}
            >
                {/* <Stack.Screen name="Setup1" component={Setup1} />
                <Stack.Screen name="Setup2" component={Setup2} />
                <Stack.Screen name="Setup3" component={Setup3} />
                <Stack.Screen name="SetupComplete" component={SetupComplete} /> */}
                <Stack.Screen name="Dashboard" component={Dashboard} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
