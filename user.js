const users = require("./users.json");

class User {
  static records = users;

  constructor(params) {
    this.id = this._generateId();
    this.name = params.name;
    this.email = params.email;
    this.password = params.password;
    this.is_active = params.is_active;
  }

  _generateId() {
    const lastRecordId = this.constructor.records.length;
    return lastRecordId + 1;
  }

  static create(params) {
    const user = new this(params);

    this.records.push(user);

    return user;
  }

  static find(id) {
    const user = this.records.find((data) => data.id === Number(id));

    if (!user) {
      return "User Is Not Found.";
    }
    return user;
  }

  static list() {
    return this.records;
  }

  static update(id, payload) {
    const user = this.records.find((data) => data.id === Number(id));

    if (user !== undefined) {
      user.id = id;
      user.name = payload.name;
      user.email = payload.email;
      user.password = payload.password;
      user.is_active = payload.is_active;
      return user;
    } else {
      return "User Can't Update!";
    }
  }

  static delete(id) {
    const user = this.records.filter((data) => data.id !== Number(id));

    if (user !== undefined) {
      return user;
    } else {
      return "Cant Delete user";
    }
  }
}

module.exports = User;
