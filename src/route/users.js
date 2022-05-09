const express = require("express");
const router = express.Router();

const users = require("../controllers/users");
const validation = require("../middleware/validation-form");

router.post("/registration", validation("REGISTRATION"), users.registration);
router.post("/login", validation("LOGIN"), users.login);
router.get("/token", users.expToken);

module.exports = router;
