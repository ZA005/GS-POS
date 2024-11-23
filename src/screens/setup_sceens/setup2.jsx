import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import styles from './setup.styles';

const Setup2 = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleProceed = () => {
        if (username && password) {
            navigation.navigate('Setup3');
        } else {
            console.log('Please fill in all fields');
        }
    };

    return (
        <View style={styles.container}>

            {/* Fire Icon */}
            <Image
                source={require('../../../assets/fire-icon.png')}
                style={styles.image}
            />

            {/* Main Text */}
            <Text style={styles.title}>Login</Text>
            <Text style={styles.description}>
                Please enter <Text style={styles.bold}>Admin</Text> Username and
                Password to proceed.
            </Text>

            <TextInput
                label="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                mode="outlined"
            />

            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                mode="outlined"
                secureTextEntry
            />

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

export default Setup2;
