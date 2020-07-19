import routes from "../routes"
import Video from "../models/Video";


export const home = async (req,res) => {
    try{
        const videos = await Video.find({});
        res.render("home",{pageTitle:"Home", videos});
    } catch (err){
        console.log(err);
        res.render("home",{pageTitle:"Home",videos:[]});
    }
}



export const search =  (req,res) => {
    //const searchingBy = req.query.term  ES6 이전
    const {query:{term : searchingBy}} = req;
    res.render("Search", {pageTitle:"search",searchingBy,videos});
}



export const getUpload = (req,res) => res.render("upload", {pageTitle:"upload"});

export const postUpload = async (req,res) =>{
    const {
        body : {title, description},
        file : {path}
    } = req;

    const newVideo = await Video.create({
        fileUrl : path,
        title,
        description
    })
    console.log(newVideo);
    res.redirect(routes.videoDetail(newVideo.id));
}

export const getEditVideo = async(req,res) => {
    const {
        params:{id}
    } =req;

    try{
        const video = await Video.findById(id);

        res.render("editVideo",{pageTitle:`Edit ${video.title}`,video})
    }catch(error){
        res.redirect(routes.home);
    }
    res.render("editVideo", {pageTitle:"edit video"});

}

export const postEditVideo  = async(req,res) =>{
    const { 
        params :{id},
        body : {title,description}
    } = req;

    try{
        await Video.findOneAndUpdate({ _id:id },{title,description});
        res.redirect(routes.videoDetail(id));
    }catch(error){
        res.redirect(routes.home);
    }


}




export const videoDetail = async(req,res) => {

    const{
        params :{id}
    } = req;

    try{
        const video = await Video.findById (id);
        res.render("videoDetail", {pageTitle:"video detail",video});
    }catch(err){
        res.redirect(routes.home);
    }
    
}
export const deleteVideo = (req,res) => res.render("deleteVideo", {pageTitle:"delete"});
