import 'reflect-metadata';
import express from 'express';
import authRoutes from './routes/authRoutes';
import dataSource from "./ormconfig";
import morgan from "morgan";
import cors from 'cors';
import session from 'express-session';
import passport from "./passportSetup";
import Miro from "@mirohq/miro-api";

const app = express();
const port = process.env.PORT || 4000;

app.use(session({secret: process.env.SESSION_SECRET || 'keyboard cat', resave: true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {origin: 'http://localhost:3000'};
app.use(cors(corsOptions));

app.use(express.json());

app.use(morgan('dev'));

const miro = new Miro()


app.use('/', authRoutes);


dataSource.initialize().then(() => {
    // Start the server
    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
}).catch(error => console.log(error));
