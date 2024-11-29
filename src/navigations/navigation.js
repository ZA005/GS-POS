import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import GetStarted from '../screens/Setup/GetStarted';
import AdminLogin from '../screens/Setup/AdminLogin';
import SetupBranch from '../screens/Setup/SetupBranch';
import SetupComplete from '../screens/Setup/Setup_Complete';
import Dashboard from '../screens/Dashboard/Dashboard';
import AdminManagement from '../screens/Management/AdminManagement';
import UserManagement from '../screens/Management/UserManagement';
import ProductManagement from '../screens/Management/ProductManagement';

import { fetchBranch } from '../services/BranchService';

const Stack = createStackNavigator();

const Navigation = () => {
    const [initialRoute, setInitialRoute] = useState(null);

    useEffect(() => {
        const checkBranchData = async () => {
            try {
                const branchData = await fetchBranch();
                console.log(branchData);
                if (branchData) {
                    setInitialRoute('Dashboard');
                } else {
                    setInitialRoute('GetStarted');
                }
            } catch (error) {
                console.error('Error checking branch data:', error);
                setInitialRoute('GetStarted'); // Default to GetStarted in case of error
            }
        };

        checkBranchData();
    }, []);

    // Wait until initialRoute is determined
    if (!initialRoute) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6200ee" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={initialRoute}
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
                <Stack.Screen name="UserManagement" component={UserManagement} />
                <Stack.Screen name="ProductManagement" component={ProductManagement} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
});

export default Navigation;
