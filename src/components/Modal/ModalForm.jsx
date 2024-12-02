import React, { useState } from 'react';
import { Modal, View, Alert, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, TextInput } from 'react-native-paper';
import styles from './modal.styles';

const ModalForm = ({
    visible,
    onClose,
    title,
    fields,
    onSubmit,
    buttonType = 'submit',
    secondaryButtonLabel,
    onSecondaryAction,
    action,
    entity,
}) => {
    const [errors, setErrors] = useState({});
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

    const validateFields = () => {
        const newErrors = {};
        fields.forEach((field, index) => {
            if (field.validation) {
                const errorMessage = field.validation(field.value);
                if (errorMessage) {
                    newErrors[index] = errorMessage;
                }
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = () => {
        if (!validateFields()) return;

        if (buttonType === 'submit') {
            // If buttonType is 'submit', show confirmation dialog
            Alert.alert(
                "Confirm Action",
                `Are you sure you want to ${action} this ${entity}?`,
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "OK",
                        onPress: () => {
                            onSubmit();
                        },
                    },
                ]
            );
        } else if (buttonType === 'login') {
            if (!validateFields()) {
                return;
            }
            onSubmit();
        }
    };

    return (
        <>
            <Modal
                visible={visible}
                animationType="fade"
                transparent={true}
                onRequestClose={onClose}
            >
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>{title}</Text>

                        {fields.map((field, index) => (
                            <View key={index}>
                                {field.isDropdown ? (
                                    <View style={styles.dropdownContainer}>
                                        <DropDownPicker
                                            open={openDropdownIndex === index}
                                            setOpen={(isOpen) =>
                                                setOpenDropdownIndex(isOpen ? index : null)
                                            }
                                            value={field.value}
                                            setValue={field.onChangeText}
                                            items={field.options.map((option) => ({
                                                label: option,
                                                value: option,
                                            }))}
                                            placeholder={field.placeholder}
                                            style={styles.dropdown}
                                            dropDownContainerStyle={styles.dropdownBox}
                                        />
                                        {errors[index] && (
                                            <Text style={styles.errorText}>{errors[index]}</Text>
                                        )}
                                    </View>
                                ) : (
                                    <View>
                                        <TextInput
                                            style={[
                                                styles.input,
                                                field.editable === false && { color: 'gray' }
                                            ]}
                                            mode={field.mode}
                                            label={field.label}
                                            placeholder={field.placeholder}
                                            value={field.value}
                                            onChangeText={(text) => {
                                                if (field.onChangeText) {
                                                    field.onChangeText(text);
                                                } else {
                                                    console.error(`onChangeText is not defined for field: ${field.placeholder}`);
                                                }
                                                setErrors((prev) => ({ ...prev, [index]: null }));
                                            }}
                                            secureTextEntry={field.secureTextEntry}
                                            keyboardType={field.keyboardType || 'default'}
                                            editable={field.editable !== undefined ? field.editable : true}
                                            disabled={field.disabled || false}

                                        />
                                        {errors[index] && (
                                            <Text style={styles.errorText}>{errors[index]}</Text>
                                        )}
                                    </View>
                                )}
                            </View>
                        ))}

                        <View style={styles.buttonContainer}>
                            <Button
                                mode="contained"
                                onPress={handleFormSubmit}
                                style={styles.submitButton}
                            >
                                {buttonType === 'submit' ? 'Submit' : 'Login'}
                            </Button>

                            {secondaryButtonLabel && onSecondaryAction && (
                                <Button
                                    mode="outlined"
                                    onPress={onSecondaryAction}
                                    style={styles.deactivateButton}
                                    textColor="#071952"
                                >
                                    {secondaryButtonLabel}
                                </Button>
                            )}

                            <Button
                                mode="text"
                                onPress={onClose}
                                style={styles.cancelButton}
                                textColor="#071952"
                            >
                                Cancel
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default ModalForm;
