import passport from 'passport';
import fetch from 'node-fetch';
const OAuth2Strategy = require('passport-oauth2').Strategy;
import { User } from './entities/User';
import dataSource from './ormconfig';

passport.serializeUser((user: User, done: any) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done: any) => {
    const user = await dataSource.manager.findOne(User, { where: { id: id } });
    done(null, user);
});

passport.use(new OAuth2Strategy({
        authorizationURL: 'https://miro.com/oauth/authorize',
        tokenURL: 'https://api.miro.com/v1/oauth/token',
        clientID: process.env.MIRO_CLIENT_ID,
        clientSecret: process.env.MIRO_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/auth/miro/callback',
    },
    async (accessToken: any, refreshToken: any, params: any, _: any, done: any) => {
        if (!params.user_id) {
            return done(new Error('User ID is missing from the OAuth callback parameters.'));
        }

        let user = await dataSource.manager.findOne(User, { where: { id: params.user_id } });

        if (!user) {
            // If user doesn't exist, we just pass a "not registered" flag along with the user details.
            // The front end should interpret this flag and prompt the user to register or log in with their team name.
            return done(null, { id: params.user_id, notRegistered: true });
        }

        done(null, user);
    }));

export default passport;
