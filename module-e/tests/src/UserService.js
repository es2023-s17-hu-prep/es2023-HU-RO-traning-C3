class UserService {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    user.id = this.users.length + 1;
    this.users.push(user);
    return user;
  }

  getUserById(id) {
    return this.users.find((user) => user.id === id);
  }
}
module.exports = new UserService();
