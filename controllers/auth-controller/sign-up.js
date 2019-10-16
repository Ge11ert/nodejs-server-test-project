module.exports = async function signUp(userService, req, res) {
  const userCredentials = req.body;

  try {
    userService.ensureCredentials(userCredentials);
  } catch (error) {
    return res.send({ status: 'invalidCredentials', error: error.message });
  }

  try {
    const existingUser = await userService.getUserByEmail(userCredentials.email);

    if (existingUser) {
      return res.send({ status: 'userExistsError' });
    }

    const session = await userService.createUser(userCredentials);

    const result = {
      access_token: session.access,
      expires_in: session.accessExpiresIn,
    };

    res.cookie('refresh_token', session.refresh, {
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    return res.json({ status: 'ok', result });
  } catch (e) {
    return res.send({ status: 'internalError', error: e.message });
  }
};
