const likeButton = document.querySelector('.likeNum-btn');

let currentLikes = 0;

const initializeLikes = async () =>{
    currentLikes = parseInt(likeButton.textContent.split(' ')[1]);   
}

const likeClick = () => {

    likeButton.classList.toggle('active');

    //누르면 클라이언트에서 먼저 바꾸기
    if(likeButton.classList.contains('active')){
        currentLikes +=1;
        console.log('누름:',currentLikes);

    }
    else{
        currentLikes -=1;
        console.log('해제:',currentLikes);
    }

    likeButton.textContent = `좋아요 ${currentLikes}`;
};

const patchLike = async() => {

    // post_id가 정의되어 있는지 확인
    if (typeof post_id === 'undefined') {
        console.error('post_id가 정의되지 않았습니다');
        return;
    }

    try{
        const response = await fetch(`/api/v1/posts/${post_id}/like`,{
            method : 'PATCH',
            credentials : 'include',
            headers :{'Content-Type': 'application/json'},
            //NOTE : JSON.stringify를 보낼때 {}객체형태로 보낸다.
            //NOTE : 클라이언트 - 서버 간 데이터 key 이름을 일치시켜야한다.
            body : JSON.stringify({likes : currentLikes})
        });

        //성공 아닐 경우
        if(!response.ok){
            alert('좋아요 업데이트 중 문제가 발생했습니다.');
            return;
        }

    }catch(error){
        console.error('좋아요 업데이트 중 오류 발생:', error);
    }

}

//페이지 로드 시 초기 좋아요 수
document.addEventListener('DOMContentLoaded',initializeLikes);

//좋아요 토글 함수
likeButton.addEventListener('click',likeClick)

//페이지 언로드 시 서버로 데이터 전송
window.addEventListener('beforeunload',patchLike);