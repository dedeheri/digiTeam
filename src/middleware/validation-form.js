const { body } = require("express-validator");

function validation(prop) {
  switch (prop) {
    case "REGISTRATION": {
      return [
        body("username")
          .notEmpty()
          .withMessage("Username tidak boleh kosong")
          .custom((value) => !/\s/.test(value))
          .withMessage("Username tidak boleh mengandung spasi"),
        body("role").notEmpty().withMessage("role tidak boleh kosong"),
      ];
    }

    case "LOGIN": {
      return [
        body("username").notEmpty().withMessage("Nama tidak boleh kosong"),
        body("password")
          .notEmpty()
          .withMessage("Kata sandi tidak boleh kosong"),
      ];
    }

    default:
      return prop;
  }
}

module.exports = validation;
