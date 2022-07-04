const express = require('express')

const port = 3001

const app = express()

const users = require('./users')
const items = require('./items')
const crafts = require('./crafts')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
    res.status(200).send('Hello World!')
  })

app.get('/users', (req, res) => {
    users.getUsers()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })

app.get('/users/:id', (req, res) => {
    users.getUser(req.params.id)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.post('/register', (req, res) => {
    users.addUser(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.delete('/users/:id', (req, res) => {
    users.removeUser(req.params.id)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.post('/login', (req, res) => {
    users.loginUser(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.post('/items', (req, res) => {
    items.addItem(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.get('/items', (req, res) => {
    items.getItems()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.get('/items/:name', (req, res) => {
    items.getItem(req.params.name)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.get('/items/of/:owner', (req, res) => {
    items.getItemsOfOwner(req.params.owner)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.get('/items/:owner/:name', (req, res) => {
    items.getItemOfOwner(req.params.owner, req.params.name)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.delete('/items/:user/:name', (req, res) => {
    items.deleteItem(req.params.user, req.params.name)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.delete('/items/:user', (req, res) => {
    items.deleteItems(req.params.user)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.post('/crafts', (req, res) => {
    crafts.addCraft(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.get('/crafts', (req, res) => {
    crafts.getCrafts()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.get('/crafts/:result', (req, res) => {
    crafts.getCraft(req.params.result)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.get('/crafts/of/:owner', (req, res) => {
    crafts.getCraftsOfOwner(req.params.owner)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.get('/crafts/:owner/:result', (req, res) => {
    crafts.getCraftOfOwner(req.params.owner, req.params.result)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.delete('/crafts/:user/:result', (req, res) => {
    crafts.deleteCraft(req.params.user, req.params.result)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.delete('/crafts/:user', (req, res) => {
    crafts.deleteCrafts(req.params.user)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.listen(port, () => {
    console.log(`Server listens on port ${port}.`)
})