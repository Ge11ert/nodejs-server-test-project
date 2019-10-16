const { generateJWT } = require('./jwt');

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
    return new Promise((resolve, reject) => {
      this.getUserByEmail(creds.email).then(async (user) => {
        const candidatePassword = creds.password;

        const isMatch = await user.comparePasswords(candidatePassword);

        if (isMatch) {
          return resolve(user);
        }
        return resolve(undefined);
      }).catch((e) => reject(e));
    });
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
    const userId = User.generateId();
    const jwtResult = generateJWT(userId);
    const user = new User({
      _id: userId,
      ...credentials,
      refreshToken: jwtResult.refresh,
    });

    return new Promise((resolve, reject) => {
      user.save((err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(jwtResult);
      });
    });
  }
}

module.exports = UserService;
