const UserEntity = require('./user-entity');

class UserRepository {

  constructor(dbClient) {
    this.connection = dbClient;
  }

  getConnection() {
    return this.connection();
  }

  async postUser(name, email, password, role) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let connection = self.getConnection();
      let query = {
        text: `
          INSERT INTO users_test (name, email, password, role)
          VALUES ($1, $2, $3, $4);
         `,
        values: [
          name,
          email,
          password,
          role,
        ]
       }
      connection.query(query, function (err, result) {
        if (err) {
          console.error(UserRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.rowCount < 1) {
            resolve(false);
          } else {
            resolve(true);
          }
        }
      })
    });
  }

  async getUserByEmail(email) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let connection = self.getConnection();
      let sql = `
        SELECT
          u.id,
          u.name,
          u.email,
          u.role,
          u.password
        FROM
          users_test u
        WHERE
          u.email = $1
      `;
      const params = [ email ];
      connection.query(sql, params, function (err, result) {
        if (err) {
          console.error(UserRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.rows.length === 0) {
            resolve(null);
          } else {
            const user = new UserEntity(
              result.rows[0].id,
              result.rows[0].name,
              result.rows[0].email,
              result.rows[0].role,
              result.rows[0].password,
            );
            resolve(user);
          }
        }
      });
    });
  }

  async getUserById(userId) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let connection = self.getConnection();
      let sql = `
        SELECT
          u.id,
          u.name,
          u.email,
          u.role
         FROM
          users_test u
        WHERE
          u.id = $1
      `;
      const params = [ userId ];
      connection.query(sql, params, function (err, result) {
        if (err) {
          console.error(UserRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.rows.length === 0) {
            resolve(null);
          } else {
            const user = new UserEntity(
              result.rows[0].id,
              result.rows[0].name,
              result.rows[0].email,
              result.rows[0].role
            );
            resolve(user);
          }
        }
      });
    });
  }

  async getUsers(filteredBy = null, valueFilter = null) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let connection = self.getConnection();
      let filter = ''
      let params = [];
      if (filteredBy && valueFilter) {
        filter = ` WHERE u.${filteredBy} = $1`;
        params = [valueFilter];
      }
      let sql = `
        SELECT
          u.id,
          u.name,
          u.email,
          u.role
         FROM
          users_test u
        ${filter}
      `;
      connection.query(sql, params, function (err, result) {
        console.log("🚀 ~ file: user-repository.js:140 ~ UserRepository ~ sql:", sql)
        if (err) {
          console.log("🚀 ~ file: user-repository.js:142 ~ UserRepository ~ err:", err)
          console.error(UserRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.rows.length === 0) {
            resolve([]);
          } else {
            const users = [];
            result.rows.map(row => {
              const user = new UserEntity(
                row.id,
                row.name,
                row.email,
                row.role
              );
              users.push(user)
            })
            resolve(users);
          }
        }
      });
    });
  }

  async isUserById(userId) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let connection = self.getConnection();
      let sql = `
        SELECT
          1 as is_user
        FROM
          users_test u
        WHERE
          u.id = $1
      `;
      const params = [ userId ];
      connection.query(sql, params, function (err, result) {
        if (err) {
          console.error(UserRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.rows.length === 0) {
            resolve(0);
          } else {
            resolve(result.rows[0].is_user);
          }
        }
      });
    });
  }

  async deleteUserById(userId) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let connection = self.getConnection();
      let sql = `
        DELETE
        FROM
          users_test u
        WHERE
          u.id = $1
      `;
      const params = [ userId ];
      connection.query(sql, params, function (err, result) {
        if (err) {
          console.error(UserRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.rowCount < 1) {
            resolve(false);
          } else {
            resolve(true);
          }
        }
      });
    });
  }

  async updateUserById(userId, name = null, email = null, role = null) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let connection = self.getConnection();

      const params = [userId];
      const updates = [];

      if (name) {
        params.push(name);
        updates.push(`name = $${params.length}`);
      }

      if (email) {
        params.push(email);
        updates.push(`email = $${params.length}`);
      }

      if (role) {
        params.push(role);
        updates.push(`role = $${params.length}`);
      }

      let sql = `
        UPDATE users_test
        SET ${updates.join(',')}
        WHERE id = $1
      `;
      connection.query(sql, params, function (err, result) {
        if (err) {
          console.error(UserRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.rowCount < 1) {
            resolve(false);
          } else {
            resolve(true);
          }
        }
      });
    });
  }
}

module.exports = UserRepository;
