import React from 'react';
import { Modal, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import styles from './CustomAlert.styles';

const CustomAlert = ({ visible, onConfirm, action, entity }) => {
    const message = `You have successfully ${action}ed the ${entity}. You may still update this later on.`;

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onConfirm}
        >
            <View style={styles.overlay}>
                <View style={styles.alertContainer}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>✔</Text>
                    </View>
                    <Text style={styles.title}>Success</Text>
                    <Text style={styles.message}>{message}</Text>
                    <Button
                        mode="contained"
                        onPress={onConfirm}
                        style={styles.confirmButton}
                        textColor="#fff"
                    >
                        CONFIRM
                    </Button>
                </View>
            </View>
        </Modal>
    );
};

export default CustomAlert;
