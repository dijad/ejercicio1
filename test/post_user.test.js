// Importa la función postUser y cualquier otro módulo necesario
const { postUser } = require('../src/usecases/users-usecase');
const usersRepository = require('../src/usecases/users/user-repository');

// Crea un mock del repositorio de usuarios
const usersRepositoryMock = {
  getUserByEmail: jest.fn().mockResolvedValue(null),
  postUser: jest.fn().mockResolvedValue(true),
};

// Casos de prueba
describe('postUser', () => {
  // Caso de prueba 1: Faltan campos
  test('should return an error message if any field is missing', async () => {
    const result = await postUser(usersRepositoryMock, null, null, null, null);
    expect(result).toEqual({ status: false, data: 'Todos los campos son requeridos.' });
    expect(usersRepositoryMock.getUserByEmail).not.toHaveBeenCalled();
    expect(usersRepositoryMock.postUser).not.toHaveBeenCalled();
  });

  // Caso de prueba 2: Formato de correo electrónico inválido
  test('should return an error message if the email format is invalid', async () => {
    const result = await postUser(usersRepositoryMock, 'John Doe', 'invalid-email', 'CLIENT', 'password');
    expect(result).toEqual({ status: false, data: 'Formato de correo electrónico no válido.' });
    expect(usersRepositoryMock.getUserByEmail).not.toHaveBeenCalled();
    expect(usersRepositoryMock.postUser).not.toHaveBeenCalled();
  });

  // Caso de prueba 3: Correo electrónico ya en uso
  test('should return an error message if the email is already in use', async () => {
    usersRepositoryMock.getUserByEmail.mockResolvedValue({ id: 1, email: 'john.doe@example.com' });
    const result = await postUser(usersRepositoryMock, 'John Doe', 'john.doe@example.com', 'CLIENT', 'password');
    expect(result).toEqual({ status: false, data: 'Esta dirección de correo electrónico ya se encuentra en uso.' });
    expect(usersRepositoryMock.getUserByEmail).toHaveBeenCalledWith('john.doe@example.com');
    expect(usersRepositoryMock.postUser).not.toHaveBeenCalled();
  });
});
