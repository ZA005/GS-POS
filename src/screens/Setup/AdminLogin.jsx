import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import styles from './setup.styles';
import { getAdmin } from '../../services/UserService';

const AdminLogin = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ username: '', password: '' });

    const handleProceed = async () => {
        let valid = true;
        const newError = { username: '', password: '', auth: '' };

        if (!username) {
            newError.username = 'Username is required';
            valid = false;
        }
        if (!password) {
            newError.password = 'Password is required';
            valid = false;
        }

        if (valid) {
            try {

                const adminAccount = await getAdmin(username, password);
                if (adminAccount) {
                    navigation.navigate('SetupBranch');
                } else {
                    newError.auth = 'Invalid username or password';
                    valid = false;
                    setError(newError);
                }
            } catch (e) {
                newError.form = 'Error verifying credentials. Please try again.';
                setError(newError);
                console.error(e);
            }
        } else {
            setError(newError);
        }
    };

    return (
        <View style={styles.container}>


            <Image
                source={require('../../../assets/fire-icon.png')}
                style={styles.image}
            />


            <Text style={styles.title}>Login</Text>
            <Text style={styles.description}>
                Please enter <Text style={styles.bold}>Admin</Text> Username and
                Password to proceed.
            </Text>


            {error.auth ? (
                <Text style={styles.errorText}>{error.auth}</Text>
            ) : null}
            <TextInput
                label="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                mode="outlined"
                error={!!error.username || !!error.auth}
            />
            {error.username ? (
                <Text style={styles.errorText}>{error.username}</Text>
            ) : null}

            {/* Password Input */}
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                mode="outlined"
                secureTextEntry
                error={!!error.password || !!error.auth}
            />
            {error.password ? (
                <Text style={styles.errorText}>{error.password}</Text>
            ) : null}

            {/* Proceed Button */}
            <Button
                mode="contained"
                style={styles.button}
                onPress={handleProceed}
            >
                CONFIRM
            </Button>
        </View>
    );
};

export default AdminLogin;
