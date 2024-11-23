import React from 'react';
import { View, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import styles from './setup.styles';

const SetupComplete = ({ navigation }) => {
    const handleProceed = () => {
        navigation.navigate('setup2'); // Adjust navigation as needed
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* Fire Icon */}
                <Image
                    source={require('../../../assets/fire-icon.png')} // Replace with your fire icon
                    style={styles.image}
                />

                {/* Main Text */}
                <Text style={styles.title}>Setup Complete!</Text>
                <Text style={styles.description}>
                    Initial setup is <Text style={styles.bold}>complete</Text>! The application
                    is now ready to use. You can always update your settings later from the application
                    management menu.
                </Text>
            </View>

            {/* Proceed Button */}
            <Button
                mode="contained"
                style={styles.button}
                onPress={handleProceed}
            >
                FINISH
            </Button>
        </View>
    );
};

export default SetupComplete;
