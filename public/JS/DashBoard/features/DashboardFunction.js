//브라우저에서는 사용불가 
//const posts = require('./Dashboards');

//게시판 목록이 있을 경우 list-empty 비활성화
//게시글 로드 후 실행
const IsListEmpty = () => {
    const postEmpty = document.querySelector('.post-empty');
    const hasPost = document.querySelectorAll('.post-list').length > 0; //게시글 갯수
    postEmpty.style.display = hasPost ? 'none' : 'block';
}


//게시글 작성 버튼 클릭 시 실행
document.getElementById('writeButton').addEventListener('click',()=>{
    window.location.href = 'posts/write'; // posts/write -> write
})