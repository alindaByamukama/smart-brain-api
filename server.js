import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors'
import knex from 'knex'

import {handleRegister} from './controllers/register.js';
import {handleSignin} from './controllers/signin.js';
import {handleProfile} from './controllers/profile.js';
import {handleApiCall, handleImage} from './controllers/image.js';


const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
        }
    }
  });

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.get('/', (req, res)=> {
    res.send("success")
})

app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { handleProfile(req, res, db) })

app.put('/image',  (req, res) => { handleImage(req, res, db) })

app.post('/imageurl',  (req, res) => { handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on on port ${process.env.PORT}`)
})

app.get('/testdb', async (req, res) => {
  try {
    const result = await db.select('*').from('users').limit(1);
    res.json(result);
  } catch (err) {
    console.error('DB Test Error:', err);
    res.status(500).send('Database connection failed');
  }
});
