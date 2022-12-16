require('dotenv').config()
const { User } = require('./assets/js/data')

const bodyParser = require("body-parser");
const mongoose = require('mongoose');






const client = require('twilio')("insert account sid here", "insert accoutn token here");




 
mongoose.connect(process.env.url, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB server');
  })



  // 1. Import the express module
const express = require('express');

// 2. Create an instance of the express application
const app = express();
app.set('views', './static/html');
app.set('view engine', 'ejs');
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 3. Define the HTTP request handlers
app.get('/', (req, res) => {
  res.render('main')
});

app.get('/login', (req, res) => {
  res.render('login')
});

app.post('/login', (req, res) => {
  const filter = { phoneNumber: req.body.number}

  let code = (Math.floor(100000 + Math.random() * 900000));

  let code2 = req.body.code;

  
  


  

  if (req.body.number) {
    client.messages
  .create({
     body: code.toString(),
     from: '+19254024369',
     to: req.body.number
   })
  .then(message => console.log(message.sid));
    User.findOne({ phoneNumber: req.body.number }, async (err, user) => {
      if(user !== null) {
        const update = { code: code}
        await User.findOneAndUpdate(filter, update)
      console.log("User found")
      } else {
        const userModel = new User({
          phoneNumber: req.body.number,
          code: code
        })
        console.log('user saved!')
        await userModel.save()
  
        
      }
    })
  }

  if (code2) {
    User.findOne({ code: code2 }, async (err, user) => {
      if (user == null) {
        console.log('Invalid code')

      } else {
        console.log('nice')
      }
    })
  }

 
  
  
  
})



app.listen(3000, (err) => {
  console.log("running server on port")
  if (err) {
    return console.log(err);
  }
})