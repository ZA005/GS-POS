import React, { useCallback } from 'react';
import { View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Text, Divider, IconButton } from 'react-native-paper';
import LoginModal from '../../components/Modal/Login/LoginModal';
import useManagementNavigation from '../../hooks/useManagementNavigation';
import ManagementOption from '../../components/ManagementOption';
import styles from './management.styles';

const Management = ({ navigation }) => {
    const {
        isLoginModalVisible,
        selectedType,
        handleLoginAndNavigation,
        handleLoginClose,
    } = useManagementNavigation(navigation);

    return (
        <ScrollView contentContainerStyle={styles.container} stickyHeaderIndices={[0]}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Management</Text>
                </View>

                <ManagementOption
                    icon="account-cog"
                    label="Admin Management"
                    onPress={useCallback(() => handleLoginAndNavigation('Admin'), [])}
                />
                <ManagementOption
                    icon="check-circle"
                    label="Checker Management"
                    onPress={useCallback(() => handleLoginAndNavigation('Checker'), [])}
                />
                <ManagementOption
                    icon="cash"
                    label="Cashier Management"
                    onPress={useCallback(() => handleLoginAndNavigation('Cashier'), [])}
                />
            </View>

            <LoginModal
                visible={isLoginModalVisible}
                onClose={handleLoginClose}
                type={selectedType}
            />
        </ScrollView>
    );
};

export default Management;
