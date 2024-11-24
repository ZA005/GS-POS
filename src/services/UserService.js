import { openDatabase, closeDatabase } from "./Database";

export const getAdmin = async (username, password) => {
    let db;
    try {
        db = await openDatabase();
        const adminAccount = await db.getFirstAsync(
            'SELECT * FROM users WHERE username = ? AND password = ? AND user_type = 0',
            [username, password]
        );

        return adminAccount;
    } catch (e) {
        throw e;
    } finally {
        if (db) {
            closeDatabase(db);
        }
    }
}