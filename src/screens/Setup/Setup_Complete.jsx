import React, { useEffect } from 'react';
import { View, Image, Alert, BackHandler } from 'react-native';
import { Text, Button } from 'react-native-paper';
import styles from './setup.styles';

const SetupComplete = ({ navigation }) => {
    const handleProceed = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
        });
    };

    useEffect(() => {
        const backAction = () => {
            Alert.alert(
                "Exit App",
                "Are you sure you want to quit the app?",
                [
                    { text: "No", style: "cancel" },
                    { text: "Yes", onPress: () => BackHandler.exitApp() }
                ]
            );
            return true;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();
    })

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* Fire Icon */}
                <Image
                    source={require('../../../assets/fire-icon.png')}
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
