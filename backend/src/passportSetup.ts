import passport from 'passport';
import fetch from 'node-fetch';
const OAuth2Strategy = require('passport-oauth2').Strategy;
import { MiroUser } from './entities/MiroUser';
import dataSource from './ormconfig';

passport.serializeUser((user: MiroUser, done: any) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done: any) => {
    const user = await dataSource.manager.findOne(MiroUser, { where: { id: id }, relations: ["team"] });
    done(null, user);
});

passport.use(new OAuth2Strategy({
        authorizationURL: 'https://miro.com/oauth/authorize',
        tokenURL: 'https://miro.com/oauth/token',
        clientID: process.env.MIRO_CLIENT_ID,
        clientSecret: process.env.MIRO_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/auth/miro/callback',
    },
    async (accessToken: any, refreshToken: any, params: any, _: any, done: any) => {
        if (!params.user_id) {
            return done(new Error('MiroUser ID is missing from the OAuth callback parameters.'));
        }

        let user = await dataSource.manager.findOne(MiroUser, { where: { id: params.user_id }, relations: ["team"] });

        if (!user) {
            // If user doesn't exist, we send a "notRegistered" flag.
            return done(null, { id: params.user_id, notRegistered: true });
        }

        if (!user.team) {
            // If user exists but doesn't have an associated team.
            return done(null, { id: params.user_id, noTeam: true });
        }

        done(null, user);
    }));

export default passport;
