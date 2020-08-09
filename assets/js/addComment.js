import axios from "axios";
import { deleteComment } from "../../controllers/videoController";
const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const commentValue  = commentList.querySelectorAll("li");


let commentDeleteBtn;
let deleteObj; 

// handle submit -- > sendComment --> addComment 
// handle touchComment -->sendDeletecomment -->deleteComment

// event target의 버튼에게 또 리스너를 달아준다고...?
const touchComment = (event) => {
  commentDeleteBtn = event.target.querySelector("input");
  commentDeleteBtn.addEventListener("click",sendDeleteComment);
}


// Control comments number

const decreaseNumber = () =>{
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML,10) -1;
}


const increaseNumber = () =>{
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10)+1;
}



const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

//last
const deletecomment = event =>{
  event.preventDefault();
  deleteObj = event.target.parentNode.parentNode; 
  commentList.removeChild(deleteObj);
  decreaseNumber();
}


const addComment = (comment) =>{
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = comment;
  li.appendChild(span);
  commentList.prepend(li);
  increaseNumber();
}


// router에 보낸다. // 유저를 찾아서 
const sendDeleteComment = async(req,res) =>{
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment/delete`,
    method: "POST",
    });

    if (response === 200){
      console.log("사용자 확인 완료");

      deletecomment();
    }
}




const sendComment = async(comment) => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
      url: `/api/${videoId}/comment`,
      responseType : 'json',
      method: "POST",
      data: {
          comment
        },
      })
      .then((res)=>{
        if (res.status === 200){
          console.log("응답에 성공했어요!")
          addComment(comment);
        }        
      });

  };
  




function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}

function other(){
  commentValue.forEach((element)=>{
    element.addEventListener("mouseenter",touchComment);
  });

}
other();