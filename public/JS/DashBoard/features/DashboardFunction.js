//브라우저에서는 사용불가 
//const posts = require('./Dashboards');

//게시판 목록이 있을 경우 list-empty 비활성화
function IsListEmpty(){
    const postEmpty = document.querySelector('.post-empty');
    postEmpty.style.display = document.querySelector('#post-container article') ? 'none' : 'block'; //post-container로 변경
}


//게시글 작성 버튼 클릭 시 실행
document.getElementById('writeButton').addEventListener('click',()=>{
    window.location.href = 'posts/write'; // posts/write -> write
})

// NOTE: DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    IsListEmpty();
});