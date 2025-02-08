import React, { useState } from 'react';
import ModalForm from '../ModalForm';
import { getUser } from '../../../services/User/UserService'
import { Alert } from 'react-native';

const LoginModal = ({ visible, onClose, type }) => {
    const [userType, setUserType] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const convertStringTypeToInt = (type) => {
        switch (type) {
            case ('Admin'):
                return 0;
            case ('Checker'):
                return 1;
            case ('Cashier'):
                return 2;
            default:
                return null
        }
    }
    const handleSubmit = async () => {
        if (type === userType || userType === 'Admin') {
            const user = await getUser(username, password, convertStringTypeToInt(type));
            if (user) {
                console.log(username, password, type)
                clearFields()
                onClose(true)
            } else {
                Alert.alert(
                    'Login Failed',
                    'The username or password you entered is incorrect. Please double-check your credentials and try again.'
                );
                clearFields()
            }
        } else {
            Alert.alert(
                "Access Restricted",
                `This section is accessible only to ${type} accounts. Please ensure you are logging in with the correct credentials.`,
                [
                    {
                        text: "OK",
                        onPress: () => {
                            clearFields(); // Clear the fields when the alert is dismissed
                        },
                    },
                ]
            );

        }
    };

    const clearFields = () => {
        setUserType('')
        setUsername('')
        setPassword('')
    }

    const handleCancel = () => {
        clearFields()
        onClose(false)
    }
    const fields = [
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
            validation: (value) => !value.trim() ? "Password is required" : null
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