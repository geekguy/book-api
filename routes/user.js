const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/user");

router.post("/register", async (req, res) => {
  const user = req.body;
  user.password = await bcrypt.hash(user.password, 10);
  const dbUser = await User.create(user);
  res.send(dbUser);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const dbUser = await User.findOne({ email });
  isPasswordSame = await bcrypt.compare(password, dbUser.password);
  if (isPasswordSame) {
    const token = jwt.sign(
      { email: dbUser.email, role: dbUser.role },
      process.env.JWT_SECRET
    );
    res.send({ token });
  } else {
    res.status(401).send("Unauthorized");
  }
});

module.exports = router;
