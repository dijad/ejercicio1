const { validateNullsInArray, isEmail, validateAnyNotNull } = require('../utils/validator');
const { matchString, getTypeFailValidationPass, encryptString } = require('../utils/utils');
const { generateAccessToken } = require('../utils/jwt');
const ValidatorPass = require('../utils/validatorPass');

async function postUser(usersRepository, name = null, email = null, role = null, password = null) {

  const payload = [name, email, role, password];

  if (validateNullsInArray(payload)) {
    return { status: false, data: 'Todos los campos son requeridos.'}
  }

  if (!isEmail(email)) {
    return { status: false, data: 'Formato de correo electrónico no válido.'};
  }

  const user = await usersRepository.getUserByEmail(email);

  if (user) {
    return { status:false, data: 'Esta dirección de correo electrónico ya se encuentra en uso.'};
  }

  const passwordValidation = ValidatorPass.validate(password, { list: true });
  if (passwordValidation.length > 0) {
    return createResponse(false, getTypeFailValidationPass(passwordValidation[0]));
  }

  const response = await usersRepository.postUser(name, email, await encryptString(password), role);
  if (response) {
    return { status: response, data: 'Usuario registrado correctamente.' }
  }
  return { status: response, data: 'Error en el registro de usuario.'}
}

async function login(usersRepository, email, password) {

  if (!isEmail(email)) {
    return { status: false, data: 'Formato de correo electrónico no válido.'};
  }

  const user = await usersRepository.getUserByEmail(email);

  if (!user) {
    return { status: false, data: 'Esta dirección de correo electrónico no está asociada a una cuenta.' };
  }

  const isMatched = await matchString(password, user.password);
  const accessToken = generateAccessToken({ id: user.id, role: user.role });

  return { status: isMatched, data: isMatched? accessToken: 'Correo o contraseña incorrecta.' };
}

async function deleteUser(usersRepository, userId = null) {
  if (!userId) {
    return { status: false, data: 'Es necesario ingresar un identificador de usuario para eliminar.'};
  }

  const isUser = await usersRepository.isUserById(userId);

  if (!isUser) {
    return { status: false, data: 'El usuario ingresado no se encuentra en el sistema.'};
  }

  const isDeletedUser = await usersRepository.deleteUserById(userId);

  if (!isDeletedUser) {
    return { status: false, data: 'Error en la eliminación de usuario.'};
  }

  return { status: true, data: 'El usuario ha sido eliminado satisfactoriamente.'};
}

async function updateUser(usersRepository, userId = null, name = null, email = null, role = null) {
  if (!userId) {
    return { status: false, data: 'Es necesario ingresar un identificador de usuario para eliminar.'};
  }

  const payload = [name, email, role];

  if (!validateAnyNotNull(payload)) {
    return { status: false, data: 'Es necesario ingresarun campo a modificar.'};
  }

  const isUser = await usersRepository.isUserById(userId);

  if (!isUser) {
    return { status: false, data: 'El usuario ingresado no se encuentra en el sistema.'};
  }

  const isUpdatedUser = await usersRepository.updateUserById(userId, name, email, role);

  if (!isUpdatedUser) {
    return { status: false, data: 'Error en la actualización de usuario.'};
  }

  return { status: true, data: 'El usuario ha sido actualizado satisfactoriamente.'};
}

async function getUser(usersRepository, userId = null) {
  if (!userId) {
    return { status: false, data: 'Es necesario ingresar un identificador de usuario para eliminar.'};
  }

  const user = await usersRepository.getUserById(userId);

  if (!user) {
    return { status: false, data: 'El usuario ingresado no se encuentra en el sistema.'};
  }

  return { status: true, data: user};
}

async function getUsers(usersRepository, filteredBy = null, valueFilter = null) {

 const users = await usersRepository.getUsers(filteredBy, valueFilter);

 return { status: true, data: users };
}


module.exports = {
  postUser,
  login,
  deleteUser,
  updateUser,
  getUser,
  getUsers
}
