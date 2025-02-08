import React, { useState } from 'react';
import ModalForm from './Modal/ModalForm';
import { addProduct } from '../services/Product/ProductService';
import CustomAlert from './Alert/CustomAlert';
import Product from '../models/Product';

const ProductAdd = ({ visible, onClose }) => {
    const [productID, setProductID] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [tankNumber, setTankNumber] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);

    const formatPrice = (price) => {
        const numericPrice = parseFloat(price);
        return numericPrice.toFixed(2);
    };

    const handleSubmit = async () => {
        try {
            const formattedPrice = formatPrice(currentPrice);
            // console.log('PRICE', formattedPrice);
            const newProduct = new Product(productID, productDescription, tankNumber, formattedPrice);
            await addProduct(newProduct);
            // console.log("Product added:", { productDescription, tankNumber, currentPrice });


            setProductDescription('');
            setTankNumber('');
            setCurrentPrice('');

            setAlertVisible(true);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const handleProductIDChange = (text) => {
        if (text.length <= 2) {
            setProductID(text);
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
            onChangeText: handleProductIDChange,
            validation: (value) => !value.trim() ? "ProductID is required" : null
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
            onChangeText: setTankNumber,
            keyboardType: 'numeric',
            validation: (value) => !value.trim() ? "Tank Number is required" : null
        },
        {
            mode: 'outlined',
            label: 'Current Price',
            value: currentPrice,
            onChangeText: (text) => {
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
                title="Add New Product"
                fields={fields}
                onSubmit={handleSubmit}
                buttonType='submit'
                action="add"
                entity="product"
            />

            <CustomAlert
                visible={alertVisible}
                onConfirm={handleAlertConfirm}
                action="add"
                entity="product"
            />
        </>

    );
};

export default ProductAdd;
