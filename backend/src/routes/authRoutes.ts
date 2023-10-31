import express from 'express';
import passport from '../passportSetup';
import {User} from "../entities/User";
import dataSource from "../ormconfig";  // Import the passport setup

const router = express.Router();

router.get('/auth/miro/callback',
    passport.authenticate('oauth2', {failureRedirect: '/'}),
    (req, res) => {
        res.redirect('/');
    }
);


router.post('/team/login', async (req, res) => {
    const {teamName} = req.body;
    let user = await dataSource.manager.findOne(User, {where: {teamName: teamName}});

    if (!user) {
        user = dataSource.manager.create(User, {teamName});
        await dataSource.manager.save(User, user);
    }

    // Here, instead of returning a JWT token, you can use the session to log in the user
    req.login(user, (err) => {
        if (err) {
            res.status(500).send('Error logging in.');
        } else {
            res.status(200).send('Logged in successfully.');
        }
    });
});


export default router;
