import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Text, Divider, IconButton } from 'react-native-paper';
import LoginModal from '../../components/LoginModal';
import styles from './management.styles';

const Management = ({ navigation }) => {
    const [isLoginModalVisible, setLoginModalVisible] = useState(false);
    const [selectedType, setSelectedType] = useState('');

    const handleLoginAndNavigation = (type) => {
        setSelectedType(type);
        setLoginModalVisible(true);
    };

    const handleLoginClose = (isAuthenticated) => {
        setLoginModalVisible(false);

        // Only proceed if the user is authenticated
        if (isAuthenticated) {
            if (selectedType === 'Checker' || selectedType === 'Cashier') {
                // Display alert for unfinished features
                Alert.alert(
                    "Feature in Development",
                    `The ${selectedType} Management feature is currently under development. Stay tuned for updates!`,
                    [
                        { text: "OK", style: "default" }
                    ]
                );
            } else if (selectedType === 'Admin') {
                // Navigate to AdminManagement if Admin
                navigation.navigate('AdminManagement');
            }
        }
    };


    return (
        <ScrollView contentContainerStyle={styles.container} stickyHeaderIndices={[0]}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Management</Text>
                </View>

                {/* Admin Management */}
                <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleLoginAndNavigation('Admin')}
                >
                    <View style={styles.iconTextContainer}>
                        <IconButton
                            icon="account-cog"
                            size={30}
                            iconColor="#00224E"
                        />
                        <Text style={styles.optionText}>Admin Management</Text>
                    </View>
                </TouchableOpacity>

                <Divider style={styles.divider} />

                {/* Example: Future Checker Management */}
                <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleLoginAndNavigation('Checker')}
                >
                    <View style={styles.iconTextContainer}>
                        <IconButton
                            icon="check-circle"
                            size={30}
                            iconColor="#00224E"
                        />
                        <Text style={styles.optionText}>Checker Management</Text>
                    </View>
                </TouchableOpacity>

                <Divider style={styles.divider} />

                {/* Example: Future Cashier Management */}
                <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleLoginAndNavigation('Cashier')}
                >
                    <View style={styles.iconTextContainer}>
                        <IconButton
                            icon="cash"
                            size={30}
                            iconColor="#00224E"
                        />
                        <Text style={styles.optionText}>Cashier Management</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <LoginModal
                visible={isLoginModalVisible}
                onClose={(isAuthenticated) => handleLoginClose(isAuthenticated)}
                type={selectedType}
            />
        </ScrollView>
    );
};

export default Management;
