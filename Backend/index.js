import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import connectDB from './config/MongoDatabase.js';
import MongoStore from 'connect-mongo';
import FileUpload from 'express-fileupload';

import PayrollRoute from './routes/PayrollRoute.js';
import AuthRoute from './routes/AuthRoute.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors ({
    credentials: true,
    origin: 'http://localhost:5173'
}));


app.use(express.json());

app.use(FileUpload());
app.use(express.static("public"));

app.use(PayrollRoute);
app.use(AuthRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running...');
});