class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  ensureCredentials(userCredentials) {
    const { email, password } = userCredentials;
    if (!email || !password) {
      throw new Error('You must provide email and password');
    }
  }

  getUserByCredentials(creds) {
    return this.getUserByEmail(creds.email);
  }

  getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      this.userModel.findOne({ email }, (err, user) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(user);
      });
    });
  }

  createUser(credentials) {
    const User = this.userModel;
    const user = new User(credentials);

    return new Promise((resolve, reject) => {
      user.save((err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(user);
      });
    });
  }
}

module.exports = UserService;
