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

router.post('/login', (req, res) => {
    const {username, password } = req.body;

    Users.findBy({ username})
    .then(([user]) => {
        if(user && bcrypt.compareSynch(password, user.password)) {
            req.session.user = {
                id: user.id,
                username: user.username
            };
          res.status(200).json({ Hello: user.username});
        } else {
            res.status(401).json({ message: 'invalid credentials'});
        }
    })
    .catch(error => {
        res.status(500).json({ errorMessage: 'error finding user'});
    })
})
module.exports = router;