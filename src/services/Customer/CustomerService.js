import { openDatabase, closeDatabase } from "../Database";
import Customer from "../../models/Customer";
import checkDuplicate from "./CheckDuplicate";

export const uploadCustomers = async (customers) => {
    const db = await openDatabase();
    console.log('CUSTOMERS:', customers)
    try {
        for (const customer of customers) {
            const isDuplicate = await checkDuplicate(db, customer.getFullname(), customer.getMobileNo());

            if (!isDuplicate) {
                await db.runAsync(
                    'INSERT INTO customers (fullname, home_address, mobile_no) VALUES (?, ?, ?)',
                    [customer.getFullname(), customer.getHomeAddress(), customer.getMobileNo()]
                );
            } else {
                console.warn(`Duplicate customer found: ${customer.getFullname()}`);
            }
        }
    } catch (e) {
        throw e;
    } finally {
        if (db) closeDatabase(db);
    }
};

export const fetchCustomers = async () => {
    const db = await openDatabase();
    try {
        const results = await db.getAllAsync('SELECT * FROM customers');
        console.log('RESULTS', results)
        return results.map(row => new Customer(row.customer_id, row.fullname, row.home_address, row.mobile_no));
    } catch (e) {
        throw e;
    } finally {
        if (db) closeDatabase(db);
    }
};
