import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import styles from './card.styles';

const CardComponent = ({ productName, currentPrice, lastUpdated }) => {
    return (
        <View style={styles.card}>
            <View style={styles.content}>
                <View style={styles.cardSection}>
                    <Text style={styles.label}>Product Name</Text>
                    <Text style={styles.label}>Current Price</Text>
                </View>
                <View style={styles.cardSection}>
                    <Text style={styles.productName}>{productName}</Text>
                    <Text style={styles.currentPrice}>₱ {currentPrice}</Text>
                </View>

                <Text style={styles.label}>Last Price Updated</Text>
                <Text style={styles.lastUpdated}>{lastUpdated}</Text>
            </View>

        </View>
    );
};

export default CardComponent;