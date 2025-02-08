import { useEffect, useState } from 'react';
import { fetchAllProducts } from '../services/Product/ProductService';

const useFetchProducts = (activeTab) => {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (activeTab === 0) {
            const loadProducts = async () => {
                try {
                    setLoading(true);
                    const products = await fetchAllProducts();
                    setProductData(products);
                } catch (error) {
                    console.error("Error fetching products:", error);
                } finally {
                    setLoading(false);
                }
            };

            loadProducts();
        }
    }, [activeTab]);

    return { productData, loading };
};

export default useFetchProducts;
