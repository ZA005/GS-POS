import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, BottomNavigation } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import CardComponent from '../../components/Card/CardComponent';
import Management from '../Management/Management';
import { fetchAllProducts } from '../../services/ProductService';
import styles from './dashboard.styles';

const Dashboard = () => {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const navigation = useNavigation();

    useEffect(() => {
        if (activeTab === 0) {
            const loadProducts = async () => {
                try {
                    setLoading(true);
                    const products = await fetchAllProducts();
                    setProductData(products);
                } catch (error) {
                    console.error("Error fetching products:", error);
                } finally {
                    setLoading(false);
                }
            };

            loadProducts();
        }
    }, [activeTab]);

    const formatPrice = (price) => {
        const numericPrice = parseFloat(price);
        return numericPrice.toFixed(2);
    };

    const renderDashboard = () => (
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
                    <CardComponent
                        key={product.getID()}
                        productName={product.getDescription()}
                        currentPrice={formatPrice(product.getCurrentPrice())}
                        lastUpdated={product.lastUpdated || 'N/A'} // Use 'N/A' if no lastUpdated
                    />
                ))
            )}
        </ScrollView>
    );

    const renderSettings = () => {
        return <Management navigation={navigation} />;
    };

    const routes = [
        {
            id: 'dashboard',
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
