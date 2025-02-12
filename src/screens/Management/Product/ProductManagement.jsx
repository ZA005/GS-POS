import React, { useState, useEffect } from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { Text, IconButton, Divider } from 'react-native-paper';
import ProductUpdate from '../../../components/Modal/Product/ProductUpdateModal';
import ProductAdd from '../../../components/Modal/Product/ProductAddModal';
import { fetchAllProducts } from '../../../services/Product/ProductService';
import styles from '../management.styles';

const ProductManagement = ({ navigation }) => {
    const [productToEdit, setProductToEdit] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalType, setModalType] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [viewInactive, setViewInactive] = useState(false);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const fetchedProducts = await fetchAllProducts();
            setProducts(fetchedProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    // const loadInActiveProducts = async () => {

    // }

    useEffect(() => {
        loadProducts();
    }, []);


    const filteredProducts = products.filter((product) =>
        (product.getDescription() || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    // console.log('Filtered Products:', filteredProducts);

    const handleEdit = (productID) => {
        setModalType("edit");
        setProductToEdit(productID);
    };

    const handleAdd = () => {
        setModalType("add");
    };

    const handleCloseModal = (isUpdated) => {

        if (isUpdated) {
            loadProducts();
        }

        setModalType(null);
        setProductToEdit(null);
    };

    return (
        <View style={styles.container}>
            {/* Fixed Title */}
            <View style={styles.titleContainer}>
                <IconButton
                    icon="arrow-left"
                    size={30}
                    iconColor="#00224E"
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                />
                <Text style={styles.title}>Product Management</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    style={styles.searchBar}
                />
            </View>

            {/* Scrollable Content */}
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {loading ? (
                        <Text style={styles.loadingText}>Loading products...</Text>
                    ) : filteredProducts.length === 0 ? (
                        <Text style={styles.noDataText}>No products available.</Text>
                    ) : (
                        filteredProducts.map((product, index) => (
                            <View key={index} style={styles.itemContainer}>
                                <View style={styles.userItem}>
                                    <View>
                                        <Text style={styles.userName}>{product.getDescription()}</Text>
                                        <Text style={styles.userType}>Tank: {product.getTankNo()}</Text>
                                    </View>
                                    <IconButton
                                        icon="pencil"
                                        size={20}
                                        onPress={() => handleEdit(product.getID())}
                                        style={styles.editButton}
                                    />
                                </View>
                                <Divider />
                            </View>
                        ))
                    )}
                </ScrollView>
            </View>


            {/* Add User Button */}
            <View style={styles.footer}>
                {/* Add User Button */}
                <View style={styles.buttonContainer}>
                    <IconButton
                        icon="plus"
                        size={24}
                        onPress={handleAdd}
                        style={styles.iconButton}
                        iconColor="white"
                    />
                    <Text style={styles.buttonLabel}>Add</Text>
                </View>

                {/* Toggle Active/Inactive Users Button */}
                {/* <View style={styles.buttonContainer}>
                    <IconButton
                        icon={viewInactive ? "archive-off" : "archive-check"}
                        size={24}
                        onPress={() => setViewInactive(!viewInactive)}
                        style={styles.iconButton}
                        iconColor="white"
                    />
                    <Text style={styles.buttonLabel}>{viewInactive ? "Inactive" : "Active"}</Text>
                </View> */}
            </View>

            {modalType === "add" && (
                <ProductAdd
                    visible={true}
                    onClose={() => handleCloseModal(true)}
                />
            )}

            {modalType === "edit" && productToEdit && (
                <ProductUpdate
                    visible={true}
                    onClose={() => handleCloseModal(true)}
                    productID={productToEdit}
                />
            )}
        </View>
    );
};

export default ProductManagement;
