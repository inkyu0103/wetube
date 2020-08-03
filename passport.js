import passport from "passport";

// Strategies
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import TwitStrategy from "passport-twitter";

import User from "./models/User";
import { githubLoginCallback, facebookCallback, twitterCallback } from "./controllers/userController";
import routes from"./routes";
import dotenv from "dotenv";
dotenv.config();


passport.use(User.createStrategy());

passport.use(
    new GithubStrategy(
    {
        clientID : process.env.GH_ID,
        clientSecret : process.env.GH_SECRET,
        callbackURL : `http://localhost:4000${routes.githubCallback}`
    }
    ,githubLoginCallback
    )
);

passport.use(
    new FacebookStrategy({
        clientID : process.env.FB_ID,
        clientSecret: process.env.FB_SECRET,
        callbackURL : `http://localhost:4000${routes.facebookCallback}`
    },
    facebookCallback
    )
)


passport.use(
    new TwitStrategy({
        consumerKey : process.env.TW_ID,
        consumerSecret : process.env.TW_SECRET,
        callbackURL : `http://localhost:4000${routes.twitterCallback}`
    },
    twitterCallback
    )
)




passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());