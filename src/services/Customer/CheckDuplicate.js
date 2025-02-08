const checkDuplicate = async (db, fullname, mobile_no) => {
    try {
        const result = await db.getFirstAsync(
            'SELECT * FROM customers WHERE fullname = ? OR mobile_no = ?',
            [fullname, mobile_no]
        );
        return !!result; // Returns true if duplicate exists, false otherwise
    } catch (error) {
        console.error('Error checking for duplicate:', error);
        return false;
    }
};

export default checkDuplicate;
