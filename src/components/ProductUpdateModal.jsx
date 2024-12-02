import React, { useState, useEffect } from 'react';
import ModalForm from './Modal/ModalForm';
import Product from '../models/Product';
import CustomAlert from './Alert/CustomAlert';
import { fetchProductByID, updateProduct } from '../services/ProductService';

const ProductUpdate = ({ visible, onClose, productID }) => {
    const [productDescription, setProductDescription] = useState('');
    const [tankNumber, setTankNumber] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            if (productID) {
                try {
                    const productData = await fetchProductByID(productID);
                    if (productData) {
                        setProductDescription(productData.description);
                        setTankNumber(productData.tank_no.toString());
                        setCurrentPrice(productData.current_price.toString());
                    }
                } catch (error) {
                    console.error("Error fetching product:", error);
                }
            }
        };


        loadProduct();
    }, [productID]);

    const formatPrice = (price) => {
        const numericPrice = parseFloat(price);
        return numericPrice.toFixed(2);
    };

    const handleSubmit = async () => {
        try {
            const formattedPrice = formatPrice(currentPrice);
            const updatedProduct = new Product(productID, productDescription, tankNumber, formattedPrice);
            await updateProduct(updatedProduct);

            setProductDescription('');
            setTankNumber('');
            setCurrentPrice('');


            setAlertVisible(true);
        } catch (e) {
            console.error("Error updating product:", e);
        }
    };

    const handleAlertConfirm = () => {
        setAlertVisible(false);
        onClose();
    };

    const fields = [
        {
            mode: 'outlined',
            label: 'Product ID',
            value: productID,
            disabled: true

        },
        {
            mode: 'outlined',
            label: 'Product Name',
            value: productDescription,
            onChangeText: setProductDescription,
            validation: (value) => !value.trim() ? "Product Name is required" : null
        },
        {
            mode: 'outlined',
            label: 'Tank Number',
            value: tankNumber,
            onChangeText: (text) => {
                // Ensure only integers are inputted
                if (/^\d*$/.test(text)) {
                    setTankNumber(Number(text));
                }
            },
            keyboardType: 'numeric',
            validation: (value) => !value.trim() ? "Tank Number is required" : null
        },
        {
            mode: 'outlined',
            label: 'Current Price',
            value: currentPrice,
            onChangeText: (text) => {
                // Ensure that the text entered is a valid number
                if (/^\d*\.?\d*$/.test(text)) {
                    setCurrentPrice(text);
                }
            },
            keyboardType: 'numeric',
            validation: (value) => !value.trim() ? "Current Price is required" : null
        },
    ];

    return (
        <>
            <ModalForm
                visible={visible}
                onClose={onClose}
                title="Update Product"
                fields={fields}
                onSubmit={handleSubmit}
                submitButtonLabel="Update"
                secondaryButtonLabel="Deactivate"
                onSecondaryAction={() => console.log("Product deactivated")}
                action="update"
                entity="product"
            />

            <CustomAlert
                visible={alertVisible}
                onConfirm={handleAlertConfirm}
                action="update"
                entity="Product"
            />
        </>

    );
};

export default ProductUpdate;
