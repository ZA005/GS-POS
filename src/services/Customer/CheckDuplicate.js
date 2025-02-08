const checkDuplicate = async (db, customers) => {
    try {
        // Fetch all existing customers at once
        const existingCustomers = await db.getAllAsync("SELECT fullname, mobile_no FROM customers");

        // Store existing customers in a Set for quick lookups
        const existingSet = new Set(existingCustomers.map(c => `${c.fullname}-${c.mobile_no}`));

        // Identify duplicates in the provided customer list
        const duplicates = customers.filter(customer =>
            existingSet.has(`${customer.getFullname()}-${customer.getMobileNo()}`)
        );

        return duplicates; // Return list of duplicates (empty if none)
    } catch (error) {
        console.error('Error checking for duplicates:', error);
        return [];
    }
};

export default checkDuplicate;
