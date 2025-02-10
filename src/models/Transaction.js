export default class Transaction {
    constructor(
        transaction_id,
        start_date,
        start_time,
        cut_off_date,
        cut_off_time,
        is_closed,
    ) {
        this._transaction_id = transaction_id;
        this._start_date = start_date;
        this._start_time = start_time;
        this._cut_off_date = cut_off_date;
        this._cut_off_time = cut_off_time;
        this._is_closed = is_closed;
    }

    getId() {
        return this._transaction_id;
    }

    getStartDate() {
        return this._start_date;
    }

    getStartTime() {
        return this._start_time;
    }

    getCutOffDate() {
        return this._cut_off_date;
    }

    getCutOffTime() {
        return this._cut_off_time;
    }

    getIsClosed() {
        return this._is_closed;
    }

    // SETTER
    setId(transaction_id) {
        this._transaction_id = transaction_id;
    }

    setStartDate(start_date) {
        this._start_date = start_date;
    }

    setStartTime(start_time) {
        this._start_time = start_time;
    }

    setCutOffDate(cut_off_date) {
        this._cut_off_date = cut_off_date;
    }

    setCutOffTime(cut_off_time) {
        this._cut_off_time = cut_off_time;
    }

    setIsClosed(is_closed) {
        this._is_closed = is_closed;
    }
}
