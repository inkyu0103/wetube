import routes from "./routes";

export const locaslsMiddleware = (req,res,next)=> {
    res.locals.siteName = 'weTube';
    res.locals.routes = routes;
    next();
}