import { useState } from "react";
import { Alert } from "react-native";
import { updateMultipleProductPrices } from "../services/Product/ProductService";
import Product from "../models/Product";

const usePriceUpdater = (productData, fetchProducts, setModalVisible) => {
    const [updatedProducts, setUpdatedProducts] = useState({});

    const handlePriceChange = (productId, newPrice) => {
        setUpdatedProducts((prev) => ({
            ...prev,
            [productId]: parseFloat(newPrice) || 0,
        }));
    };

    const confirmPriceUpdate = async () => {
        const productsToUpdate = productData
            .filter((product) => updatedProducts[product.getID()] !== undefined)
            .map((product) =>
                new Product(
                    product.getID(),
                    product.getDescription(),
                    product.getTankNo(),
                    updatedProducts[product.getID()]
                )
            );

        if (productsToUpdate.length === 0) {
            Alert.alert("No Changes", "No prices were updated.");
            setModalVisible(false);
            return;
        }

        Alert.alert(
            "Confirm Prices",
            "By confirming, you will start a new transaction and update the product price.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Yes, Update",
                    onPress: async () => {
                        try {
                            await updateMultipleProductPrices(productsToUpdate);
                            Alert.alert("Success", "The product prices have been updated successfully.");
                            setUpdatedProducts({});
                            setModalVisible(false);
                            fetchProducts();
                        } catch (error) {
                            Alert.alert("Error", "Oops! We couldn't update the product prices. Please try again.");
                            console.error("Price update error:", error);
                        }
                    }
                }
            ]
        );
    };

    const clearUpdates = () => setUpdatedProducts({});

    return { updatedProducts, handlePriceChange, confirmPriceUpdate, clearUpdates };
};

export default usePriceUpdater;
