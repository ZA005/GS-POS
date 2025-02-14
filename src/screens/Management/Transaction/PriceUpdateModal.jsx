import React from "react";
import { ScrollView } from "react-native";
import { Modal, Text, Divider, Button } from "react-native-paper";
import ProductList from "./ProductList";
import styles from "./transaction.styles";

const PriceUpdateModal = ({ visible, products, updatedProducts, onConfirm, onClose, onPriceChange }) => {
    return (
        <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
            <Text style={styles.modalTitle}>Update Product Prices</Text>
            <Divider style={styles.modalDivider} />
            <ScrollView style={styles.modalContent}>
                <ProductList products={products} onPriceChange={onPriceChange} />
            </ScrollView>
            <Button mode="contained" onPress={onConfirm} style={styles.modalButton} buttonColor="#002855">
                Confirm
            </Button>
            <Button mode="text" onPress={onClose} style={styles.modalButton} textColor="#00224E">
                Close
            </Button>
        </Modal>
    );
};

export default PriceUpdateModal;
