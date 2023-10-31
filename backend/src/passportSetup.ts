import passport from 'passport';

const OAuth2Strategy = require('passport-oauth2').Strategy;
import {User} from './entities/User';
import dataSource from './ormconfig';

passport.serializeUser((user: User, done: any) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done: any) => {
    const user = await dataSource.manager.findOne(User, {where: {id: id}});
    done(null, user);
});


passport.use(new OAuth2Strategy({
        authorizationURL: 'https://miro.com/oauth/authorize',
        tokenURL: 'https://miro.com/oauth/token',
        clientID: process.env.MIRO_CLIENT_ID,
        clientSecret: process.env.MIRO_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/auth/miro/callback', // Adjust this to your callback endpoint
    }
    ,
    async (accessToken: any, refreshToken: any, params: any, _: any, done: any) => {
        const userDetailsResponse = await fetch(`https://api.miro.com/v2/users/${params.user_id}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        });
        const userDetails = await userDetailsResponse.json();

        let user = await dataSource.manager.findOne(User, params.user_id);
        if (!user) {
            user = dataSource.manager.create(User, {
                id: params.user_id,
                teamId: userDetails.teamId, // Adjust based on actual API response
                teamName: userDetails.teamName // Assuming the API returns the team name
            });
            await dataSource.manager.save(User, user);
        }

        done(null, user);
    }
));

export default passport;
