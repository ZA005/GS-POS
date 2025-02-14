import React from "react";
import { View, TextInput } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import styles from "./transaction.styles";

const formatPrice = (price) => parseFloat(price).toFixed(2);

const ProductList = ({ products, loading, onPriceChange }) => {
    if (loading) return <ActivityIndicator animating={true} size="large" />;
    if (products.length === 0) return <Text style={{ textAlign: "center", marginTop: 20 }}>No products available.</Text>;

    return products.map((product) => (
        <View key={product.getID()} style={styles.productContainer}>
            <Text style={styles.productName}>{product.getDescription()}</Text>
            <Text style={styles.productPrice}>Current Price: ₱{formatPrice(product.getCurrentPrice())}</Text>
            <TextInput
                style={styles.priceInput}
                defaultValue={formatPrice(product.getCurrentPrice())}
                keyboardType="numeric"
                placeholder="Enter new price"
                onChangeText={(text) => onPriceChange(product.getID(), text)}
            />
        </View>
    ));
};

export default ProductList;
