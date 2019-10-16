const jwt = require('jsonwebtoken');
const config = require('../config');

function generateJWT(userId) {
  const { secret } = config.jwt;
  const now = Date.now();
  const accessExpiresIn = now + 60 * 60 * 1000; // 60 m | 1h in ms
  const refreshExpiresIn = now + 10 * 24 * 60 * 60 * 1000; // 10d in ms

  // iat claim generates automatically
  const accessToken = jwt.sign({
    sub: userId,
    exp: Math.floor(accessExpiresIn / 1000), // in s
  }, secret);

  const refreshToken = jwt.sign({
    sub: userId,
    exp: Math.floor(refreshExpiresIn / 1000), // in s
  }, secret);

  return {
    access: accessToken,
    refresh: refreshToken,
    accessExpiresIn,
  };
}

module.exports = {
  generateJWT,
};
