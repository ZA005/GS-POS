import React, { useState, useEffect } from "react";
import { View, ScrollView, FlatList, Alert, RefreshControl } from "react-native";
import { Text, IconButton, Modal, Button, Divider } from "react-native-paper";
import useFetchProducts from "../../../hooks/Product/useFetchProducts"
import usePriceUpdater from "../../../hooks/Product/usePriceUpdater";
import useOngoingTransaction from "../../../hooks/Transaction/useOngoingTransaction";
import ProductList from "./ProductList";
import PriceUpdateModal from "./PriceUpdateModal";
import styles from "./transaction.styles";
import useCutOffTransaction from "../../../hooks/Transaction/useCutOffTransaction";

const formatPrice = (price) => parseFloat(price).toFixed(2);

const TransactionManagement = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [startTimeModalVisible, setStartTimeModalVisible] = useState(false);
    const [transactionDate, setTransactionDate] = useState("");
    const [transactionTime, setTransactionTime] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    const { productData, loading, fetchProducts } = useFetchProducts();
    const { ongoingTransaction, loading: ongoingLoading, error, refresh } = useOngoingTransaction();
    const { finalizeTransaction, loading: cutOffLoading } = useCutOffTransaction();
    const { updatedProducts, handlePriceChange, confirmPriceUpdate, clearUpdates } =
        usePriceUpdater(productData, fetchProducts, setModalVisible, transactionDate, transactionTime, refresh);

    useEffect(() => {
        const now = new Date();
        setTransactionDate(now.toLocaleDateString());
        setTransactionTime(now.toLocaleTimeString());
    }, []);

    const refreshData = async () => {
        setRefreshing(true);
        try {
            await Promise.all([
                refresh(),
                fetchProducts()
            ]);
        } catch (error) {
            console.error("Error refreshing data:", error);
            Alert.alert("Error", "Failed to refresh data");
        } finally {
            setRefreshing(false);
        }
    };

    const handleStartOrCutOffTransaction = () => {
        if (ongoingTransaction) {
            Alert.alert(
                "Cut Off Transaction",
                "Are you sure you want to cut off this transaction?",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Confirm",
                        onPress: async () => {
                            const now = new Date();
                            const cutOffDate = now.toLocaleDateString();
                            const cutOffTime = now.toLocaleTimeString();

                            const result = await finalizeTransaction(ongoingTransaction, {
                                cutOffDate,
                                cutOffTime
                            });

                            if (result) {
                                await refreshData(); // Refresh all data after successful cut-off
                                Alert.alert(
                                    "Success",
                                    "Transaction has been cut off successfully",
                                    [
                                        {
                                            text: "OK",
                                            onPress: () => navigation.replace("TransactionManagement") // Force a fresh render
                                        }
                                    ]
                                );
                            }
                        }
                    },
                ]
            );
        } else {
            setStartTimeModalVisible(true);
        }
    };

    const handleConfirmTransaction = () => {
        setStartTimeModalVisible(false);
        setModalVisible(true);
    };

    const renderLoadingState = () => {
        if (ongoingLoading || cutOffLoading) {
            return <Text style={styles.loadingText}>
                {ongoingLoading ? "Fetching ongoing transaction..." : "Processing cut-off..."}
            </Text>;
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <IconButton icon="arrow-left" size={30} onPress={() => navigation.goBack()} style={styles.backButton} />
                <Text style={styles.title}>Transaction Management</Text>
            </View>

            <FlatList
                data={ongoingTransaction ? productData : []}
                keyExtractor={(item) => item._product_id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refreshData}
                        colors={["#2196F3"]} // Add your app's primary color
                    />
                }
                ListHeaderComponent={
                    <>
                        {renderLoadingState()}
                        {!ongoingLoading && !cutOffLoading && (
                            <>
                                {ongoingTransaction ? (
                                    <View style={styles.transactionContainer}>
                                        <Text style={styles.transactionHeader}>Ongoing Transaction</Text>
                                        <Divider style={styles.transactionDivider} />
                                        <Text style={styles.transactionText}>Start Date: {ongoingTransaction._start_date}</Text>
                                        <Text style={styles.transactionText}>Start Time: {ongoingTransaction._start_time}</Text>
                                    </View>
                                ) : (
                                    <Text style={styles.noTransactionText}>No ongoing transaction</Text>
                                )}
                            </>
                        )}
                    </>
                }
                renderItem={({ item }) => (
                    <View style={styles.productItem}>
                        <Text style={styles.productName}>{item._description}</Text>
                        <Text style={styles.productPrice}>Updated Price: ₱{formatPrice(item._current_price)}</Text>
                    </View>
                )}
            />

            <View style={styles.footer}>
                <View style={styles.buttonContainer}>
                    <IconButton
                        icon={ongoingTransaction ? "close" : "plus"}
                        size={24}
                        onPress={handleStartOrCutOffTransaction}
                        style={styles.iconButton}
                        iconColor="white"
                        disabled={cutOffLoading || ongoingLoading || refreshing}
                    />
                    <Text style={styles.buttonLabel}>
                        {ongoingTransaction ? "Cut Off Transaction" : "Start Transaction"}
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <IconButton
                        icon="account-check"
                        size={24}
                        onPress={() => { }}
                        style={styles.iconButton}
                        iconColor="white"
                    />
                    <Text style={styles.buttonLabel}>View Logs</Text>
                </View>
            </View>

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

            <Modal
                visible={startTimeModalVisible}
                onDismiss={() => setStartTimeModalVisible(false)}
                contentContainerStyle={styles.modalContainer}
            >
                <Text style={styles.modalTitle}>Transaction Start Time & Date</Text>
                <Divider style={styles.modalDivider} />
                <View style={styles.modalContent}>
                    <Text style={{ textAlign: "center", fontSize: 18 }}>
                        Date: {transactionDate}
                    </Text>
                    <Text style={{ textAlign: "center", fontSize: 18 }}>
                        Time: {transactionTime}
                    </Text>
                </View>

                <Button
                    mode="contained"
                    onPress={handleConfirmTransaction}
                    style={styles.modalButton}
                >
                    Confirm
                </Button>

                <Button
                    mode="outlined"
                    onPress={() => setStartTimeModalVisible(false)}
                    style={styles.modalButton}
                >
                    Close
                </Button>
            </Modal>
        </View>
    );
};

export default TransactionManagement;