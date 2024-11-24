import * as SQLite from 'expo-sqlite';

const dbName = 'GAS_POS_DB.db'

export const openDatabase = async () => {
    try {
        const db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });
        const [{ user_version }] = await db.getAllAsync('PRAGMA user_version;');

        if (user_version < 1) {
            await db.execAsync(`
                PRAGMA journal_mode = WAL;
                PRAGMA foreign_keys = ON;

                CREATE TABLE IF NOT EXISTS users(
                    user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                    username TEXT NOT NULL,
                    password TEXT NOT NULL,
                    fullname TEXT NOT NULL,
                    user_type INTEGER NOT NULL,
                    is_active INTEGER NOT NULL
                );

                CREATE TABLE IF NOT EXISTS products(
                    product_id CHAR(2) PRIMARY KEY NOT NULL,
                    description TEXT NOT NULL,
                    tank_no INTEGER NOT NULL,
                    current_price REAL NOT NULL
                );

                CREATE TABLE IF NOT EXISTS branch(
                    branch_id TEXT NOT NULL,
                    name TEXT NOT NULL,
                    address TEXT NOT NULL
                );

                INSERT INTO users (username,password,fullname,user_type,is_active)
                SELECT 'admin','admin123','Administrator','0','1'
                WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin');

                PRAGMA user_version = 1;
            `);
        }
        return db;
    } catch (e) {
        console.error('Error creating/opening database:', e);
        throw e;
    }
}

export const closeDatabase = (db) => {
    db.closeAsync();
};

export const runDatabase = async () => {
    let db;
    try {
        db = await openDatabase();
    } catch (e) {
        throw e;
    } finally {
        if (db) {
            closeDatabase(db);
        }
    }
}