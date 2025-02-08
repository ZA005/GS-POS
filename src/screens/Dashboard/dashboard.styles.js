import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FDF6E4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00224E',
        textAlign: 'center',
        marginVertical: 16,
    },
    titleContainer: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        // backgroundColor: '#FDF6E4',
    },
    loadingText: {
        fontSize: 16,
        color: '#00224E',
        textAlign: 'center',
        marginVertical: 16,
    },

    noDataText: {
        fontSize: 16,
        color: '#00224E',
        textAlign: 'center',
        marginVertical: 16,
    },
});

export default styles;
