const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();
const port = 3000;

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://darcon:dtc4516Dtc@ac-jhsptf2-shard-00-00.3lsv8z3.mongodb.net:27017,ac-jhsptf2-shard-00-01.3lsv8z3.mongodb.net:27017,ac-jhsptf2-shard-00-02.3lsv8z3.mongodb.net:27017/?ssl=true&replicaSet=atlas-ajck32-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);




// cookies
//app.get('/set-cookies' , (req, res) => {

   //res.setHeader('Set-Cookie', 'newUser=true');

 //  res.cookie('newUser', false);
 //  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, secure: true});

 //  res.send('you got the cookies!')

//});

//app.get('/read-cookies', (req, res) => {

 //  const cookies = req.cookies;
 //  console.log(cookies.newUser);

 //  res.json(cookies);

//});



//const express = require('express');
//const mongoose = require('mongoose');
//const authRoutes = require('./routes/authRoutes');

//const app = express();

// middleware
//app.use(express.static('public'));
//app.use(express.json());

// view engine
//app.set('view engine', 'ejs');

// database connection
//const dbURI = 'mongodb://darcon:dtc4516Dtc@ac-jhsptf2-shard-00-00.3lsv8z3.mongodb.net:27017,ac-jhsptf2-shard-00-01.3lsv8z3.mongodb.net:27017,ac-jhsptf2-shard-00-02.3lsv8z3.mongodb.net:27017/?ssl=true&replicaSet=atlas-ajck32-shard-0&authSource=admin&retryWrites=true&w=majority';
//mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  //.then((result) => app.listen(3001))
  //.catch((err) => console.log(err));

// routes
//app.get('/', (req, res) => res.render('home'));
//app.get('/smoothies', (req, res) => res.render('smoothies'));
//app.use(authRoutes);