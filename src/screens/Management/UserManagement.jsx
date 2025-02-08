import React, { useState, useEffect } from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { Text, IconButton, Divider } from 'react-native-paper';
import UserAdd from '../../components/UserAddModal';
import UserUpdate from '../../components/UserUpdateModal';
import { fetchAllActiveUser, fetchAllInActiveUser } from '../../services/User/UserService';
import styles from './management.styles';

const UserManagement = ({ navigation }) => {
    const [userToEdit, setUserToEdit] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalType, setModalType] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewInactive, setViewInactive] = useState(false); // State for toggling active/inactive users

    const loadActiveUsers = async () => {
        setLoading(true);
        try {
            const fetchedUsers = await fetchAllActiveUser();
            setUsers(fetchedUsers);
        } catch (e) {
            console.error("Error fetching users:", e);
        } finally {
            setLoading(false);
        }
    };

    const loadInActiveUsers = async () => {
        setLoading(true);
        try {
            const fetchedUsers = await fetchAllInActiveUser();
            setUsers(fetchedUsers);
        } catch (e) {
            console.error("Error fetching users:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (viewInactive) {
            loadInActiveUsers();
        } else {
            loadActiveUsers();
        }
    }, [viewInactive]);

    const filteredUsers = users.filter((user) =>
        (user.getFullname() || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (userID) => {
        setUserToEdit(userID);
        setModalType("edit");
    };

    const handleAdd = () => {
        setModalType("add");
    };

    const handleCloseModal = (isUpdated) => {
        if (isUpdated) {
            viewInactive ? loadInActiveUsers() : loadActiveUsers();
        }
        setModalType(null);
        setUserToEdit(null);
    };

    const getUserTypeLabel = (userType) => {
        switch (userType) {
            case 0:
                return "Admin";
            case 1:
                return "Checker";
            case 2:
                return "Cashier";
            default:
                return "UNKNOWN";
        }
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
                <Text style={styles.title}>User Management</Text>
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
                        <Text style={styles.loadingText}>Loading users...</Text>
                    ) : filteredUsers.length === 0 ? (
                        <Text style={styles.noDataText}>No users available.</Text>
                    ) : (
                        filteredUsers.map((user, index) => (
                            <View key={index} style={styles.itemContainer}>
                                <View style={styles.userItem}>
                                    <View>
                                        <Text style={styles.userName}>{user.getFullname().toUpperCase()}</Text>
                                        <Text style={styles.userType}>{getUserTypeLabel(user.getUserType())}</Text>
                                    </View>
                                    <IconButton
                                        icon="pencil"
                                        size={20}
                                        onPress={() => handleEdit(user.getId())}
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
                <View style={styles.buttonContainer}>
                    <IconButton
                        icon={viewInactive ? "account-off" : "account-check"}
                        size={24}
                        onPress={() => setViewInactive(!viewInactive)}
                        style={styles.iconButton}
                        iconColor="white"
                    />
                    <Text style={styles.buttonLabel}>{viewInactive ? "Inactive" : "Active"}</Text>
                </View>
            </View>

            {modalType === "add" && (
                <UserAdd
                    visible={true}
                    onClose={() => handleCloseModal(true)}
                />
            )}

            {modalType === "edit" && userToEdit && (
                <UserUpdate
                    visible={true}
                    onClose={() => handleCloseModal(true)}
                    userId={userToEdit}
                />
            )}
        </View>
    );
};

export default UserManagement;
