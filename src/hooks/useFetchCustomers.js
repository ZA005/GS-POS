import { useState, useEffect } from 'react';
import { fetchCustomers } from '../services/Customer/CustomerService';

const useFetchCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadCustomers = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchCustomers();
            setCustomers(data);
        } catch (err) {
            console.error("Error fetching customers:", err);
            setError("Failed to fetch customers.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    return { customers, loading, error, refresh: loadCustomers };
};

export default useFetchCustomers;
