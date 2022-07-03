const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'need2craft',
  password: 'password',
  port: 5432,
});

const getCrafts = () => {
    return new Promise(function(resolve, reject) {
      pool.query(`SELECT * FROM need2craft.crafts`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    })
  }

  const getCraft = (result) => {
    return new Promise(function(resolve, reject) {
      pool.query(`SELECT * FROM need2craft.crafts WHERE result = '${result}'`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

  const getCraftsOfOwner = (owner) => {
    return new Promise(function(resolve, reject) {
      pool.query(`SELECT * FROM need2craft.crafts WHERE owner = '${owner}'`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

  const getCraftOfOwner = (owner, result) => {
    return new Promise(function(resolve, reject) {
      pool.query(`SELECT * FROM need2craft.crafts WHERE owner = '${owner}' AND result = '${result}'`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

  const addCraft = (body) => {
    return new Promise(function(resolve, reject) {
      const { result, item0, item1, item2, item3, item4, item5, item6, item7, item8, owner } = body
      pool.query(`INSERT INTO need2craft.crafts (result, item0, item1, item2, item3, item4, item5, item6, item7, item8, owner) VALUES ('${result}', '${item0}', '${item1}', '${item2}', '${item3}', '${item4}', '${item5}', '${item6}', '${item7}', '${item8}', '${owner}')`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve("Craft Added");
      })
    })
  }

  const deleteCraft = (user, result) => {
    return new Promise(function(resolve, reject) {
      pool.query(`DELETE FROM need2craft.items WHERE result = '${result}' AND owner = '${user}'`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve("Craft Deleted");
      })
    }) 
  }

  const deleteCrafts = (user) => {
    return new Promise(function(resolve, reject) {
      pool.query(`DELETE FROM need2craft.crafts WHERE owner = '${user}'`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve("Crafts Deleted");
      })
    }) 
  }



  module.exports = {
    getCrafts,
    getCraft,
    getCraftsOfOwner,
    getCraftOfOwner,
    addCraft,
    deleteCraft,
    deleteCrafts,
}