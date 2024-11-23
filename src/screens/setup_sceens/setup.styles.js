import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF8E1',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    content: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#071952',
        textAlign: 'center',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: '#071952',
        textAlign: 'center',
        marginBottom: 10,
        lineHeight: 22,
        marginLeft: 50,
        marginRight: 50
    },
    note: {
        fontSize: 14,
        color: '#071952',
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 30,
        marginLeft: 50,
        marginRight: 50
    },
    bold: {
        fontWeight: 'bold',
        color: '#071952'
    },
    button: {
        width: "100%",
        borderRadius: 5,
        backgroundColor: '#071952',
    },
    input: {
        width: '100%',
        marginBottom: 16,
    },
});

export default styles;
