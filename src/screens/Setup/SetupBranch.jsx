import React, { useState } from 'react';
import { View, Image, Alert } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { addBranch } from '../../services/BranchService';
import styles from './setup.styles';

const SetupBranch = ({ navigation }) => {
    const [branchID, setID] = useState('');
    const [branchName, setName] = useState('');
    const [branchAddress, setAddress] = useState('');
    const [error, setError] = useState({ branchName: '', branchAddress: '' });

    const handleProceed = () => {
        let valid = true;

        const newError = { branchID: '', branchName: '', branchAddress: '' };

        if (!branchID) {
            newError.branchID = 'Branch ID is required!';
            valid = false;
        }

        if (!branchName) {
            newError.branchName = 'Branch Name is required!';
            valid = false;
        }

        if (!branchAddress) {
            newError.branchAddress = 'Branch Address is required!';
            valid = false;
        }

        if (valid) {
            // Show confirmation alert
            Alert.alert(
                "Confirm Details",
                `Are you sure you want to proceed with the entered details?\n\nBranch Name:${branchName}\nBranch Address:${branchAddress}`,
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancelled"),
                        style: "cancel"
                    },
                    {
                        text: "OK",
                        onPress: () => {
                            insertBranch();
                            navigation.navigate('SetupComplete');
                        }
                    }
                ]
            );
        } else {
            setError(newError);
        }
    };

    const insertBranch = async () => {
        await addBranch(branchID, branchName, branchAddress);
    }
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/fire-icon.png')} style={styles.image} />
            <Text style={styles.title}>Setup Gas Station Branch</Text>
            <Text style={styles.description}>
                Please enter <Text style={styles.bold}>Branch</Text> Name and Address to proceed.
            </Text>

            <TextInput
                label="Branch ID"
                value={branchID}
                onChangeText={setID}
                style={styles.input}
                mode="outlined"
                error={!!error.branchID}
            />
            {error.branchID ? (
                <Text style={styles.errorText}>{error.branchID}</Text>
            ) : null}

            <TextInput
                label="Branch Name"
                value={branchName}
                onChangeText={setName}
                style={styles.input}
                mode="outlined"
                error={!!error.branchName}
            />
            {error.branchName ? (
                <Text style={styles.errorText}>{error.branchName}</Text>
            ) : null}

            <TextInput
                label="Branch Address"
                value={branchAddress}
                onChangeText={setAddress}
                style={styles.input}
                mode="outlined"
                error={!!error.branchAddress}
            />
            {error.branchAddress ? (
                <Text style={styles.errorText}>{error.branchAddress}</Text>
            ) : null}
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

export default SetupBranch;
