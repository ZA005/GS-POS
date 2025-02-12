import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import GetStarted from '../screens/Setup/GetStarted';
import AdminLogin from '../screens/Setup/AdminLogin';
import SetupBranch from '../screens/Setup/SetupBranch';
import SetupComplete from '../screens/Setup/Setup_Complete';
import Dashboard from '../screens/Dashboard/Dashboard';
import AdminManagement from '../screens/Management/Admin/AdminManagement';
import UserManagement from '../screens/Management/User/UserManagement';
import ProductManagement from '../screens/Management/Product/ProductManagement';
import CustomerManagement from '../screens/Management/Customer/CustomerManagement';
import TransactionManagement from '../screens/Management/Transaction/TransactionManagement';
import { fetchBranch } from '../services/Branch/BranchService';

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
                setInitialRoute('GetStarted');
            }
        };

        checkBranchData();
    }, []);

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
                <Stack.Screen name="CustomerManagement" component={CustomerManagement} />
                <Stack.Screen name="TransactionManagement" component={TransactionManagement} />
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
