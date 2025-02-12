import { useState } from "react";
import { cutOffTransaction } from "../services/TransactionService";
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
            // Update the transaction instance
            transaction.setCutOffDate(cutOffDate);
            transaction.setCutOffTime(cutOffTime);
            transaction.setIsClosed(0); // Mark as cut-off

            const success = await cutOffTransaction(transaction);

            if (success) {
                setUpdatedTransaction(transaction);
            }

            return success ? transaction : null;
        } catch (err) {
            setError(err);
            console.error("Error cutting off transaction:", err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { finalizeTransaction, updatedTransaction, loading, error };
};

export default useCutOffTransaction;
