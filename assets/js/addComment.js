import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const commentValue  = commentList.querySelectorAll("li");


//문제점 id도 저장이 안되고 / 댓글 내용도 저장이 안된다.


// UI 에서만 없어지게
const deleteComment = async (event) => {
  
  const input = event.target;
  const  li= input.parentNode;
  const videoId = window.location.href.split("/videos/")[1];


  const response = await axios({
    url : `/api/${videoId}/comment/delete`,
    method : "POST",
    data : {
      commentId : li.id
    }
  }).then((res)=>{
    console.log(res);
  })
  
  
  event.preventDefault();
  commentList.removeChild(li);
  decreaseNumber();
}



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


const addComment = (comment,commentId) =>{
  const li = document.createElement("li");
  const span = document.createElement("span");
  const input = document.createElement("input");

  input.type = "submit"
  input.value = "X"
  span.innerHTML = comment;
  li.appendChild(span);
  li.appendChild(input);
  li.id = commentId;
  commentList.prepend(li);
  console.log(comment);

  input.addEventListener("click",deleteComment);
  increaseNumber();
}


// router에 보낸다. // 유저를 찾아서 

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
        const {
          data : {commentId},
          status
        } =res;
        if (status === 200){
          console.log("응답에 성공했어요!")
          console.log(commentId);
          addComment(comment,commentId)
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
    element.addEventListener("click",deleteComment);
  });

}
other();