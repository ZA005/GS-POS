import * as SQLite from 'expo-sqlite';

const dbName = 'test12.db'

export const openDatabase = async () => {
    try {
        const db = await SQLite.openDatabaseAsync(dbName, { useNewConnection: true });
        const [{ user_version }] = await db.getAllAsync('PRAGMA user_version;');

        if (user_version < 3) {
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

                CREATE TABLE IF NOT EXISTS customers(
                    customer_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                    fullname TEXT NOT NULL,
                    home_address TEXT NOT NULL,
                    mobile_no TEXT NOT NULL CHECK(LENGTH(mobile_no) = 11)
                );

                CREATE TABLE IF NOT EXISTS transactions(
                    transaction_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                    start_date TEXT NOT NULL,
                    start_time TEXT NOT NULL,
                    cut_off_date TEXT NOT NULL,
                    cut_off_time TEXT NOT NULL,
                    is_closed INTEGER NOT NULL DEFAULT 1
                );

                CREATE TABLE IF NOT EXISTS transaction_prices(
                    tp_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                    transaction_id INTEGER NOT NULL,
                    product_id CHAR(2) NOT NULL,
                    price REAL NOT NULL,
                    FOREIGN KEY(transaction_id) REFERENCES transactions(transaction_id),
                    FOREIGN KEY(product_id) REFERENCES products(product_id)
                );

                INSERT INTO users (username,password,fullname,user_type,is_active)
                SELECT 'admin','admin123','Administrator','0','1'
                WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin');

                PRAGMA user_version = 3;
            `);
        } else if (user_version === 2) {
            // If upgrading from v2 → v3, just ALTER TABLE instead of recreating it
            await db.execAsync(`
                ALTER TABLE transactions ADD COLUMN is_closed INTEGER NOT NULL DEFAULT 1;
                PRAGMA user_version = 3;
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