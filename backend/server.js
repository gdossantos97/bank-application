require('dotenv').config();
const express = require('express')
const color = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 4000

const path = require("path")

//connect to mongoDB
connectDB()

const app = express();

// built-in middleware for json 
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Api routes to localhost://4000/api/route

app.use('/api/transfers', require('./routes/transferRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


var __dirname = path.resolve()
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.use(errorHandler)



app.listen(process.env.PORT || 4000, () => 
console.log(`server started on port ${port}`)
)
