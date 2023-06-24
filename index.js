require("dotenv").config();
// console.log(process.env.DB_PASS);
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors())
app.use('*',cors())
app.get("/", (req, res) => res.send("Hello world! once again"));
// var bodyParser = require('body-parser');
//app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://shuvokoiri0:XFAbGNBB4n3KKCBn@cluster0.pvp8qg6.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

console.log(process.env.PORT)

const ProductsRouter = require("./Router/ProductsRouter");
const CategoryRouter = require("./Router/CategoryRouter");
const UserRouter = require("./Router/UserRouter");
const OrderRouter = require("./Router/OrderRouter");


app.use("/Products", ProductsRouter);
app.use("/User", UserRouter);
app.use("/Category", CategoryRouter);
app.use("/Order", OrderRouter);




mongoose.set('strictQuery', true)
mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "AEC"
    }
  )
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch(err => {
    console.log(err);
  });


// Define routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
