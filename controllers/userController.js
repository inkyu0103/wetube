import routes from "../routes";
import User from "../models/User";
import passport from"passport";

export const getJoin = (req,res) => {
    res.render("join",{pageTitle :"Join" });
}

export const postJoin = async (req,res,next)=>{

    const{
        body :{name,email,password,password2}
    } = req;

    if(password !== password2){
        res.status(400);
        res.render("join",{pageTitle:"Joim"});
    }else{
        try{
            //To do : Register User
            const user = await User({
                name,
                email
            });
            await User.register(user,password);
            next();
        }catch(err){
            console.log(err);
            res.redirect(routes.home);
        }
    }


}

export const getLogin = (req,res) => res.render("login",{pageTitle : "Login"});

export const postLogin = passport.authenticate('local',{
    failureRedirect : routes.login,
    successRedirect : routes.home
});

export const logout = (req,res) => {
    //logout

    res.redirect(routes.home);
}


export const userDetail = (req,res) => res.render("userDetail", {pageTitle : "userDetail"});

export const changePassword = (req,res) => res.render("changePassword",{pageTitle :"change" });
export const editProfile = (req,res) => res.render("editProfile",{pageTitle: "editProfile"})

