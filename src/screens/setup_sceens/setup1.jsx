import React from 'react';
import { View, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import styles from './setup.styles';

const Setup1 = ({ navigation }) => {
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
