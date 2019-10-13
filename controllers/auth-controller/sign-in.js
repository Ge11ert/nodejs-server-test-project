module.exports = async function signIn(userService, req, res) {
  const userCredentials = req.body;

  try {
    userService.ensureCredentials(userCredentials);
  } catch (error) {
    return res.send({ status: 'invalidCredentials', error: error.message });
  }

  try {
    const existingUser = await userService.getUserByCredentials(userCredentials);

    if (existingUser) {
      return res.send({ status: 'ok', result: existingUser });
    }

    return res.send({ status: 'notFound' });
  } catch (e) {
    return res.send({ status: 'internalError' });
  }
};
