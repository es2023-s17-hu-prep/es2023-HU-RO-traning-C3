class UserService {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    user.id = this.users.length + 1;
    this.users.push(user);
    console.log('addUser', this.users)
    return user;
  }

  getUserById(id) {
    const user = this.users.find((user) => user.id === id);
    console.log('getUserById', user)
    return user;
  }
}
module.exports = new UserService();
