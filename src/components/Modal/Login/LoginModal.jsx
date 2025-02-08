import React, { useState, useEffect } from 'react';
import ModalForm from '../ModalForm';
import { getUser } from '../../../services/User/UserService';
import { Alert } from 'react-native';

const LoginModal = ({ visible, onClose, type }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');

    useEffect(() => {
        if (typeof type === 'string') {
            setUserType(type);
        }
    }, [type, visible]);

    const convertStringTypeToInt = (type) => {
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
        if (!username.trim() || !password.trim()) {
            Alert.alert('Error', 'Username and Password are required.');
            return;
        }

        const user = await getUser(username, password, convertStringTypeToInt(userType));

        if (user) {
            console.log(username, password, userType);
            clearFields();
            onClose(true);
        } else {
            Alert.alert(
                'Login Failed',
                'Incorrect username or password. Please try again.'
            );
            clearFields();
        }
    };

    const clearFields = () => {
        setUsername('');
        setPassword('');
    };

    const handleCancel = () => {
        clearFields();
        onClose(false);
    };

    const fields = [
        {
            mode: 'outlined',
            label: 'User Type',
            value: userType || '',
            editable: false,
        },
        {
            mode: 'outlined',
            label: 'Username',
            value: username,
            onChangeText: setUsername,
            validation: (value) => (!value.trim() ? 'Username is required' : null),
        },
        {
            mode: 'outlined',
            label: 'Password',
            value: password,
            onChangeText: setPassword,
            secureTextEntry: true,
            validation: (value) => (!value.trim() ? 'Password is required' : null),
        },
    ];

    return (
        <ModalForm
            visible={visible}
            onClose={handleCancel}
            title="Login"
            fields={fields}
            onSubmit={handleSubmit}
            buttonType="login"
        />
    );
};

export default LoginModal;