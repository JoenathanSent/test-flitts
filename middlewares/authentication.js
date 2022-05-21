const { verifyToken } = require("../helpers/jwt");
const { Users } = require("../models");
const authentication = async (req, res, next) => {
  const { access_token } = req.headers;
  try {
    const payload = verifyToken(access_token);
    const { name, id, email } = payload;
    const user = await Users.findOne({
      where: { name, id, email },
    });
    if (!user) {
      throw { name: "Invalid Token", message: `Invalid Token!` };
    }
    req.login = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = authentication;
