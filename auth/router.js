const bcrypt = require("bcryptjs");
const router = require("express").Router();
const Users = require("../users/users-model.js");
router.post("/register", (req, res) => {
  const userInfo = req.body;
  // the pasword will be hashed and re-hashed 2 ^ 8 time
  const ROUNDS = process.env.HASHING_ROUNDS || 8;
  const hash = bcrypt.hashSync(userInfo.password, ROUNDS);
  userInfo.password = hash;
  Users.add(userInfo)
    .then(user => {
      res.json(user);
    })
    .catch(err => res.send(err));
});
module.exports = router;