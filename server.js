require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose')

//import routes
const authRoute = require('./routes/auth');
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get('/save', (req, res) => {
    res.send("full dick mouth jumping in")
})

app.post('/name', (req, res) => {
    if (req.body.name) {
        return res.json({ name: req.body.name })
    } else {
        return res.status(400).json({ error: 'no name provided' })
    }
})

app.use('/api/auth', authRoute)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log(`connected to database`);
        app.listen(process.env.PORT, () => {
            console.log(`server is running on port ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })
