const { deleteUser } = require('../src/usecases/users-usecase');

const usersRepositoryMock = {
  isUserById: jest.fn(),
  deleteUserById: jest.fn(),
};

describe('deleteUser', () => {
  beforeEach(() => {
    usersRepositoryMock.isUserById.mockReset();
    usersRepositoryMock.deleteUserById.mockReset();
  });

  test('Debería retornar un mensaje de error si no se proporciona un ID de usuario', async () => {
    const result = await deleteUser(usersRepositoryMock);
    expect(result).toEqual({ status: false, data: 'Es necesario ingresar un identificador de usuario para eliminar.' });
  });

  test('Debería retornar un mensaje de error si el usuario no existe', async () => {
    usersRepositoryMock.isUserById.mockResolvedValue(false);
    const result = await deleteUser(usersRepositoryMock, '123');
    expect(result).toEqual({ status: false, data: 'El usuario ingresado no se encuentra en el sistema.' });
  });

  test('Debería retornar un mensaje de error si ocurre un problema al eliminar el usuario', async () => {
    usersRepositoryMock.isUserById.mockResolvedValue(true);
    usersRepositoryMock.deleteUserById.mockResolvedValue(false);
    const result = await deleteUser(usersRepositoryMock, '123');
    expect(result).toEqual({ status: false, data: 'Error en la eliminación de usuario.' });
  });

  test('Debería retornar un mensaje de éxito si el usuario se elimina correctamente', async () => {
    usersRepositoryMock.isUserById.mockResolvedValue(true);
    usersRepositoryMock.deleteUserById.mockResolvedValue(true);
    const result = await deleteUser(usersRepositoryMock, '123');
    expect(result).toEqual({ status: true, data: 'El usuario ha sido eliminado satisfactoriamente.' });
  });
});
