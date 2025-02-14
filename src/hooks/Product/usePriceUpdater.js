import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { updateMultipleProductPrices } from "../../services/Product/ProductService";
import useStartTransaction from "../Transaction/useStartTransaction";
import Product from "../../models/Product";

const usePriceUpdater = (productData, fetchProducts, setModalVisible, transactionDate, transactionTime, refresh) => {
    const [updatedProducts, setUpdatedProducts] = useState({});
    const [transactionDetails, setTransactionDetails] = useState({ date: "", time: "" });

    const { initiateTransaction, transaction, loading } = useStartTransaction();

    useEffect(() => {
        if (transactionDate && transactionTime) {
            setTransactionDetails((prev) => {
                if (prev.date === transactionDate && prev.time === transactionTime) {
                    return prev;
                }
                return { date: transactionDate, time: transactionTime };
            });
        }
    }, [transactionDate, transactionTime]);

    const logTransactionDetails = () => {
        console.log("Transaction Date:", transactionDetails.date);
        console.log("Transaction Time:", transactionDetails.time);
    };

    const handlePriceChange = (productId, newPrice) => {
        setUpdatedProducts((prev) => ({
            ...prev,
            [productId]: parseFloat(newPrice) || 0,
        }));
    };

    const confirmPriceUpdate = async () => {
        logTransactionDetails();

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
            "By confirming, you will update the product prices and start a new transaction.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Yes, Update",
                    onPress: async () => {
                        try {
                            await updateMultipleProductPrices(productsToUpdate);

                            Alert.alert(
                                "Success",
                                "The product prices have been updated successfully.",
                                [
                                    {
                                        text: "OK",
                                        onPress: async () => {
                                            setUpdatedProducts({});
                                            setModalVisible(false);

                                            // Start a new transaction AFTER updating prices
                                            await initiateTransaction({
                                                startDate: transactionDetails.date,
                                                startTime: transactionDetails.time,
                                            });

                                            // Refresh all required data
                                            await fetchProducts();
                                            if (refresh) {
                                                await refresh();
                                            }
                                        }
                                    }
                                ]
                            );

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

    return { updatedProducts, handlePriceChange, confirmPriceUpdate, clearUpdates, transactionTime, loading };
};

export default usePriceUpdater;