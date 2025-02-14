import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#FDF6E4',
        height: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00224E',
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FDF6E4',
    },
    backButton: {
        margin: 0,
        padding: 0,
    },
    searchContainer: {
        paddingHorizontal: 10,
        marginBottom: 8,
    },
    searchBar: {
        height: 55,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: "#FFF",
    },
    iconButton: {
        backgroundColor: "#002855",
        borderRadius: 28,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        // borderTopColor: 'gray',
        // borderTopWidth: 1,
        position: 'relative',
        bottom: 0,
        width: '100%',
        backgroundColor: '#FDF6E4',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
    },
    buttonLabel: {
        // marginTop: 8,
        fontSize: 10,
        color: '#00224E',
        textAlign: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 8,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    modalDivider: {
        marginVertical: 10,
    },
    modalContent: {
        maxHeight: 400,
    },
    modalButton: {
        marginTop: 15,
        borderRadius: 5
    },
    productContainer: {
        padding: 10,
        backgroundColor: '#f9f9f9',
        marginBottom: 8,
        borderRadius: 8,
    },
    priceInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        marginTop: 8,
        backgroundColor: '#FFF',
    },


    productItem: {
        backgroundColor: '#FFF',
        padding: 12,
        marginVertical: 6,
        borderRadius: 6,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00224E',
    },
    productPrice: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
    transactionContainer: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    transactionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#00224E',
    },
    transactionDivider: {
        marginVertical: 5,
    },
    transactionText: {
        fontSize: 16,
        color: '#333',
        marginTop: 3,
    },
    noTransactionText: {
        justifyContent: 'center',
        textAlign: 'center'
    }
});

export default styles;
