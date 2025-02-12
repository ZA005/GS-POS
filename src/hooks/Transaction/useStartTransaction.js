import { useState } from "react";
import { startTransaction } from "../../services/Transaction/TransactionService";
import Transaction from "../../models/Transaction";

const useStartTransaction = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [transaction, setTransaction] = useState(null);

    const initiateTransaction = async ({ startDate, startTime }) => {
        setLoading(true);
        setError(null);

        try {
            const newTransaction = new Transaction(null, startDate, startTime, "", "", null);
            const success = await startTransaction(newTransaction);

            if (success) {
                setTransaction(newTransaction);
            }

            return success ? newTransaction : null;
        } catch (err) {
            setError(err);
            console.error("Error starting transaction:", err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { initiateTransaction, transaction, loading, error };
};

export default useStartTransaction;
