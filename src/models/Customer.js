export default class Customer {
    constructor(customer_id, fullname, home_address, mobile_no) {
        this._customer_id = customer_id;
        this._fullname = fullname;
        this._home_address = home_address;
        this._mobile_no = mobile_no;
    }

    // GETTERS
    getCustomerId() {
        return this._customer_id;
    }

    getFullname() {
        return this._fullname;
    }

    getHomeAddress() {
        return this._home_address;
    }

    getMobileNo() {
        return this._mobile_no;
    }

    // SETTERS
    setCustomerId(customerId) {
        this._customer_id = customerId;
    }

    setFullname(fullname) {
        this._fullname = fullname;
    }

    setHomeAddress(homeAddress) {
        this._home_address = homeAddress;
    }

    setMobileNo(mobileNo) {
        this._mobile_no = mobileNo;
    }
}
