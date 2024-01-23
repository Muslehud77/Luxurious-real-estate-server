import express from 'express';
import mongoose  from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();



// route imports
import userRouter from "./Routes/User.route.js";
import authRouter from './Routes/auth.route.js';



//middlewares
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DBuri).then(()=>{
  console.log("Connected to db");
}).catch(err=> {
  console.log(err);
})




// actual routes
app.use('/api/user', userRouter)

app.use('/api/auth',authRouter)



//middleware
app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})

app.get("/", (req, res) => {
  res.send(`ListEase is listening on port ${port}`);
});
app.listen(port, () => {
  console.log(`Luxurious is listening on port ${port}`);
});