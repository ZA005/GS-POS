import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F2F2F2',
        borderRadius: 5,
        padding: 15,
        marginVertical: 8,
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardSection: {
        marginBottom: 8,
    },
    label: {
        fontSize: 12,
        color: 'black',
        fontWeight: '500',
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#071952',
    },
    currentPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#071952',
    },
    lastUpdated: {
        fontSize: 14,
        color: '#071952',
        fontWeight: '500',
    },
});

export default styles;
