import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Divider, IconButton } from 'react-native-paper';
import styles from './management.styles';

const Management = ({ navigation }) => {
    const handleNavigation = (screen) => {
        navigation.navigate(screen);
    };

    return (
        <ScrollView contentContainerStyle={styles.container} stickyHeaderIndices={[0]}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Management</Text>
                </View>

                <TouchableOpacity style={styles.option} onPress={() => handleNavigation('AdminManagement')}>
                    <View style={styles.iconTextContainer}>
                        <IconButton
                            icon="account-cog"
                            size={30}
                            iconColor="#00224E" // Navy color
                        />
                        <Text style={styles.optionText}>Admin Management</Text>
                    </View>
                </TouchableOpacity>

                <Divider style={styles.divider} />

                <TouchableOpacity style={styles.option} onPress={() => handleNavigation('ProductPriceManagement')}>
                    <View style={styles.iconTextContainer}>
                        <IconButton
                            icon="currency-usd"
                            size={30}
                            iconColor="#00224E" // Navy color
                        />
                        <Text style={styles.optionText}>Product Price Management</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>

    );
};

export default Management;
