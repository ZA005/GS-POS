import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, IconButton, Divider } from 'react-native-paper';
import styles from '../screens/Management/management.styles';

const ManagementOption = ({ icon, label, onPress }) => (
    <>
        <TouchableOpacity style={styles.option} onPress={onPress}>
            <View style={styles.iconTextContainer}>
                <IconButton icon={icon} size={30} iconColor="#00224E" />
                <Text style={styles.optionText}>{label}</Text>
            </View>
        </TouchableOpacity>
        <Divider style={styles.divider} />
    </>
);

export default ManagementOption;
