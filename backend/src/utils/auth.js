/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = async (password) => {
  const hashed = await argon2
    .hash(password, hashingOptions)
    .then((hashedPassword) => {
      return hashedPassword;
    })
    .catch((err) => {
      console.warn(err);
      return false;
    });
  return hashed;
};

const verifyPasswordRecruiter = (req, res) => {
  argon2
    .verify(req.recruiter.password, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = {
          sub: {
            id: req.recruiter.id,
            name: req.recruiter.name,
            userType: "recruiters",
          },
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
        delete req.recruiter.password;

        res.send({ token, recruiter: req.recruiter });
      } else {
        return res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(500);
    });
};

const verifyPasswordCandidate = (req, res) => {
  argon2
    .verify(req.candidate.password, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = {
          sub: { id: req.candidate.id, name: req.candidate.name },
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "6h",
        });
        delete req.candidate.password;
        res.send({ token, candidate: req.candidate });
      } else {
        return res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(500);
    });
};

const verifyPasswordCandidateWithoutToken = (req, res, next) => {
  argon2
    .verify(req.candidate.password, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        next();
      } else {
        return res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(500);
    });
};

const verifyPasswordRecruiterWithoutToken = (req, res, next) => {
  argon2
    .verify(req.recruiter.password, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        next();
      } else {
        return res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(500);
    });
};
const verifyPasswordCompagnyWithoutToken = (req, res, next) => {
  argon2
    .verify(req.compagny.password, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        next();
      } else {
        return res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(500);
    });
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    if (authorizationHeader === null) {
      throw new Error("Authorization header is missing");
    }
    const [type, token] = authorizationHeader.split(" ");
    if (type !== "Bearer") {
      throw new Error("Authorization header has not the bearer type");
    }
    req.payload = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};

const isRecruiter = (req, res, next) => {
  try {
    if (req.payload.sub.userType !== "recruiters") {
      res.status(401).send("You must be a recruiter to perform this operation");
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
  verifyPasswordCandidate,
  verifyPasswordRecruiter,
  verifyToken,
  verifyPasswordCandidateWithoutToken,
  verifyPasswordRecruiterWithoutToken,
  verifyPasswordCompagnyWithoutToken,
  isRecruiter,
};
