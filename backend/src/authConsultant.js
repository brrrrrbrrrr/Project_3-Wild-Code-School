/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyPassword = (req, res) => {
  console.warn("verify, req.user :", req.user);
  argon2
    .verify(req.user.password, req.body.password)
    .then((match) => {
      console.warn("match :", match);
      if (match) {
        const payload = {
          sub: {
            id: req.user.id,
            userType: "consultant",
            isSuperAdmin: req.user.superAdmin,
          },
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: 3600,
        });
        delete req.user.password;
        res.send({ token, user: req.user });
      } else {
        res.sendStatus(401);
      }
    })

    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET);
    console.warn(req.payload);
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const isConsultantAdmin = (req, res, next) => {
  try {
    console.warn(req.payload);
    if (
      !req.payload.sub.isSuperAdmin ||
      req.payload.sub.userType !== "consultant"
    ) {
      res
        .status(401)
        .send(
          "You must be a consultant administrator to perform this operation"
        );
    } else {
      next();
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  isConsultantAdmin,
};
