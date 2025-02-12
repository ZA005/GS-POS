import { closeDatabase, openDatabase } from "../Database";
import Transaction from "../../models/Transaction";

export const startTransaction = async (transaction) => {
    const db = await openDatabase();
    try {
        console.log(transaction)
        await db.runAsync('INSERT INTO [transactions] (start_date,start_time,cut_off_date, cut_off_time,is_closed) VALUES (?,?,?,?,1)', [transaction._start_date, transaction._start_time, "", ""]);
        console.log("TEST run")
        return true;
    } catch (e) {
        console.error("Error adding product:", e);
        throw e
    } finally {
        if (db) closeDatabase(db);
    }
}

export const cutOffTransaction = async (transaction) => {
    const db = await openDatabase();
    try {
        await db.runAsync(
            `UPDATE transaction
            SET cut_off_date = ?, cut_off_time = ?, is_closed = 0
            WHERE id = ?`,
            [transaction.getCutOffDate(), transaction.getCutOffTime(), transaction.getId()]
        );

        return true;
    } catch (e) {
        throw e;
    } finally {
        if (db) closeDatabase(db);
    }
};

export const getOngoingTransaction = async () => {
    const db = await openDatabase();
    try {
        const result = await db.getFirstAsync('SELECT * FROM "transactions" WHERE is_closed = 1 ORDER BY transaction_id DESC LIMIT 1');
        if (result) {
            return new Transaction(result.transaction_id, result.start_date, result.start_time, result.cut_off_date, result.cut_off_time, result.is_closed);
        }
        return null;
    } catch (e) {
        console.error("Error fetching ongoing transaction:", e);
        throw e;
    } finally {
        if (db) closeDatabase(db);
    }
};
