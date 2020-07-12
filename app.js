import express from "express";
import morgan from"morgan"; // log를 수집하는 미들웨어
import helmet from "helmet";//helmet node.js 의 보안
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter"; // default로 import 하지 않을 경우 이렇게 import 한다. 
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes"
import { locaslsMiddleware } from "./middlewares";
  
const app = express();

app.use(helmet());  // protect
app.set('view engine',"pug");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(morgan("dev")); // log
app.use(locaslsMiddleware);
                
app.use(routes.home,globalRouter);
app.use(routes.users,userRouter);
app.use(routes.videos,videoRouter)


export default app;