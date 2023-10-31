import 'reflect-metadata';
import express, {Express} from 'express';
import session from 'express-session';
import authRoutes from './routes/authRoutes';
import passport from './passportSetup';
import dataSource from "./ormconfig";

const app: Express = express();
const port = process.env.PORT || 4000;

dataSource.initialize().then(async () => {

    app.use(session({secret: process.env.SESSION_SECRET || 'keyboard cat', resave: true, saveUninitialized: false}));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/', authRoutes);

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });

}).catch(error => console.log(error));
