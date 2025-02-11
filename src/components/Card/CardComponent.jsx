import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import styles from './card.styles';

const CardComponent = ({ data }) => {
    return (
        <View style={styles.card}>
            <View style={styles.content}>
                {Object.entries(data).map(([key, value]) => (
                    <View style={styles.cardSection} key={key}>
                        <Text style={styles.label}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Text>
                        <Text style={styles.value}>
                            {typeof value === 'number' ? `₱ ${value}` : value}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default CardComponent;
