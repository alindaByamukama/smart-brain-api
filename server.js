const express = require('express')
// const bcrypt = require('bcrypt-nodejs')
var cors = require('cors')
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '456',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: "147",
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res)=> {
    res.send(database.users)
})

app.post('/signin', (req, res)=> {
    // bcrypt.compare("mangoes", '$2a$10$SJbiIoZVPYGi.53NobH.tO1dAL5fCsbehqQAd7.tMHUJkWzBdYA9u', function(err, res) {
    //     console.log('first try', res)
    // })
    // bcrypt.compare("veggies", '$2a$10$SJbiIoZVPYGi.53NobH.tO1dAL5fCsbehqQAd7.tMHUJkWzBdYA9u', function(err, res) {
    //     console.log('second try', res)
    // })

    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json(database.users[0])
    } else {
        res.status(400).json('Error logging in!')
    }
    //res.send('signin')
})

app.post('/register', (req, res)=> {
    const { email, name, password } = req.body
    // bcrypt.hash(password, null, null, function(err, hash) {
        // console.log(hash)
    // })
    database.users.push({
        id: '789',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res)=> {
    const { id } = req.params
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true
            return res.json(user)
        }
    })
    if (!found) {
        res.status(400).json('Not found!')
    }
})

app.put('/image', (req, res)=> {
    const { id } = req.body
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true
            user.entries++
            return res.json(user.entries)
        }
    })
    if (!found) {
        res.status(404).json('Not found!')
    }
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
// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });