"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helpers/bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT NAME",
          },
          notNull: {
            msg: "PLEASE INSERT NAME",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          message: "Email has been registered",
        },
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT EMAIL",
          },
          notNull: {
            msg: "PLEASE INSERT EMAIL",
          },
          isEmail: {
            args: true,
            msg: "Not a valid email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT PASSWORD",
          },
          notNull: {
            msg: "PLEASE INSERT PASSWORD",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Users",
      hooks: {
        beforeCreate: (data, options) => {
          const hashedPwd = hash(data.password);
          data.password = hashedPwd;
        },
        beforeUpdate: (data, options) => {
          const hashedPwd = hash(data.password);
          data.password = hashedPwd;
        },
      },
    }
  );
  return Users;
};
