import express from "express";
import morgan from"morgan"; // log를 수집하는 미들웨어
import helmet from "helmet";//helmet node.js 의 보안
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter"; // default로 import 하지 않을 경우 이렇게 import 한다. 
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";

import routes from "./routes"
import { locaslsMiddleware } from "./middlewares";
import passport from "passport";
import session from "express-session";
import "./passport";
import dotenv from"dotenv";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
dotenv.config();

const app = express();

const CookieStore = MongoStore(session)


app.use(helmet());  // protect
app.set('view engine',"pug");
app.use("/uploads",express.static("uploads"));
app.use("/static",express.static("static"));


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(morgan("dev")); // log
app.use(session({
    secret : process.env.COOKIE_SECRET,
    resave : true,
    saveUninitialized : false,
    store:new CookieStore({mongooseConnection : mongoose.connection})
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(locaslsMiddleware);

                
app.use(routes.home,globalRouter);
app.use(routes.users,userRouter);
app.use(routes.videos,videoRouter);
app.use(routes.api,apiRouter);



export default app;
