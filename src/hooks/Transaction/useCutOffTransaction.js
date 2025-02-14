import { useState } from "react";
import { Alert } from "react-native";
import { cutOffTransaction } from "../../services/Transaction/TransactionService";
import Transaction from "../../models/Transaction";

const useCutOffTransaction = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [updatedTransaction, setUpdatedTransaction] = useState(null);

    const finalizeTransaction = async (transaction, { cutOffDate, cutOffTime }) => {
        if (!transaction || !(transaction instanceof Transaction)) {
            console.error("Invalid transaction object.");
            return null;
        }

        setLoading(true);
        setError(null);

        try {
            // Set cutoff details and mark transaction as cutoff
            transaction.setCutOffDate(cutOffDate);
            transaction.setCutOffTime(cutOffTime);
            transaction.setIsClosed(0); // Mark as cut-off (not fully closed yet)

            const success = await cutOffTransaction(transaction);

            if (success) {
                setUpdatedTransaction(transaction);
                Alert.alert("Success", "Transaction cutoff successfully!");
            } else {
                Alert.alert("Failed", "Failed to cut off the transaction.");
            }

            return success ? transaction : null;
        } catch (err) {
            setError(err);
            console.error("Error cutting off transaction:", err);
            Alert.alert("Error", "An error occurred during the cutoff process.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { finalizeTransaction, updatedTransaction, loading, error };
};

export default useCutOffTransaction;
