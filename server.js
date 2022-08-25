const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex');
const { response } = require('express');

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

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

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

app.put('/image',  (req, res) => { image.handleImage(req, res, db) })

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