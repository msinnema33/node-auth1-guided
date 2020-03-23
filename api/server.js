const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require('express-session');

const usersRouter = require("../users/users-router.js");
const authRouter = require("../auth/router.js");
const restricted = require('../auth/restricted-middleware.js');

const server = express();

const sessionConfig = {
  name: 'hooper',
  secret: "keep it safe, cover it up!  No sticky notes",
  cookie: {
    maxAge: 1000 * 60 * 10, //counted in milisec (10 minutes in this example)
    secure: false, // true in production (true means send over httpS)
    httpOnly: true, //true means no JS access
  },
  resave: false,
  saveUninitialized: true, // GDPR require to check with client before saving cookies!!
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
