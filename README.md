# WeTube

## Pages : 

- [ ] asdf
- [ ] asdfsd
- [ ] login
- [x] Search
- [ ] User Detail
- [ ] Edit Profile
- [ ] Change password
- [ ] Upload 
- [ ] Video Detail
- [ ] Edit Video
- [ ] 뭐냐 중복 가입 막기 이런것도 추가해야 할 듯.
- [ ] 로그인을 안하면 id를 못찾는다는 문제 발생




오늘의 목표

1. 댓글 지우기 ~ DB 확인하기 (comment에서는 사라지는데, Video에서는 사라지지 않는다.)
2. 새로고침 하고 나서 댓글이 지워지지 않는다.
3. 새로고침 하면 사라지는 문제 해결하기.

## 8.11 Error Report

### 1. UnhandledPromiseRejectionWarning: CastError: Cast to ObjectId failed for value "" at path "_id" for model "Comment"

아예 comment를 못찾네

Object Id?

Mongo

이게 댓글을 달고 새로고침을 하는 경우랑 안하는 경우랑 다르다.
--> 강제로 새로고침을 시키던지 or 아니면 말던지 둘 중에 하나 골라야함. 강제로 새로 고침을 시키자. (아래 이유와 같다)

왜 댓글을 달고 새로고침을 하는 경우랑 안하는 경우랑 다를까? --> 예... 제가 createElement를 뺴먹었네요 머쓱

새로고침 안하는 경우 x버튼 누르면 console.log(li)가 ul이다. 

화면 처음 들어갈 때 querySelectorAll error

input에다가 하는게 아니라 form에다가 이벤트 리스너를 다는군요. 

왜 댓글 달고나서는 곧바로 못지우냐고 !!! 쥐엔장!!!
--오류로는 Cast to ObjectId failed for value "jsCommentList" at path "_id" for 
model "Comment" 라고 하는데; 

곧바로 만든건 commentId가 jsCommentList로 넘어온다. 왜지

input 을 button으로 하니까 해결됬다... 뭐지...?

