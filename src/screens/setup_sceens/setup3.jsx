import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import styles from './setup.styles';

const Setup3 = ({ navigation }) => {
    const [branchName, setName] = useState('');
    const [branchAddress, setAddress] = useState('');

    const handleProceed = () => {
        navigation.navigate('SetupComplete');
    };

    return (
        <View style={styles.container}>

            {/* Fire Icon */}
            <Image
                source={require('../../../assets/fire-icon.png')}
                style={styles.image}
            />

            {/* Main Text */}
            <Text style={styles.title}>Setup Gas Station Branch</Text>
            <Text style={styles.description}>
                Please enter <Text style={styles.bold}>Branch</Text> Name and
                Address to proceed.
            </Text>

            <TextInput
                label="Branch Name"
                value={branchName}
                onChangeText={setName}
                style={styles.input}
                mode="outlined"
            />

            <TextInput
                label="Branch Address"
                value={branchAddress}
                onChangeText={setAddress}
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

export default Setup3;
