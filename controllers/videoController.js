import {videos} from "../db";
export const home = (req,res) => res.render("home",{pageTitle:"Home", videos});


export const search = (req,res) => {
    //const searchingBy = req.query.term  ES6 이전
    const {query:{term : searchingBy}} = req;
    res.render("Search", {pageTitle:"search",searchingBy});
}

export const upload = (req,res) => res.render("upload", {pageTitle:"upload"});
export const editVideo = (req,res) => res.render("editVideo", {pageTitle:"edit video"});

export const videoDetail = (req,res) => res.render("videoDetail", {pageTitle:"video detail"});
export const deleteVideo = (req,res) => res.render("deleteVideo", {pageTitle:"delete"});
