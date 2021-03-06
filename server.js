/* 
Import Dependencies
  * dotenv - environment variables
  * express - a framework for the server setup
  * logger - a debugging tool for development
  * cors - allows for cross-origin resource sharing, so that the frontend can interact with the backend
  * bodyParser - parses incoming request bodies
  * path - a node js module that provides a way of working with directories and file paths
  * mongoose - an ORM to model the collections in the database and facilitate querying
  * compression - a middleware that decreases the downloadable amount of data that’s served to users
  * AuthService - authentication service to be initialized
  * initializeRoutes - set up all the routes
*/

require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const compression = require('compression')
const { AuthService } = require('./services')
const initializeRoutes = require('./routes')

// Initialize the express app
const app = express()

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

// Ensure all traffic is passed through secure protocol only in production
if (process.env.NODE_ENV === 'production') {
  // Re-direct all unsecure traffic through the https protocol
  function requireHTTPS (req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (
      !req.secure &&
      req.get('x-forwarded-proto') !== 'https' &&
      process.env.NODE_ENV !== 'development'
    ) {
      return res.redirect('https://' + req.get('host') + req.url)
    }
    next()
  }
  app.use(requireHTTPS)
}


// Set up all middleware
app.use(cors())
app.use(logger('dev'))
app.use(compression())

// Connect to Mongo DB for both development and production with specified options
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/vogiDB', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())

/*
    Create new authentication instance and pass the initialized express in to the AuthService option parameter object
    Initialize authentication for volunteer and partner sign up and login
*/
const authService = new AuthService({ app })
authService.initialize()

// Send every other request to the React app
// Define any API routes before this runs

initializeRoutes(app)

app.use((req, res) =>
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
)
/*
  Set's the PORT to 3000 when in local development OR to the PORT set by Heroku's environment when deployed
  The server accepts the PORT as a parameter to listen on.
*/
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
