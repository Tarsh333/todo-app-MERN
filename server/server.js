import express, { urlencoded } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import fetch from 'node-fetch';

import UserSchema from './models/userModel.js'
const app = express()

mongoose.connect('mongodb://localhost/todo-users', {
    useNewUrlParser: true, useUnifiedTopology: true
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connected to mongod');
});



app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.post('/auth', async (req, res) => {
    try {
        const { name, email, id } = req.body
        const user = await UserSchema.findOne({ email: email })
        if (!user) {
            const newUser = new UserSchema({ name, email, id })
            await newUser.save()
        }
        res.json({ auth: true })
        
    } catch (error) {
        res.json({error:error})
    }
})


app.get('/', (req, res) => {
    res.send('hi')
})


app.get('/data', async (req, res) => {
    try {
        const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${req.headers['x-access-token']}`)
        const data = await response.json()
        const email = data.email
        if (!email) {
            res.json({ auth: 'not authorized' })
        }
        else {
            const user = await UserSchema.findOne({ email: email })
            res.json({ todos: user.todos })
        }
        
    } catch (error) {
        res.json({error:error})
    }

})


app.post('/data', async (req, res) => {
    try {
        const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${req.headers['x-access-token']}`)
        const data = await response.json()
        const email = data.email
        if (!email) {
            res.json({ auth: 'not authorized' })
        }
        else {
            const todo = req.body.todo
            await UserSchema.updateOne({ email: email }, { $push: { todos: todo } })
            res.json({ success: true })
        }
        
    } catch (error) {
        res.json({error:error})
        
    }



})


app.delete('/data/:id', async (req, res) => {
    try {
        const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${req.headers['x-access-token']}`)
        const data = await response.json()
        const email = data.email
        if (!email) {
            res.json({ auth: 'not authorized' })
        }
        else {
            await UserSchema.updateOne({ email: email }, { $pull: { todos: { id: req.params.id } } })
            res.json({ success: true })
        }
        
    } catch (error) {
        res.json({error:error})
        
    }
})
app.delete('/data', async (req, res) => {
    try {
        const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${req.headers['x-access-token']}`)
        const data = await response.json()
        const email = data.email
        if (!email) {
            res.json({ auth: 'not authorized' })
        }
        else {
            await UserSchema.updateOne({ email: email }, { todos: [] })
            res.json({ success: true })
        }
        
    } catch (error) {
        res.json({error:error})
        
    }
})
app.put('/data/:id', async (req, res) => {
    try {
        const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${req.headers['x-access-token']}`)
        const data = await response.json()
        const email = data.email
        if (!email) {
            res.json({ auth: 'not authorized' })
        }
        else {
            const todo = req.body.todo
            await UserSchema.updateOne({ email: email, "todos.id": req.params.id }, { "todos.$.title": todo })
            res.json({ success: true })
        }
        
    } catch (error) {
        res.json({error:error})
        
    }
})
app.listen(5000, () => {
    console.log('app listening on port 5000');
})