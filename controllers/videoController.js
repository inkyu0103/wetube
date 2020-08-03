import routes from "../routes"
import Video from "../models/Video";


export const home = async (req,res) => {
    try{
        const videos = await Video.find({}).sort({_id:-1});
        res.render("home",{pageTitle:"Home", videos});
    } catch (err){
        console.log(err);
        res.render("home",{pageTitle:"Home",videos:[]});
    }
}



export const search =  async(req,res) => {
    //const searchingBy = req.query.term  ES6 이전
    const {
        query : { term : searchingBy}
    } = req;
    let videos = [];

    try{
        videos = await Video.find({title: { $regex : searchingBy, $options:"i"}});
    }catch(err){
        console.log(err);
    }
    res.render("search",{pageTitle : "Search",searchingBy,videos});
    
}


// Upload
export const getUpload = (req,res) => res.render("upload", {pageTitle:"upload"});

export const postUpload = async (req,res) =>{
    const {
        body : {title, description},
        file : {path}
    } = req;

    const newVideo = await Video.create({
        fileUrl : path,
        title,
        description,
        creator : req.user.id

    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo._id));
}

//Edit

export const getEditVideo = async(req,res) => {
    const {
        params:{id}
    } =req;


    try{
        const video = await Video.findById(id);
        if(video.creator !== req.user.id){
            throw Error();    
        }else{
        res.render("editVideo",{pageTitle:`Edit ${video.title}`,video});
        }
    }catch(error){
        res.redirect(routes.home);
    }

}

export const postEditVideo  = async(req,res) =>{
    const { 
        params :{id},
        body : {title,description}
    } = req;

    console.log(req.description);
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
        const video = await Video.findById(id).populate('creator');
        res.render("videoDetail", {pageTitle:video.title,video});

        console.log(video);
    }catch(err){
        res.redirect(routes.home);
    }
    
}

// delete --> only get
export const deleteVideo = async(req,res) => {
    const {
        params : {id}
    } = req;

    try{
        if (video.creator !== req.user.id){
            throw Error();
        }else{
            await Video.findOneAndRemove({_id:id});
        }
    }catch(err){
        console.log(err);
        res.redirect(routes.home);
    }
        
    

    


}
