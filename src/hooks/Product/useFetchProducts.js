import { useEffect, useState, useCallback } from 'react';
import { fetchAllProducts } from '../../services/Product/ProductService';
import Product from "../../models/Product";

const useFetchProducts = () => {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            const products = await fetchAllProducts();
            const formattedProducts = products.map(
                (p) => new Product(p._product_id, p._description, p._tank_no, p._current_price)
            );
            setProductData(formattedProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return { productData, loading, fetchProducts };
};

export default useFetchProducts;
