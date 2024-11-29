import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 20,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#071952',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    buttonContainer: {
        display: ' flex',
    },
    submitButton: {
        borderRadius: 5,
        backgroundColor: '#071952',
        width: '100%',
        marginBottom: 10,
    },
    deactivateButton: {
        borderRadius: 5,
        marginBottom: 10,
    },
    cancelButton: {
        width: '100%',
        borderRadius: 5,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },

    dropdown: {
        // backgroundColor: '#f1f1f1',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginVertical: 10,
    },
    dropdownBox: {
        // backgroundColor: '#fff',
        borderColor: '#ccc',
    },
    dropdownContainer: {
        marginBottom: 15,
    },
});

export default styles;