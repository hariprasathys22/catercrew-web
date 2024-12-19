import express from 'express';
import connectDB from './config/database';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute';
dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 5000;

connectDB();

app.use(express.json());
app.use('/auth', authRoute)

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})
