const validator = require('validator');

function validateNullsInArray(array) {
  return array.includes(null);
}

function validateAnyNotNull(array) {
  return array.some(item => item !== null);
}

function isEmail(email) {
  return validator.isEmail(email);
}

module.exports = {
  validateNullsInArray,
  validateAnyNotNull,
  isEmail
}
