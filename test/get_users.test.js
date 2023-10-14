const { getUsers } = require('../src/usecases/users-usecase');

const usersRepositoryMock = {
  getUsers: jest.fn().mockResolvedValue([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'CLIENT' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'ADMIN' },
  ]),
};

// Caso de prueba 1: Obtener todos los usuarios sin filtros
test('Get all users without filters', async () => {
  const result = await getUsers(usersRepositoryMock);
  expect(result).toEqual({
    status: true,
    data: [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'CLIENT' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'ADMIN' },
    ],
  });
  expect(usersRepositoryMock.getUsers).toHaveBeenCalledWith(null, null);
});
