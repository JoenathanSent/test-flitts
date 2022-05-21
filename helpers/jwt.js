const jwt = require("jsonwebtoken");
const secretCode = process.env.SECRET;
const generateToken = (payload) => {
  return jwt.sign(payload, secretCode);
};

const verifyToken = (token) => {
  return jwt.verify(token, secretCode);
};

module.exports = {
  generateToken,
  verifyToken,
};
