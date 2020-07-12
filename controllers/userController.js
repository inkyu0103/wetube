export const join = (req,res) => res.render("join",{pageTitle :"Join" });
export const login = (req,res) => res.render("login",{pageTitle : "Login"});
export const logout = (req,res) => res.render("logout",{pageTitle : "logout"});
export const users = (req,res) => res.render("USERS",{pageTitle : "users"});
export const userDetail = (req,res) => res.render("userDetail",{pageTitle : "userDetail"});
export const changePassword = (req,res) => res.render("changePassword",{pageTitle :"change" });
export const editProfile = (req,res) => res.render("editProfile",{pageTitle: "editProfile"})

