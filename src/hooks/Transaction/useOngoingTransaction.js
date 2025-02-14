import { useState, useEffect } from "react";
import { getOngoingTransaction } from "../../services/Transaction/TransactionService";
import Transaction from "../../models/Transaction";

const useOngoingTransaction = () => {
    const [ongoingTransaction, setOngoingTransaction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOngoingTransaction = async () => {
        setLoading(true);
        setError(null);

        try {
            const transaction = await getOngoingTransaction();
            console.log(transaction)
            if (transaction instanceof Transaction) {
                setOngoingTransaction(transaction);
            }
        } catch (err) {
            setError(err);
            console.error("Error fetching ongoing transaction:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOngoingTransaction();
    }, []);

    return { ongoingTransaction, loading, error, refresh: fetchOngoingTransaction };
};

export default useOngoingTransaction;
