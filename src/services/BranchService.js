import { openDatabase, closeDatabase } from "./Database";
import Branch from "../models/Branch";

export const addBranch = async (id, name, address) => {
    const db = await openDatabase();
    try {
        await db.runAsync(
            'INSERT INTO branch ( branch_id ,name, address) VALUES ( ?, ?, ? )', [id, name, address]
        );
    } catch (e) {
        throw e;
    } finally {
        if (db)
            closeDatabase(db);
    }
}

export const fetchBranch = async () => {
    const db = await openDatabase();
    try {
        const result = await db.getFirstAsync(
            'SELECT branch_id, name, address FROM branch ORDER BY branch_id LIMIT 1'
        );

        if (result) {
            return new Branch(result.branch_id, result.name, result.address);
        }

        return null;
    } catch (e) {
        throw e;
    } finally {
        if (db)
            closeDatabase(db);
    }
}

export const updateBranch = async (branch) => {
    const db = await openDatabase();

    try {
        await db.runAsync(
            'UPDATE branch SET name = ?, address = ? WHERE branch_id = ?', [branch.getName(), branch.getAddress(), branch.getID()]
        );
        return true;
    } catch (e) {
        throw e;
    } finally {
        if (db) closeDatabase(db);
    }
}