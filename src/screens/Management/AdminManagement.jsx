import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Text, IconButton, Divider } from 'react-native-paper';
import styles from './management.styles';
import BranchUpdate from '../../components/Modal/Branch/BranchUpdateModal';

const AdminManagement = ({ navigation }) => {
    const [isBranchModalVisible, setBranchModalVisible] = React.useState(false);

    const handleNavigation = (screen) => {
        if (navigation) {
            navigation.navigate(screen);
        } else {
            console.warn("Navigation prop not provided");
        }
    };

    return (
        <View style={styles.container}>
            {/* Fixed Title */}
            <View style={styles.titleContainer}>
                <IconButton
                    icon="arrow-left"
                    size={30}
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                />
                <Text style={styles.title}>Admin Management</Text>
            </View>

            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity style={styles.option} onPress={() => setBranchModalVisible(true)}>
                    <View style={styles.iconTextContainer}>
                        <IconButton
                            icon="map-marker"
                            size={30}
                            iconColor="#00224E" // Navy color
                        />
                        <Text style={styles.optionText}>Branch Management</Text>
                    </View>
                </TouchableOpacity>

                <Divider style={styles.divider} />

                <TouchableOpacity style={styles.option} onPress={() => handleNavigation('UserManagement')}>
                    <View style={styles.iconTextContainer}>
                        <IconButton
                            icon="shield-account"
                            size={30}
                            iconColor="#00224E" // Navy color
                        />
                        <Text style={styles.optionText}>User Management</Text>
                    </View>
                </TouchableOpacity>

                <Divider style={styles.divider} />

                <TouchableOpacity style={styles.option} onPress={() => handleNavigation('ProductManagement')}>
                    <View style={styles.iconTextContainer}>
                        <IconButton
                            icon="notebook-edit"
                            size={30}
                            iconColor="#00224E" // Navy color
                        />
                        <Text style={styles.optionText}>Product Management</Text>
                    </View>
                </TouchableOpacity>

                <Divider style={styles.divider} />

                <TouchableOpacity style={styles.option} onPress={() => handleNavigation('CustomerManagement')}>
                    <View style={styles.iconTextContainer}>
                        <IconButton
                            icon="account-cash"
                            size={30}
                            iconColor="#00224E" // Navy color
                        />
                        <Text style={styles.optionText}>Customer Management</Text>
                    </View>
                </TouchableOpacity>

                <Divider style={styles.divider} />

                <TouchableOpacity style={styles.option} onPress={() => handleNavigation('TransactionManagement')}>
                    <View style={styles.iconTextContainer}>
                        <IconButton
                            icon="cash-multiple"
                            size={30}
                            iconColor="#00224E" // Navy color
                        />
                        <Text style={styles.optionText}>Transaction Management</Text>
                    </View>
                </TouchableOpacity>

                <Divider style={styles.divider} />
            </ScrollView>

            {/* Branch Modal */}
            <BranchUpdate
                visible={isBranchModalVisible}
                onClose={() => setBranchModalVisible(false)}
            />
        </View>
    );
};

export default AdminManagement;
