import routes from "../routes"
import Video from "../models/Video";
import Comment from "../models/Comment";


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
        
        if(String(video.creator)!== req.user.id){ // 이 조건을 못 만족 시키는데
            throw Error();    
        }else{
            res.render("editVideo",{pageTitle:`Edit ${video.title}`,video});
        }
    }catch(error){
        console.log(error);
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
        const video = await Video.findById(id).populate('creator').populate("comments");
        res.render("videoDetail", {pageTitle:video.title, video});

    }catch(err){
        console.log(err);
        res.redirect(routes.home);
    }
    
}

// delete --> only get
export const deleteVideo = async(req,res) => {
    const {
        params : {id}
    } = req;
    

    try{
        const video = await Video.findById(id);
        if (String(video.creator) !== req.user.id){
            throw Error();
        }else{
            await Video.findOneAndRemove({_id:id});
            res.redirect(routes.home);
        }
    }catch(err){
        console.log(err);
        res.redirect(routes.home);
    }
        
}

export const postRegisterView = async(req,res) =>{
    const {
        params : {id}
    } = req;
    try{
        const video = await Video.findById(id)
        video.views += 1;
        video.save();
        res.status(200);
    }catch(err){
        res.status(400);
        res.end();
    }finally{
        res.end();
    }
}


// Add Comment
export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user
  } = req;

  console.log(user.id);
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id
    });
    video.comments.push(newComment.id);
    res.send({commentId : newComment.id});
    video.save();
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

// video를 찾는다 --> comment.id가 있나본데... 이걸 어떻게 찾지.
// requset에서 넘어온 정보는 params에 있다.
// 문제는 새로고침을 하면 다 날아가 버린다.
export const deleteComment = async(req,res) =>{
    try{
        const {
            params : { id }, // video id를 의미
            body : {commentId}
        } = req;
        //비디오를 찾는다. // 음 Comment에서 지우면 사라지나?
        //이게 되면 딱히 client에서 video를 보낼 필요가 없다. --> 수정해야하는 대상.

        await Comment.findByIdAndRemove(commentId);
        const video = await Video.findByIdAndUpdate(id);
        const newVideoComments = video.comments.filter((item)=>{
            return item !== commentId; 
        })
        video.save();
    }catch(err){
        console.log(err);
        res.status(400);
    }finally{
        res.end();
    }
    // DB에서 작동 확인
    // 내가 뭘 쓰는지 어떻게 알아요!!! ㅇ아아ㅏ아악!!!
    //이게 내생각에는 comment를 지워도 실제로 video의comments에 남아서 그런게 아닐까 싶어요.
}