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
      pool.query(`SELECT * FROM need2craft.users WHERE username = '${username}'`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

  const addUser = (username) => {
    return new Promise(function(resolve, reject) {
      pool.query(`INSERT INTO need2craft.users VALUES ('${username}')`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve("User Added");
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




module.exports = {
    getUsers,
    getUser,
    addUser,
    removeUser,
}