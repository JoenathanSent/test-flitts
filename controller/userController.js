const { generateToken } = require("../helpers/jwt");
const { pwdValidation } = require("../helpers/bcryptjs");
const { Users } = require("../models");

class UserController {
  static async register(req, res, next) {
    const { name, email, password } = req.body;
    const newUser = {
      name,
      email,
      password,
    };
    try {
      const user = await Users.create(newUser);
      res.status(201).json({
        code: 201,
        message: "Success create account",
        name: user.name,
        email: user.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await Users.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw { name: "Fail Login", message: "Wrong email / password!" };
      }

      const isMatch = pwdValidation(password, user.password);
      if (!isMatch) {
        throw { name: "Fail Login", message: "Wrong email / password!" };
      }

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
      };
      const token = generateToken(payload);
      res.status(200).json({
        code: 200,
        message: "Success Login",
        name: user.name,
        email: user.email,
        access_token: token,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = UserController;
