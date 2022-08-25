const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex');
const { response } = require('express');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1', // localhost location
      port : 5432, // add your pg port number
      user : 'postgres', // add your pg username
      password : 'smartbrain', // add your pg or pgadmin etc password if any
      database : 'smart_brain' // ad your database name you created
    }
  });

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.get('/', (req, res)=> {
    res.send('success')
})

app.post('/signin', (req, res)=> {
    db.select('email', 'hash')
    .from('login')
    .where('email', '=', req.body.email)
    .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
        if (isValid) {
           return db.select('*').from('users')
            .where('email', '=', req.body.email)
            .then(user => {
                res.json(user[0])
            })
            .catch(error => res.status(400).json('unable to get user'))
        } else {
            res.status(400).json('wrong credentials')
        }
    })
    .catch(error => res.status(400).json('wrong credentials'))

})

app.post('/register', (req, res)=> {
    const { email, name, password } = req.body
    const hash = bcrypt.hashSync(password)
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date()
            })
            .then(user => {
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })        
    .catch(err => res.status(400).json('Unable to register...'))
})

app.get('/profile/:id', (req, res)=> {
    const { id } = req.params
    db.select('*').from('users').where({id})
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('Not found')
            }
        })
        .catch(err => res.status(400).json('error getting user')) // declared but never read
})

app.put('/image', (req, res)=> {
    const { id } = req.body
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries)
    })
    .catch(err => res.status(400).json('Unable to get entries...'))
})

app.listen(3000, () => {
    console.log("app is running on on port 3000")
})

// our endpoints
/*
/--> res = this is working
/signin --> POST Success/Fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user 
*/ 