import React, { useState } from 'react';
import ModalForm from './Modal/ModalForm';
import CustomAlert from './Alert/CustomAlert';
import { addUser } from '../services/UserService';
import User from '../models/User';

const UserAdd = ({ visible, onClose }) => {

    const [fullName, setFullName] = useState('');
    const [userType, setUserType] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);

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
            console.log("Full Name:", fullName);
            console.log("Username:", username);
            console.log("Password:", password);
            console.log("User Type:", userTypeInt);

            if (userTypeInt === null) {
                throw new Error('Invalid User Type');
            }
            const newUser = new User(null, username, password, fullName, userTypeInt, 1);
            await addUser(newUser);
        } catch (e) {
            console.error('Error adding user:', e);
        }
        setFullName('');
        setUserType('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');

        setAlertVisible(true);
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


    const handleAlertConfirm = () => {
        setAlertVisible(false);
        onClose();
    };

    return (
        <>
            <ModalForm
                visible={visible}
                onClose={onClose}
                title="Add New User"
                fields={fields}
                onSubmit={handleSubmit}
                submitButtonLabel="Add"
                action="add"
                entity="User"
            />

            <CustomAlert
                visible={alertVisible}
                onConfirm={handleAlertConfirm}
                action="add"
                entity="User"
            />
        </>

    );
};

export default UserAdd;
