import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import GetStarted from '../screens/Setup/GetStarted';
import AdminLogin from '../screens/Setup/AdminLogin'
import SetupBranch from '../screens/Setup/SetupBranch'
import SetupComplete from '../screens/setup_sceens/setup_complete';
import Dashboard from '../screens/Dashboard/Dashboard';
import AdminManagement from '../screens/Management/AdminManagement';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="GetStarted"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="GetStarted" component={GetStarted} />
                <Stack.Screen name="AdminLogin" component={AdminLogin} />
                <Stack.Screen name="SetupBranch" component={SetupBranch} />
                <Stack.Screen name="SetupComplete" component={SetupComplete} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="AdminManagement" component={AdminManagement} />


            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
