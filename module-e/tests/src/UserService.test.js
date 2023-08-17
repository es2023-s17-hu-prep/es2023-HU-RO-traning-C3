// UserService.test.js

const UserService = require('./UserService');

describe('UserService', () => {
  beforeEach(() => {
    // Clear the users array before each test
    UserService.users.length = 0;
  });

  it('should add a user correctly', () => {
    const user = { name: 'John Doe' };
    const addedUser = UserService.addUser(user);
    expect(addedUser).toEqual({ id: 1, name: 'John Doe' });
  });

  it('should get a user by ID', () => {
    UserService.addUser({ name: 'John Doe' });
    const user = UserService.getUserById(1);
    expect(user).toEqual({ id: 1, name: 'John Doe' });
  });

  it('should return undefined for a non-existing user', () => {
    const user = UserService.getUserById(999);
    expect(user).toBeUndefined();
  });

});
