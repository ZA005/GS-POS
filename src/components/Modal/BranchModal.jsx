import React from 'react';
import { View, TextInput, Modal } from 'react-native';
import { Text, Button } from 'react-native-paper';
import styles
    from './modal.styles';
const BranchModal = ({ visible, onClose, onSubmit }) => {
    const [branchName, setBranchName] = React.useState('');
    const [branchAddress, setBranchAddress] = React.useState('');

    const handleSubmit = () => {
        onSubmit({ branchName, branchAddress });
        setBranchName('');
        setBranchAddress('');
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Update Branch</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Branch Name"
                        value={branchName}
                        onChangeText={setBranchName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Branch Address"
                        value={branchAddress}
                        onChangeText={setBranchAddress}
                    />
                    <View style={styles.buttonContainer}>
                        <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
                            Update
                        </Button>
                        <Button mode="text" onPress={onClose} style={styles.cancelButton} textColor='#071952'>
                            Cancel
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default BranchModal;