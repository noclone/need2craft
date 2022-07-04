const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'need2craft',
  password: 'password',
  port: 5432,
});

const getItems = () => {
    return new Promise(function(resolve, reject) {
      pool.query(`SELECT * FROM need2craft.items`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    })
  }

  const getItem = (name) => {
    return new Promise(function(resolve, reject) {
      pool.query(`SELECT * FROM need2craft.items WHERE name = '${name}'`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

  const getItemsOfOwner = (owner) => {
    return new Promise(function(resolve, reject) {
      pool.query(`SELECT name,img FROM need2craft.items WHERE owner = '${owner}'`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

  const getItemOfOwner = (owner, name) => {
    return new Promise(function(resolve, reject) {
      pool.query(`SELECT * FROM need2craft.items WHERE owner = '${owner}' AND name = '${name}'`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

  const addItem = (body) => {
    return new Promise(function(resolve, reject) {
      const { name, img, owner } = body
      pool.query(`INSERT INTO need2craft.items (name, img, owner) VALUES ('${name}', '${img}', '${owner}')`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve("Item Added");
      })
    })
  }

  const deleteItem = (user, name) => {
    return new Promise(function(resolve, reject) {
      pool.query(`DELETE FROM need2craft.items WHERE name = '${name}' AND owner = '${user}'`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve("Item Deleted");
      })
    }) 
  }

  const deleteItems = (user) => {
    return new Promise(function(resolve, reject) {
      pool.query(`DELETE FROM need2craft.items WHERE owner = '${user}'`, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve("Items Deleted");
      })
    }) 
  }


  module.exports = {
    getItems,
    getItem,
    getItemsOfOwner,
    getItemOfOwner,
    addItem,
    deleteItem,
    deleteItems,
}