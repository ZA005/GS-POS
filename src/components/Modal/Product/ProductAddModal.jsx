import React, { useState } from 'react';
import ModalForm from '../ModalForm';
import { addProduct } from '../../../services/Product/ProductService';
import CustomAlert from '../../Alert/CustomAlert';
import Product from '../../../models/Product';

const ProductAdd = ({ visible, onClose }) => {
    const [productID, setProductID] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [tankNumber, setTankNumber] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');

    const formatPrice = (price) => {
        const numericPrice = parseFloat(price);
        return numericPrice.toFixed(2);
    };

    const handleSubmit = async () => {
        try {
            const formattedPrice = formatPrice(currentPrice);
            const newProduct = new Product(productID, productDescription, tankNumber, formattedPrice);
            const success = await addProduct(newProduct);

            if (!success) {
                setAlertMessage("A product with this description or tank number already exists.");
                setAlertType("error");
            } else {
                setAlertMessage("Product successfully added!");
                setAlertType("success");

                setProductID('');
                setProductDescription('');
                setTankNumber('');
                setCurrentPrice('');
            }

            setAlertVisible(true);
        } catch (error) {
            console.error("Error adding product:", error);
            setAlertMessage("An unexpected error occurred. Please try again.");
            setAlertType("error");
            setAlertVisible(true);
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
                message={alertMessage}
                type={alertType}
            />

        </>

    );
};

export default ProductAdd;
