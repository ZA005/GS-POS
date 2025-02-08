import { closeDatabase, openDatabase } from "../Database";
import Product from "../../models/Product";

export const fetchAllProducts = async () => {
    const db = await openDatabase()

    try {
        const result = await db.getAllAsync(
            'SELECT * FROM products'
        )

        // console.log('Database Fetch Result:', result);

        if (result && result.length > 0) {
            const products = result.map((productData) => new Product(
                productData.product_id,
                productData.description,
                productData.tank_no,
                productData.current_price
            ));

            return products
        }
        return [];
    } catch (e) {
        throw e
    } finally {
        if (db) closeDatabase(db);
    }
}

// export const fetchAllInActiveProducts = async () => {
//     const db = await openDatabase()

//     try {
//         const result = await db.getAllAsync(
//             'SELECT * FROM products WHERE isActive = 0'
//         )

//         // console.log('Database Fetch Result:', result);

//         if (result && result.length > 0) {
//             const products = result.map((productData) => new Product(
//                 productData.product_id,
//                 productData.description,
//                 productData.tank_no,
//                 productData.current_price
//             ));

//             return products
//         }
//         return [];
//     } catch (e) {
//         throw e
//     } finally {
//         if (db) closeDatabase(db)
//     }
// }

export const addProduct = async (product) => {
    const db = await openDatabase();
    try {
        // check for duplication
        const result = await db.getFirstAsync(
            'SELECT COUNT(*) AS count FROM products WHERE description = ?',
            [product.getDescription()]
        );

        if (result.count > 0) {
            console.log("Product already exists with product_id:", product._product_id);
            return false;
        }

        await db.runAsync(
            'INSERT INTO products (product_id ,description, tank_no, current_price) VALUES (?, ?, ?, ?)',
            [product._product_id, product.getDescription(), product.getTankNo(), product.getCurrentPrice()]
        );
        return true;
    } catch (e) {
        console.error("Error adding product:", e);
        throw e;
    } finally {
        if (db) closeDatabase(db);
    }
};

export const updateProduct = async (product) => {
    const db = await openDatabase();
    try {
        await db.runAsync(
            'UPDATE products SET description = ?, tank_no = ?, current_price = ? WHERE product_id = ?',
            [product.getDescription(), product.getTankNo(), product.getCurrentPrice(), product.getID()]
        );
        return true;
    } catch (e) {
        console.error("Error adding product:", e);
        throw e;
    } finally {
        if (db) closeDatabase(db);
    }
};

export const fetchProductByID = async (id) => {
    const db = await openDatabase()

    try {
        const product = await db.getFirstAsync(
            'SELECT * FROM products WHERE product_id = ?', [id])

        if (product) {
            return product
        }
        return null;
    } catch (e) {
        throw e
    } finally {
        if (db) closeDatabase(db)
    }
}