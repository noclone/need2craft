const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'need2craft',
  password: 'password',
  port: 5432,
});

const getUsers = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM need2craft.users', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

  const getUser = (username) => {
    return new Promise(function(resolve, reject) {
      pool.query(`SELECT * FROM need2craft.users WHERE username = '${username}' OR email = '${username}'`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

  const addUser = (body) => {
    const { username, email, password } = body
    return new Promise(function(resolve, reject) {
      pool.query(`INSERT INTO need2craft.users (username, email, password) VALUES (
        '${username}',
        '${email}',
        crypt( '${password}', gen_salt('bf'))
      ) RETURNING username, email;`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

  const removeUser = (username) => {
    return new Promise(function(resolve, reject) {
      pool.query(`DELETE FROM need2craft.users WHERE username = '${username}'`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve("User Deleted");
      })
    }) 
  }

  const loginUser = (body) => {
    const { identifier, password } = body
    return new Promise(function(resolve, reject) {
      pool.query(`SELECT username, email FROM need2craft.users WHERE (email = '${identifier}' OR username = '${identifier}')
      AND password = crypt('${password}', password);`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }




module.exports = {
    getUsers,
    getUser,
    addUser,
    removeUser,
    loginUser,
}