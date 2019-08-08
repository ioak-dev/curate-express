import express from 'express';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3200;
app.use(cors());


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

import mongoose from 'mongoose';
mongoose.connect('mongodb+srv://curate:curate@cluster0-f9esg.mongodb.net/curate');

import bodyParser from 'body-parser';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import AuthController from './app/controller/AuthController';
app.use('/api', AuthController);