const { validationResult } = require("express-validator");
const usersModel = require("../model/users");
const jwt = require("jsonwebtoken");

async function registration(req, res) {
  const username = req.body.username;
  const role = req.body.role;

  // validation input body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ message: errors.array() });
  }

  const user = await usersModel.findOne({ username });

  if (user) {
    return res.status(409).json({ message: "Username sudah terdaftar" });
  }

  function generetePassword() {
    let result = "";
    let length = 6;
    let patern =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < length; ++i) {
      result += patern.charAt(Math.floor(Math.random() * patern.length));
    }

    return result;
  }

  try {
    const data = await usersModel.create({
      username,
      role,
      password: generetePassword(),
    });

    return res.status(200).json({ result: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Terjadi Kesalahan" });
  }
}

async function login(req, res) {
  const password = req.body.password;
  const username = req.body.username;
  const users = await usersModel.findOne({ username });

  // validasi input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() });
  }

  try {
    if (!users) {
      return res.status(404).json({ message: "Username tidak tersedia" });
    } else if (users.password !== password) {
      return res.status(422).json({ message: "Kata sandi salah" });
    } else {
      function genereteToken() {
        const token = jwt.sign(
          {
            username: users.username,
          },
          process.env.ACCESS_TOKEN,
          {
            expiresIn: "1m",
          }
        );

        return token;
      }

      return res.status(200).json({
        id: users._id,
        username: users.username,
        password: users.password,
        token: genereteToken(),
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Terjadi Kesalahan" });
  }
}

async function expToken(req, res) {
  const exp = req.query.exp;

  try {
    jwt.verify(exp, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(422).json({ is_valid: false });
      } else {
        return res.status(200).json({
          is_valid: true,
          expired_at: decoded.exp,
          username: decoded.username,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: "Terjadi Kesalahan" });
  }
}

module.exports = {
  registration,
  login,
  expToken,
};
