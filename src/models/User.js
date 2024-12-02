export default class User {
    constructor(userId, username, password, fullname, userType, isActive) {
        this._user_id = userId;
        this._username = username;
        this._password = password;
        this._fullname = fullname;
        this._user_type = userType;
        this._is_active = isActive;
    }

    // GETTERS
    getId() {
        return this._user_id;
    }

    getUsername() {
        return this._username;
    }

    getPassword() {
        return this._password;
    }

    getFullname() {
        return this._fullname;
    }

    getUserType() {
        return this._user_type;
    }

    getIsActive() {
        return this._is_active;
    }

    // SETTERS
    setId(userId) {
        this._user_id = userId;
    }

    setUsername(username) {
        this._username = username;
    }

    setPassword(password) {
        this._password = password;
    }

    setFullname(fullname) {
        this._fullname = fullname;
    }

    setUserType(userType) {
        this._user_type = userType;
    }

    setIsActive(isActive) {
        this._is_active = isActive;
    }
}
