import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, BottomNavigation } from 'react-native-paper';
import CardComponent from '../../components/Card/CardComponent';
import Management from '../Management/Management';

import styles from './dashboard.styles';

const Dashboard = () => {
    const productData = [
        { id: 1, productName: 'DIESEL', currentPrice: '54.32', lastUpdated: 'November 21, 2024 9:04 PM' },
        { id: 2, productName: 'GASOLINE-PREMIUM', currentPrice: '54.32', lastUpdated: 'November 21, 2024 9:04 PM' },
        { id: 3, productName: 'UNLEADED', currentPrice: '54.32', lastUpdated: 'November 21, 2024 9:04 PM' },
        { id: 4, productName: 'KEROSENE', currentPrice: '54.32', lastUpdated: 'November 21, 2024 9:04 PM' },
        { id: 5, productName: 'SILVER', currentPrice: '54.32', lastUpdated: 'November 21, 2024 9:04 PM' },
    ];

    const [activeTab, setActiveTab] = React.useState(0);

    const renderDashboard = () => (
        <ScrollView contentContainerStyle={styles.container} stickyHeaderIndices={[0]}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Product Dashboard</Text>
            </View>
            {productData.map((product) => (
                <CardComponent
                    key={product.id} // Key explicitly added here
                    productName={product.productName}
                    currentPrice={product.currentPrice}
                    lastUpdated={product.lastUpdated}
                />
            ))}
        </ScrollView>
    );

    const renderSettings = () => <Management />;

    const routes = [
        {
            id: 'dashboard', // Added id to avoid any conflict with key
            key: 'dashboard',
            title: 'Dashboard',
            focusedIcon: 'view-dashboard',
            unfocusedIcon: 'view-dashboard-outline',
        },
        {
            id: 'settings',
            key: 'settings',
            title: 'Management',
            focusedIcon: 'cog',
            unfocusedIcon: 'cog-outline',
        },
    ];

    const renderScene = ({ route }) => {
        if (route.key === 'dashboard') {
            return renderDashboard();
        }
        if (route.key === 'settings') {
            return renderSettings();
        }
        return null;
    };

    return (
        <BottomNavigation
            navigationState={{ index: activeTab, routes }}
            onIndexChange={setActiveTab}
            renderScene={(props) => renderScene(props)}
            barStyle={styles.bottomNavigation}
        />
    );
};

export default Dashboard;
