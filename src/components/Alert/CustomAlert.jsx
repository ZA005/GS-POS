import React from 'react';
import { Modal, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import styles from './CustomAlert.styles';

const CustomAlert = ({ visible, onConfirm, message, type }) => {
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
                        <Text style={[styles.icon, type === "error" ? styles.errorIcon : styles.successIcon]}>
                            {type === "error" ? "✖" : "✔"}
                        </Text>
                    </View>
                    <Text style={styles.title}>{type === "error" ? "Error" : "Success"}</Text>
                    <Text style={styles.message}>{message}</Text>
                    <Button
                        mode="contained"
                        onPress={onConfirm}
                        style={[styles.confirmButton, type === "error" ? styles.errorButton : styles.successButton]}
                        textColor="#fff"
                    >
                        OK
                    </Button>
                </View>
            </View>
        </Modal>
    );
};


export default CustomAlert;
