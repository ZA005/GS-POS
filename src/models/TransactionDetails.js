import Transaction from "./Transaction";
import Product from "./Product";
export default class TransactionProduct {
    constructor(
        tp_id,
        transaction,
        product,
        price
    ) {
        if (!(transaction instanceof Transaction)) {
            throw new Error("Invalid Transaction Object!")
        }

        if (!(product instanceof Product)) {
            throw new Error("Invalid Product Object!")
        }
        this._tp_id = tp_id;
        this._transaction = transaction;
        this._product = product;
        this._price = price;
    }

    // GETTER
    getTpId() {
        return this._tp_id;
    }

    getTransaction() {
        return this._transaction;
    }

    getProduct() {
        return this._product;
    }

    getPrice() {
        return this._price;
    }

    // SETTER
    setTpId(tp_id) {
        this._tp_id = tp_id;
    }

    setTransaction(transaction) {
        if (!(transaction instanceof Transaction)) {
            throw new Error("Invalid Transaction object.");
        }
        this._transaction_id = transaction;
    }

    setProductId(product) {
        if (!(product instanceof Product)) {
            throw new Error("Invalid Product object.");
        }
        this._product = product;
    }

    setPrice(price) {
        this._price = price;
    }
}
