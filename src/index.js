const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')
const express = require('express')
const mongoose = require('mongoose')
const User = require('./user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


mongoose.connect('mongodb://localhost/iCordisX')

const secretKey = 'uniquepassword'

const user = mongoose.model('user', {
  username: String,
  password: String,
  // name: String,
  // age: Number,
  // gender: String,
});

const dailyReport = mongoose.model('dailyReport', {
  chestPain: Number,
  breathingDifficulty: Number,
  stressLevel: Number,
  nausea: Number,
  tiredness: Number,
});

const ecgData = mongoose.model('ecgData', {
  rawVoltage: [Number],
  intervals: Number,
  peaks: Number,
});

const app = express()

app.use(bodyParser.json())

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username })
    .then(user => {
      const valid = bcrypt.compareSync(password, user.password)

      const token = jwt.sign({
        id: user._id
      }, secretKey)

      if (valid) {
        res.send({ success: valid, token: token })
      } else {
        res.send({ success: valid, token: 'Invalid Login.' })
      }
    })
    .catch(error => {
      console.error(error)
      res.send(error.message || error.toString() || "Unknown error")
    })
})

app.post('/api/user', (req, res) => {
  const data = Object.assign({}, req.body)
  data.password = bcrypt.hashSync(data.password, 10)
  const user = new User(data) 
  user.save().then(() => res.send(data))
})

app.get('/api/user', function (req, res) {
  User.find()
    .then(data => res.send(data));
})

app.post('/api/user', function (req, res) {
  const user = new User(req.body);
  user.save();
  res.send('Created a new  username: ' + req.body.user);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})