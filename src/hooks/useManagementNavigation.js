import { useState } from 'react';
import { Alert } from 'react-native';

const useManagementNavigation = (navigation) => {
    const [isLoginModalVisible, setLoginModalVisible] = useState(false);
    const [selectedType, setSelectedType] = useState('');

    const handleLoginAndNavigation = (type) => {
        setSelectedType(type);
        setLoginModalVisible(true);
    };

    const handleLoginClose = (isAuthenticated) => {
        setLoginModalVisible(false);

        if (isAuthenticated) {
            if (selectedType === 'Checker' || selectedType === 'Cashier') {
                Alert.alert(
                    "Feature in Development",
                    `The ${selectedType} Management feature is currently under development. Stay tuned for updates!`,
                    [{ text: "OK", style: "default" }]
                );
            } else if (selectedType === 'Admin') {
                navigation.navigate('AdminManagement');
            }
        }
    };

    return {
        isLoginModalVisible,
        selectedType,
        handleLoginAndNavigation,
        handleLoginClose,
        setLoginModalVisible,
    };
};

export default useManagementNavigation;
