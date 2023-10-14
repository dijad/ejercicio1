const createExpressApp = require('./adapters/express');

//Frameworks
const postgresConnection = require('./frameworks/db/postgres');

//Routers
const userRouter = require('./adapters/routers/api/users/users-router');

//Repositories
const UsersRepository = require('./usecases/users/user-repository');
const usersRepository = new UsersRepository(postgresConnection);

let routers = [
  userRouter(usersRepository)
];

createExpressApp(routers);
