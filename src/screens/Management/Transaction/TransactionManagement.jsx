import React, { useState } from "react";
import { View, ScrollView, TextInput, Alert } from 'react-native';
import { Text, IconButton, Divider, Modal, Card, ActivityIndicator, Button } from 'react-native-paper';
import useFetchProducts from "../../../hooks/useFetchProducts";
import styles from './transaction.styles';

const formatPrice = (price) => parseFloat(price).toFixed(2);

const TransactionManagement = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewInactive, setViewInactive] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const { productData, loading } = useFetchProducts(0);

    const handleUpdatePrices = () => {
        Alert.alert(
            "Confirmation Required",
            "You need to update the prices of the product to begin a new transaction.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Update Prices",
                    onPress: () => setModalVisible(true)
                }
            ]
        );
    };

    const renderProducts = () => {
        if (loading) {
            return <ActivityIndicator animating={true} size="large" />;
        }

        if (productData.length === 0) {
            return <Text style={{ textAlign: "center", marginTop: 20 }}>No products available.</Text>;
        }

        return productData.map((product, index) => (
            <View key={index} style={styles.productContainer}>
                <Text style={styles.productName}>{product.getDescription()}</Text>
                <Text style={styles.productPrice}>Current Price: ₱{formatPrice(product.getCurrentPrice())}</Text>
                <TextInput
                    style={styles.priceInput}
                    defaultValue={formatPrice(product.getCurrentPrice())}
                    keyboardType="numeric"
                    placeholder="Enter new price"
                    onChangeText={(text) => {
                        // Handle price update logic
                        product.updatePrice(parseFloat(text) || 0);
                    }}
                />
            </View>
        ));
    };



    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <IconButton
                    icon="arrow-left"
                    size={30}
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                />
                <Text style={styles.title}>Transaction Management</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    style={styles.searchBar}
                />
            </View>

            <View style={{ flex: 1 }}>
                <ScrollView>
                    {/* Product List goes here if needed */}
                </ScrollView>
            </View>

            <View style={styles.footer}>
                {/* Add User Button */}
                <View style={styles.buttonContainer}>
                    <IconButton
                        icon="plus"
                        size={24}
                        onPress={handleUpdatePrices}
                        style={styles.iconButton}
                        iconColor="white"
                    />
                    <Text style={styles.buttonLabel}>Start Transaction</Text>
                </View>

                {/* Toggle Active/Inactive Users Button */}
                <View style={styles.buttonContainer}>
                    <IconButton
                        icon="account-check"
                        size={24}
                        onPress={() => { }}
                        style={styles.iconButton}
                        iconColor="white"
                    />
                    <Text style={styles.buttonLabel}>{viewInactive ? "View Current T" : "View Logs"}</Text>
                </View>
            </View>

            {/* Modal for displaying products */}
            <Modal
                visible={modalVisible}
                onDismiss={() => setModalVisible(false)}
                contentContainerStyle={styles.modalContainer}
            >
                <Text style={styles.modalTitle}>Update Product Prices</Text>
                <Divider style={styles.modalDivider} />
                <ScrollView style={styles.modalContent}>
                    {renderProducts()}
                </ScrollView>
                <Button
                    mode="contained"
                    onPress={() => setModalVisible(false)}
                    style={styles.modalButton}
                >
                    Close
                </Button>
            </Modal>
        </View>
    );
};

export default TransactionManagement;
