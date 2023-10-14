const { Router } = require('express');

const { postUser, deleteUser, updateUser, getUser, getUsers, login } = require('../../../../usecases/users-usecase')
const  {verifyToken, verifyIsAdmin, verifyIsClient } = require('../../../../middlewares/auth/auth')

function userRouter(usersRepository) {
  const router = Router();

  router.post('/api/users', [verifyToken, verifyIsAdmin], async (req, res) => {
    try {

      const { name, email, role, password } = req.body;

      const response = await postUser(usersRepository, name, email, role, password);

      res.status(200).send(response);
    } catch (err) {
      const errBody = {
        status: false,
        data: {
         message: err.message,
         url: req.originalUrl
        }
      }
      console.error("Backend response ->", JSON.stringify(errBody, null, 3))
      res.status(err.statusCode || 500).send(errBody)
    }
  });

  router.post('/api/login', async (req, res) => {
    try {

      const { email, password } = req.body;

      const response = await login(usersRepository, email, password);

      res.status(200).send(response);
    } catch (err) {
      const errBody = {
        status: false,
        data: {
         message: err.message,
         url: req.originalUrl
        }
      }
      console.error("Backend response ->", JSON.stringify(errBody, null, 3))
      res.status(err.statusCode || 500).send(errBody)
    }
  });

  router.delete('/api/users/:user_id', [verifyToken, verifyIsAdmin], async (req, res) => {
    try {
      const userId = req.params.user_id;

      const response = await deleteUser(usersRepository, userId);

      res.status(200).send(response);
    }catch (err) {
      const errBody = {
        status: false,
        data: {
         message: err.message,
         url: req.originalUrl
        }
      }
      console.error("Backend response ->", JSON.stringify(errBody, null, 3))
      res.status(err.statusCode || 500).send(errBody)
    }
  });

  router.put('/api/users/:user_id', [verifyToken, verifyIsAdmin], async (req, res) => {
    try {
      const userId = req.params.user_id;

      const { name, email, role } = req.body;

      const response = await updateUser(usersRepository, userId, name, email, role);

      res.status(200).send(response);
    }catch (err) {
      const errBody = {
        status: false,
        data: {
         message: err.message,
         url: req.originalUrl
        }
      }
      console.error("Backend response ->", JSON.stringify(errBody, null, 3))
      res.status(err.statusCode || 500).send(errBody)
    }
  });

  router.get('/api/users/:user_id', [verifyToken, verifyIsClient], async (req, res) => {
    try {
      const userId = req.params.user_id;

      const response = await getUser(usersRepository, userId);

      res.status(200).send(response);
    }catch (err) {
      const errBody = {
        status: false,
        data: {
         message: err.message,
         url: req.originalUrl
        }
      }
      console.error("Backend response ->", JSON.stringify(errBody, null, 3))
      res.status(err.statusCode || 500).send(errBody)
    }
  });

  router.get('/api/users', [verifyToken, verifyIsClient], async (req, res) => {
    try {

      const filteredBy = req.query.filtered_by;
      const valueFilter = req.query.value_filter;

      const response = await getUsers(usersRepository, filteredBy, valueFilter);

      res.status(200).send(response);
    }catch (err) {
      const errBody = {
        status: false,
        data: {
         message: err.message,
         url: req.originalUrl
        }
      }
      console.error("Backend response ->", JSON.stringify(errBody, null, 3))
      res.status(err.statusCode || 500).send(errBody)
    }
  });

  return router;
}

module.exports = userRouter;
