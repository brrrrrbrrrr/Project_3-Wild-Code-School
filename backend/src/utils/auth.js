// eslint-disable-next-line import/no-extraneous-dependencies
const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parrallelism: 1,
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

module.exports = {
  hashPassword,
};
