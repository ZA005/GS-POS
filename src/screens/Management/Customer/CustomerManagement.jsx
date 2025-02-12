import React, { useState, useEffect } from 'react';
import { View, ScrollView, TextInput, Alert } from 'react-native';
import { Text, IconButton, Divider, ActivityIndicator } from 'react-native-paper';
import useUploadCustomers from '../../../hooks/useUploadCustomers';
import { fetchCustomers } from '../../../services/Customer/CustomerService';
import styles from '../management.styles';

const CustomerManagement = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { pickFile, uploading, error, successMessage } = useUploadCustomers();

    // Fetch customers from the database
    const loadCustomers = async () => {
        setLoading(true);
        try {
            const fetchedCustomers = await fetchCustomers();
            setCustomers(fetchedCustomers);
        } catch (err) {
            console.error('Error fetching customers:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    // Refresh the list on success or error
    useEffect(() => {
        if (successMessage) {
            Alert.alert("Success", successMessage, [{ text: "OK", onPress: loadCustomers }]);
        }
        if (error && error.length > 0) {
            Alert.alert("Error", error.join("\n"));
        }
    }, [successMessage, error]);


    // Filter customers based on search query
    const filteredCustomers = customers.filter(customer =>
        (customer.getFullname() || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                <Text style={styles.title}>Customer Management</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search customers..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={styles.searchBar}
                />
            </View>

            {/* Upload Status */}
            {uploading && <ActivityIndicator animating={true} size="small" />}

            {/* Scrollable Content */}
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {loading ? (
                        <Text style={styles.loadingText}>Loading customers...</Text>
                    ) : filteredCustomers.length === 0 ? (
                        <Text style={styles.noDataText}>No customers available.</Text>
                    ) : (
                        filteredCustomers.map((customer, index) => (
                            <View key={index} style={styles.itemContainer}>
                                <View style={styles.userItem}>
                                    <View>
                                        <Text style={styles.customerName}>{customer.getFullname().toUpperCase()}</Text>
                                        <Text style={styles.userType}>{customer.getHomeAddress()}</Text>
                                        <Text style={styles.userType}>{customer.getMobileNo()}</Text>
                                    </View>
                                    <IconButton
                                        icon="pencil"
                                        size={20}
                                        onPress={() => { }}
                                        style={styles.editButton}
                                    />
                                </View>
                                <Divider />
                            </View>
                        ))
                    )}
                </ScrollView>
            </View>

            {/* Footer Buttons */}
            <View style={styles.footer}>
                {/* Upload Customers */}
                <View style={styles.buttonContainer}>
                    <IconButton
                        icon="upload"
                        size={24}
                        onPress={pickFile}
                        style={styles.iconButton}
                        iconColor="white"
                        disabled={uploading}
                    />
                    <Text style={styles.buttonLabel}>Upload Customers</Text>
                </View>
            </View>
        </View>
    );
};

export default CustomerManagement;
