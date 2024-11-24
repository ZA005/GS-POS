import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import styles from './setup.styles';
import { runDatabase } from '../../services/Database';

const Setup1 = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const runDB = async () => {
            try {
                await runDatabase();
                setLoading(false); // Database opened successfully
            } catch (e) {
                setLoading(false); // Database failed to open
                setError('Error initializing the database. Please try again.');
                console.error(e);
            }
        };

        runDB();
    }, []);

    const handleProceed = () => {
        navigation.navigate('Setup2');
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* Fire Icon */}
                <Image
                    source={require('../../../assets/fire-icon.png')}
                    style={styles.image}
                />

                {/* Main Text */}
                <Text style={styles.title}>Let’s get started</Text>
                <Text style={styles.description}>
                    Initial setup is <Text style={styles.bold}>required</Text>. Please enter
                    the necessary data to configure the app. This can be updated later.
                </Text>
                <Text style={styles.note}>
                    This action requires an <Text style={styles.bold}>Admin Authentication</Text>
                </Text>
            </View>

            {/* Proceed Button */}
            <Button
                mode="contained"
                style={styles.button}
                onPress={handleProceed}
            >
                PROCEED
            </Button>
        </View>
    );
};

export default Setup1;
