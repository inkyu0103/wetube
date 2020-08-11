import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const commentValue  = commentList.querySelectorAll("li");


//문제점 id도 저장이 안되고 / 댓글 내용도 저장이 안된다.


// UI 에서만 없어지게
const deleteComment = async (event) => {
  event.preventDefault();
  console.log(event)
  const input = event.target;
  const form = input.parentNode;
  const li = form.parentNode;
  const videoId = window.location.href.split("/videos/")[1];

  
  console.log("님이 누르신 그 버튼 ... 바로 :" + li);


  console.log(input);
  console.log(form);
  console.log(li);
  //왜 생성하자마자는 li가 jscommentList가 되는거죠?



  const response = await axios({
    url : `/api/${videoId}/comment/delete`,
    method : "POST",
    data : {
      commentId : li.id
    }
  }).then((res)=>{
    console.log("성공 했다 이겁니다.후후")
    console.log(res);
    if (res.status === 200){
      commentList.removeChild(li);
      decreaseNumber();
    }
  })
}



const decreaseNumber = () =>{
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML,10) -1;
}


const increaseNumber = () =>{
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10)+1;
}





const addComment = (comment,commentId) =>{
  const li = document.createElement("li");
  const span = document.createElement("span");
  const form = document.createElement("form");
  const input = document.createElement("input");
  
  li.id = commentId;
  
  span.innerHTML = comment;
  
  form.className ="delete__comment";
  form.id="jsDeleteComment"
  
  input.type = "button"
  input.value = "X"
  
  commentList.prepend(li);
  
  li.appendChild(span);
  li.appendChild(form);
  
  form.appendChild(input)
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
    
    const handleSubmit = event => {
      event.preventDefault();
      const commentInput = addCommentForm.querySelector("input");
      const comment = commentInput.value;
      sendComment(comment);
      commentInput.value = "";
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