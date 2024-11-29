export default class Branch {
    constructor(branch_id, name, address) {
        this._branch_id = branch_id;
        this._name = name;
        this._address = address;
    }

    //GETTER
    getID() {
        return this._branch_id;
    }

    getName() {
        return this._name;
    }

    getAddress() {
        return this._address;
    }
    //SETTER
    setID(branch_id) {
        this._branch_id = branch_id;
    }

    setName(name) {
        this._name = name;
    }

    setAddress(address) {
        this._address = address;
    }
}