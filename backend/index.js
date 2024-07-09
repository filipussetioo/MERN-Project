import express, { response } from "express";
import { PORT, MONGODBSRV } from "./config.js";
import mongoose from "mongoose";
import summaryRoute from "./routes/summaryRoute.js";
import segmentRoute from "./routes/segmentRoute.js";
import userRoute from "./routes/userRoute.js";
import cors from 'cors';

const app = express();

app.use(express.json());

// app.use(cors());

app.use(cors({
    origin: 'https://mern-project-rho-ashy.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeader: ['Content-Type'],
}));

app.use('/summary', summaryRoute);
app.use('/segment', segmentRoute);
app.use('/user', userRoute);

mongoose.connect(MONGODBSRV).then(() => {
    console.log('App connected!');
    app.listen(PORT, () => {
        console.log(`App is litening to port: ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
})