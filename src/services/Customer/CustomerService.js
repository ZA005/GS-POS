import { openDatabase, closeDatabase } from "../Database";
import Customer from "../../models/Customer";
import checkDuplicate from "./CheckDuplicate";

/**
 * Uploads customers to the database.
 * Returns an object with either { success: true } or { error: "error message" }.
 */
export const uploadCustomers = async (customers) => {
    const db = await openDatabase();

    try {
        // Check for duplicates before inserting
        const duplicates = await checkDuplicate(db, customers);

        if (duplicates.length > 0) {
            // Reject entire batch and return duplicate list
            const errorMessages = duplicates.map(c => `Duplicate customer: ${c.getFullname()}`);
            return { error: `Upload failed. The following customers already exist:\n${errorMessages.join("\n")}` };
        }

        // If no duplicates, proceed with insertion
        const values = customers.map(c => `('${c.getFullname()}', '${c.getHomeAddress()}', '${c.getMobileNo()}')`).join(",");
        await db.runAsync(`INSERT INTO customers (fullname, home_address, mobile_no) VALUES ${values}`);

        return { success: true };
    } catch (error) {
        return { error: "Error inserting customers into the database. Please try again." };
    } finally {
        if (db) closeDatabase(db);
    }
};

/**
 * Fetches all customers from the database.
 * Returns an array of Customer objects or an error message.
 */
export const fetchCustomers = async () => {
    const db = await openDatabase();
    try {
        const results = await db.getAllAsync('SELECT * FROM customers');
        return results.map(row => new Customer(row.customer_id, row.fullname, row.home_address, row.mobile_no));
    } catch (error) {
        return { error: "Error fetching customers from the database. Please try again." };
    } finally {
        if (db) closeDatabase(db);
    }
};
