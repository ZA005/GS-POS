import React, { useState } from "react";
import { View, ScrollView, TextInput, Alert } from "react-native";
import { Text, IconButton, Modal, Button } from "react-native-paper";
import useFetchProducts from "../../../hooks/useFetchProducts"
import usePriceUpdater from "../../../hooks/usePriceUpdater";
import ProductList from "./ProductList";
import PriceUpdateModal from "./PriceUpdateModal";
import styles from "./transaction.styles";

const TransactionManagement = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewInactive, setViewInactive] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const { productData, loading, fetchProducts } = useFetchProducts(0);
    const { updatedProducts, handlePriceChange, confirmPriceUpdate, clearUpdates } = usePriceUpdater(productData, fetchProducts, setModalVisible);

    const handleUpdatePrices = () => {
        Alert.alert(
            "Confirmation Required",
            "You need to update the prices of the product to begin a new transaction.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Update Prices", onPress: () => setModalVisible(true) }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <IconButton icon="arrow-left" size={30} onPress={() => navigation.goBack()} style={styles.backButton} />
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

            {/* Product List */}
            <View style={{ flex: 1 }}>

            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.buttonContainer}>
                    <IconButton icon="plus" size={24} onPress={handleUpdatePrices} style={styles.iconButton} iconColor="white" />
                    <Text style={styles.buttonLabel}>Start Transaction</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <IconButton icon="account-check" size={24} onPress={() => { }} style={styles.iconButton} iconColor="white" />
                    <Text style={styles.buttonLabel}>{viewInactive ? "View Current T" : "View Logs"}</Text>
                </View>
            </View>

            {/* Price Update Modal */}
            <PriceUpdateModal
                visible={modalVisible}
                products={productData}
                updatedProducts={updatedProducts}
                onConfirm={confirmPriceUpdate}
                onClose={() => {
                    clearUpdates();
                    setModalVisible(false);
                }}
                onPriceChange={handlePriceChange}
            />
        </View>
    );
};

export default TransactionManagement;
