const bcrypt = require("bcryptjs");

const hash = (plainPassword) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainPassword, salt);
};

const pwdValidation = (pwd, hashedPwd) => {
  return bcrypt.compareSync(pwd, hashedPwd);
};

module.exports = {hash, pwdValidation};