export default class Product {

    constructor(id, description, tank_no, current_price) {
        this._product_id = id;
        this._description = description;
        this._tank_no = tank_no;
        this._current_price = current_price;
    }

    //GETTER
    getID() {
        return this._product_id
    }
    getDescription() {
        return this._description;
    }

    getTankNo() {
        return this._tank_no
    }
    getCurrentPrice() {
        return this._current_price
    }

    //SETTER
    setID(id) {
        this._product_id = id;
    }
    setDescription(description) {
        this._description = description;
    }

    setTankNo(tank_no) {
        this._tank_no = tank_no;
    }
    setCurrentPrice(current_price) {
        this._current_price = current_price;
    }

}