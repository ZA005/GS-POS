import { openDatabase, closeDatabase } from "./Database";
import User from "../models/User";


export const getAdmin = async (username, password) => {
    let db;
    try {
        db = await openDatabase();
        const adminAccount = await db.getFirstAsync(
            'SELECT * FROM users WHERE username = ? AND password = ? AND user_type = 0 AND is_active = 1',
            [username, password]
        );

        if (adminAccount) {
            return adminAccount;
        }
        return null;
    } catch (e) {
        throw e;
    } finally {
        if (db) {
            closeDatabase(db);
        }
    }
}

export const getUser = async (username, password, userType) => {
    let db;
    try {
        db = await openDatabase();
        const userAccount = await db.getFirstAsync(
            'SELECT * FROM users WHERE username = ? AND password = ? AND user_type = ? AND is_active = 1',
            [username, password, userType]
        );
        console.log('Credentials', username, password, userType)
        console.log(userAccount)
        if (userAccount) {
            return userAccount;
        }
        return null;
    } catch (e) {
        throw e;
    } finally {
        if (db) {
            closeDatabase(db);
        }
    }
}

export const getUserByID = async (id) => {
    const db = await openDatabase();
    try {
        const user = await db.getFirstAsync(
            'SELECT * FROM users WHERE user_id = ?', [id]
        )

        if (user) {
            console.log('return true')
            return user;
        }
        console.log('error')
        return null;
    } catch (e) {
        throw e;
    } finally {
        if (db) closeDatabase(db)
    }
}

export const fetchAllActiveUser = async () => {
    const db = await openDatabase();

    try {
        const result = await db.getAllAsync(
            'SELECT * FROM users WHERE is_active = 1'
        );

        if (result && result.length > 0) {
            const users = result.map((userData) => new User(
                userData.user_id,
                userData.username,
                userData.password,
                userData.fullname,
                userData.user_type,
                userData.is_active
            ));

            return users;
        }

        return [];
    } catch (e) {
        throw e;
    } finally {
        if (db) closeDatabase(db);
    }
};

export const fetchAllInActiveUser = async () => {
    const db = await openDatabase();

    try {
        const result = await db.getAllAsync(
            'SELECT * FROM users WHERE is_active = 0'
        );

        if (result && result.length > 0) {
            const users = result.map((userData) => new User(
                userData.user_id,
                userData.username,
                userData.password,
                userData.fullname,
                userData.user_type,
                userData.is_active
            ));

            return users;
        }

        return [];
    } catch (e) {
        throw e;
    } finally {
        if (db) closeDatabase(db);
    }
};


export const addUser = async (user) => {
    const db = await openDatabase();

    try {
        await db.runAsync(
            'INSERT INTO users (username,password,fullname, user_type, is_active) VALUES (?,?,?,?,1)',
            [user.getUsername(), user.getPassword(), user.getFullname(), user.getUserType()]
        );
        return true;
    } catch (e) {
        throw e;
    } finally {
        if (db) closeDatabase(db);
    }
};


export const updateUser = async (user) => {
    const db = await openDatabase();
    console.log(user)
    try {
        await db.runAsync(
            'UPDATE users SET username = ?, password = ?, fullname = ?, user_type = ? WHERE user_id = ?',
            [user._username, user._password, user._fullname, user._user_type, user._user_id]
        )

        return true;
    } catch (e) {
        throw e;
    } finally {
        if (db) closeDatabase(db)
    }
}

export const switchStatus = async (user) => {
    const db = await openDatabase();
    const deactivateStatement = 'UPDATE users SET is_active = 0 WHERE user_id = ?'
    const activateStatement = 'UPDATE users SET is_active = 1 WHERE user_id = ?'
    try {
        if (user.is_active == 1) {
            // DEACTIVATING USER
            await db.runAsync(
                deactivateStatement, [user.user_id]
            )

            return true;
        }
        // ACTIVATING USER
        await db.runAsync(
            activateStatement, [user.user_id]
        )


    } catch (e) {
        throw e;
    } finally {
        if (db) closeDatabase(db)
    }
}