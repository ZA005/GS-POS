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
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FDF6E4',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
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
    backButton: {
        margin: 0,
        padding: 0,
    },

    // UserManagement

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
    scrollContent: {
        // flexGrow: 1,
        // paddingBottom: 10, // Space for footer buttons
    },
    itemContainer: {
        width: '100%',
        padding: '15',
    },
    userItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'red',
        paddingBottom: '10'
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#00224E'
    },
    userType: {
        fontSize: 14,
        color: "#00224E",
    },
    editButton: {
        marginLeft: 8,
    },
    toggleButton: {
        position: "absolute",
        bottom: 85,
        right: 16,
        borderWidth: 4,
        borderColor: "#002855",
        borderRadius: 50,
        width: 56,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
    },
    iconButton: {
        backgroundColor: "#002855",
        borderRadius: 28,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: "#002855",
        borderRadius: 28,
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: "#FFF",
        fontSize: 24,
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

    // Customer Managment

    customerName: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#00224E'
    },

    customerDetailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ///////////////////////////////////////
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
});

export default styles;
