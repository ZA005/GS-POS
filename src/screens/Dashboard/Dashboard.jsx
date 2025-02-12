import React, { useState, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, BottomNavigation } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../../components/Card/ProductCard';
import Management from '../Management/Management';
import useFetchProducts from '../../hooks/Product/useFetchProducts';
import styles from './dashboard.styles';

const formatPrice = (price) => parseFloat(price).toFixed(2);

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState(0);
    const navigation = useNavigation();
    const { productData, loading } = useFetchProducts(activeTab);

    const renderDashboard = useCallback(() => (
        <ScrollView contentContainerStyle={styles.container} stickyHeaderIndices={[0]}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Product Dashboard</Text>
            </View>
            {loading ? (
                <Text style={styles.loadingText}>Loading products...</Text>
            ) : productData.length === 0 ? (
                <Text style={styles.noDataText}>No Product to be displayed.</Text>
            ) : (
                productData.map((product) => (
                    <ProductCard
                        key={product.getID()}
                        productName={product.getDescription()}
                        currentPrice={formatPrice(product.getCurrentPrice())}
                        lastUpdated={product.lastUpdated || 'N/A'}
                    />
                ))
            )}
        </ScrollView>
    ), [productData, loading]);

    const renderSettings = useCallback(() => <Management navigation={navigation} />, [navigation]);

    const routes = [
        { key: 'dashboard', title: 'Dashboard', focusedIcon: 'view-dashboard', unfocusedIcon: 'view-dashboard-outline' },
        { key: 'settings', title: 'Management', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' },
    ];

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'dashboard':
                return <View key="dashboard">{renderDashboard()}</View>;
            case 'settings':
                return <View key="settings">{renderSettings()}</View>;
            default:
                return null;
        }
    };

    return (
        <BottomNavigation
            navigationState={{ index: activeTab, routes }}
            onIndexChange={setActiveTab}
            renderScene={(props) => {
                const { route } = props;
                return <View key={route.key}>{renderScene(props)}</View>;
            }}
            barStyle={styles.bottomNavigation}
        />
    );
};

export default Dashboard;
