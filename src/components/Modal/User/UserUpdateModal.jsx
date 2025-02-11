import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import ModalForm from '../ModalForm';
import CustomAlert from '../../Alert/CustomAlert';
import User from '../../../models/User';
import { getUserByID, updateUser, switchStatus } from '../../../services/User/UserService';

const UserUpdate = ({ visible, onClose, userId }) => {
    const [userData, setUserData] = useState(null);
    const [fullName, setFullName] = useState('');
    const [userType, setUserType] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);


    useEffect(() => {
        const loadUser = async () => {
            if (userId) {
                try {
                    const fetchedUserData = await getUserByID(userId);
                    if (fetchedUserData) {
                        setUserData(fetchedUserData);
                        setFullName(fetchedUserData.fullname);
                        setUserType(convertIntUserTypeToString(fetchedUserData.user_type));
                        setUsername(fetchedUserData.username);
                    }
                } catch (error) {
                    console.error("Error fetching User:", error);
                }
            }
        };

        loadUser();
    }, [userId]);


    const convertIntUserTypeToString = (intUserType) => {
        switch (intUserType) {
            case (0):
                return 'Admin';
            case (1):
                return 'Checker';
            case (2):
                return 'Cashier';
            default:
                return null;
        }
    }

    const convertUserTypeToInt = (type) => {
        switch (type) {
            case 'Admin':
                return 0;
            case 'Checker':
                return 1;
            case 'Cashier':
                return 2;
            default:
                return null;
        }
    };

    const handleSubmit = async () => {
        try {
            const userTypeInt = convertUserTypeToInt(userType);
            const updatedUser = new User(userId, username, password, fullName, userTypeInt, userData.is_active);
            await updateUser(updatedUser)
            setAlertVisible(true);
        } catch (e) {
            console.error("Error updating user:", e);
        }

        setFullName('');
        setUserType('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    };

    const handleToggleStatus = async () => {
        if (!userData) return;

        if (userId === 1) {
            Alert.alert("Error", "You cannot deactivate this account.");
            return; // Prevent further execution
        }

        const action = userData.is_active ? "deactivate" : "activate";
        const confirmationMessage = `Are you sure you want to ${action} ${userData.fullname}?`;

        Alert.alert(
            `Confirm ${action.charAt(0).toUpperCase() + action.slice(1)}`,
            confirmationMessage,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK",
                    onPress: async () => {
                        try {
                            await switchStatus(userData);
                            const successMessage = `${userData.fullname} has been ${action}d.`;
                            Alert.alert("Success", successMessage);
                            onClose(); // Close modal and refresh parent state
                        } catch (error) {
                            console.error(`Error switching status to ${action}:`, error);
                            Alert.alert("Error", `Failed to ${action} user. Please try again.`);
                        }
                    },
                },
            ]
        );
    };


    const handleAlertConfirm = () => {
        setAlertVisible(false);
        onClose();
    };

    const fields = [
        {
            mode: 'outlined',
            label: 'Fullname',
            value: fullName,
            onChangeText: setFullName,
            validation: (value) => !value.trim() ? "Fullname is required" : null
        },
        {
            placeholder: 'User Type',
            value: userType,
            onChangeText: setUserType,
            isDropdown: true,
            options: ['Admin', 'Checker', 'Cashier'],
            validation: (value) => !value.trim() ? "User Type is required" : null
        },
        {
            mode: 'outlined',
            label: 'Username',
            value: username,
            onChangeText: setUsername,
            validation: (value) => !value.trim() ? "Username is required" : null
        },
        {
            mode: 'outlined',
            label: 'Password',
            value: password,
            onChangeText: setPassword,
            secureTextEntry: true,
            validation: (value) => value.length < 6 ? "Password must be at least 6 characters" : null
        },
        {
            mode: 'outlined',
            label: 'Confirm Password',
            value: confirmPassword,
            onChangeText: setConfirmPassword,
            secureTextEntry: true,
            validation: (value) => value !== password ? "Passwords do not match" : null
        },
    ];

    return (
        <>
            <ModalForm
                visible={visible}
                onClose={onClose}
                title="Update User"
                fields={fields}
                onSubmit={handleSubmit}
                submitButtonLabel="Update"
                secondaryButtonLabel={userData?.is_active ? "Deactivate" : "Activate"}
                onSecondaryAction={handleToggleStatus}
                action="update"
                entity="User"
            />


            <CustomAlert
                visible={alertVisible}
                onConfirm={handleAlertConfirm}
                action="update"
                entity="User"
            />
        </>

    );
};

export default UserUpdate;
