import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#FDF6E4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00224E',
        textAlign: 'center',
    },
    titleContainer: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#FDF6E4',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 35
    },
    iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#00224E',
        marginLeft: 8,
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 8,
    },
});

export default styles;
