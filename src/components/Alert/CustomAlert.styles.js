import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alertContainer: {
        width: '90%',
        padding: 20,
        backgroundColor: '#FEFBEA',
        borderRadius: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    iconContainer: {
        backgroundColor: '#071952',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#071952',
    },
    message: {
        fontSize: 14,
        color: '#071952',
        textAlign: 'center',
        marginBottom: 20,
    },
    confirmButton: {
        backgroundColor: '#071952',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
});

export default styles;