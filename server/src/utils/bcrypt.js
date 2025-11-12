const bcrypt = require("bcrypt");

const hashPassword = async plainPassword => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plainPassword, salt);
};

const comparePassword = async ({ plainPassword, hashPassword }) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
