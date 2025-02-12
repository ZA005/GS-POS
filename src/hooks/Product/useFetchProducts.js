import { useEffect, useState } from 'react';
import { fetchAllProducts } from '../../services/Product/ProductService';
import Product from "../../models/Product";

const useFetchProducts = () => {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
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
    };

    return { productData, loading, fetchProducts }; // Remove `activeTab` dependency
};

export default useFetchProducts;
