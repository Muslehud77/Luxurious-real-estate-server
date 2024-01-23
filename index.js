
const express = require('express')
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const port = process.env.PORT || 5000;
const app = express();
require("dotenv").config();

//middlewares
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DBuri).then(()=>{
  console.log("Connected to db");
}).catch(err=> {
  console.log(err);
})









app.get("/", (req, res) => {
  res.send(`ListEase is listening on port ${port}`);
});
app.listen(port, () => {
  console.log(`Luxurious is listening on port ${port}`);
});