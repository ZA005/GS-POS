import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Text, IconButton, Divider } from 'react-native-paper';
import styles from './management.styles';

const TransactionManagement = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewInactive, setViewInactive] = useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <IconButton
                    icon="arrow-left"
                    size={30}
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                />
                <Text style={styles.title}>Transaction Management</Text>
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

            <View style={{ flex: 1 }}>
                <ScrollView>


                </ScrollView>
            </View>

            <View style={styles.footer}>
                {/* Add User Button */}
                <View style={styles.buttonContainer}>
                    <IconButton
                        icon="plus"
                        size={24}
                        onPress={() => { }}
                        style={styles.iconButton}
                        iconColor="white"
                    />
                    <Text style={styles.buttonLabel}>Start Transaction</Text>
                </View>

                {/* Toggle Active/Inactive Users Button */}
                <View style={styles.buttonContainer}>
                    <IconButton
                        // icon={viewInactive ? "account-off" : "account-check"}
                        icon="account-check"
                        size={24}
                        onPress={() => { }}
                        style={styles.iconButton}
                        iconColor="white"
                    />
                    <Text style={styles.buttonLabel}>{viewInactive ? "View Current T" : "View Logs"}</Text>
                </View>

            </View>
        </View>
    )
}

export default TransactionManagement;