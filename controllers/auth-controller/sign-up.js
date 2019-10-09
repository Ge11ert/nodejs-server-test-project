module.exports = async function signUp(userService, req, res) {
  const userCredentials = req.body;

  try {
    userService.ensureCredentials(userCredentials);
  } catch (error) {
    return res.send({ status: 'invalidCredentials', error: error.message });
  }

  try {
    const existingUser = await userService.getUserByCredentials(userCredentials);

    if (existingUser) {
      return res.send({ status: 'userExistsError' });
    }

    const user = await userService.createUser(userCredentials);

    return res.json({ status: 'ok', user });
  } catch (e) {
    return res.send({ status: 'internalError' });
  }
};
