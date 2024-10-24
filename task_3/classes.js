export {LastVisit, LastVisitStorage, formatDate, formatTime}

class LastVisit {
    _name = '';
    _time = 0;

    constructor(name= '', time = 0) {
        this.setName(name);
        this.setTime(time);
    }

    getName(value) {
        return this._name;
    }

    setName(value) {
        this._name = value;
    }

    getTime(value) {
        return this._time;
    }

    setTime(value) {
        if (typeof value === 'string')
            value = parseInt(value);

        if (typeof value === 'number') {
            this._time = value;
        }
    }

    setNow() {
        this._time = Date.now();
    }

    getDate() {
        return new Date(this._time);
    }

    isEmpty() {
        return this._time === 0;
    }

    setVisit(name) {
        this.setName(name);
        this.setNow();
    }

    clear() {
        this._name = '';
        this._time = 0;
    }
}

class LastVisitStorage {
    static save(value) {
        window.localStorage.setItem('LastVisit_name', value.getName());
        window.localStorage.setItem('LastVisit_time', value.getTime());
    }

    static getLastVisit() {

        const name = window.localStorage.getItem('LastVisit_name');
        const time = window.localStorage.getItem('LastVisit_time');

        const lastVisit = new LastVisit(name, time);

        return lastVisit;
    }
}

function pad_start(value, n = 2) {
    return value.toString().padStart(n, '0');
}

function formatDate(date) {
    return pad_start(date.getDate()) + '.' + 
        pad_start(date.getMonth() + 1) + '.' + 
        date.getFullYear();
}

function formatTime(date) {
    return pad_start(date.getHours()) + ':' + 
        pad_start(date.getMinutes());
}
