const bcrypt = require('bcrypt');

const { VALIDATION_CASES_PASS } = require('./constants');

async function encryptString(password) {
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS_BCRYPT) || 20);
  const encryptedPass = await bcrypt.hash(password, salt);
  return encryptedPass;
}

async function matchString(passwordIn, password) {
  return await bcrypt.compare(passwordIn, password);
}

function getTypeFailValidationPass(validationFail) {
  return VALIDATION_CASES_PASS[validationFail];
}

module.exports = {
  encryptString,
  matchString,
  getTypeFailValidationPass
}
