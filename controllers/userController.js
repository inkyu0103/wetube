import routes from "../routes";
import User from "../models/User";
import passport from "passport";

// Join
export const getJoin = (req,res) => {
    res.render("join",{pageTitle :"Join" });
}

export const postJoin = async (req,res,next)=>{
    const{
        body :{name,email,password,password2}
    } = req;

    if(password !== password2){
        res.status(400);
        res.render("join",{pageTitle:"Join"});
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



// Login
export const getLogin = (req,res) => res.render("login",{pageTitle : "Login"});

export const postLogin = passport.authenticate('local',{
    failureRedirect : routes.login,
    successRedirect : routes.home
});


// Logout
export const logout = (req,res) => {
    //logout
    req.logout();
    res.redirect(routes.home);
}


export const getMe = (req,res) =>{
    res.render("userDetail", {pageTitle : "userDetail", user: req.user});
}



export const userDetail = async(req,res) => {
    const { params : {id}} = req;
    try{
        const user = await User.findById(id).populate('videos');
        res.render("userDetail",{pageTitle:"User Detail",user});
        console.log(user);
    }catch(error){
        res.redirect(routes.home);
    }
}

export const getChangePassword = (req,res) => res.render("changePassword",{pageTitle :"change" });

export const postChangePassword = async(req,res) => {
    const{
        body:{ oldPassword, newPassword, newPassword1 }
    } = req;

    try{
        if(newPassword !== newPassword1){
            res.status(400);
            res.redirect(routes.changePassword);
            return;
        }
        await req.user.changePassword(oldPassword,newPassword);
        res.redirect(routes.me);

    }catch(err){
        res.status(400);
        console.log(err);
        res.redirect(routes.changePassword);
    }


}





export const getEditProfile = (req,res) => {
    res.render("editProfile",{pageTitle:"Edit Profile"});
}
export const postEditProfile = async(req,res) =>{

    console.log("postEditProfile : " + req)
    const {
        body : {name,email},
        file 
    } = req;
    

    try{
        await User.findByIdAndUpdate(req.user.id,
            {
            name,
            email,
            avatarUrl : file ? file.path : req.user.avatarUrl

        });
        console.log("await postEditprofile "+ file.path)
        res.redirect(routes.me);
    }catch(err){
        res.redirect(routes.editProfile);
    }
}

// Github

export const githubLoginCallback = async( _, __,profile, cb ) => {

    const { _json: {id, avatar_url : avatarUrl ,name,email} } = profile;
    try{
        const user = await User.findOne({email});
        
        if(user){
            user.githubId =id; 
            user.avatarUrl = avatarUrl; 
            user.name = name;
            user.save();
            return cb(null,user);
        }
        const newUser= await User.create({
            email,
            name,
            githubId :id,
            avatarUrl
        })
        return cb(null,newUser);
    }catch(err){
        return cb(err);
    }

}



export const githubLogin = passport.authenticate("github");

export const postGithubLogin = (req,res) =>{
    res.redirect(routes.home);
}


//Facebook 

export const facebookLogin = passport.authenticate("facebook");


export const facebookCallback = async(accessToken, refreshToken, profile, cb) =>{
    console.log(accessToken, refreshToken, profile, cb);    
    
}

export const postFacebookLogin = async(req,res) =>{
    
}


//Twitter 

export const twitterLogin = passport.authenticate("twitter");

export const twitterCallback = async(token, tokenSecret, profile, cb) =>{
    console.log(token, tokenSecret, profile, cb);
}
export const postTwitterLogin = (req,res)=>{
    res.redirect(routes.home);
}