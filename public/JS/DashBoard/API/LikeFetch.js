import { API_URL,urlUtils } from '/config/constants.js';
const likeButton = document.querySelector('.likeNum-btn');

let currentLikes = 0;
let isInitialized = false;

const post_id = urlUtils.getPostId();

const initializeLikes = () => {
    if(!isInitialized) {
        currentLikes = parseInt(likeButton.textContent.split(' ')[1]) || 0;
        isInitialized = true;
        console.log('초기 좋아요:', currentLikes);
    }
}

const likeClick = async () => {
    // click시 좋아요 초기화
    initializeLikes();

    const previousLikes = currentLikes;
    likeButton.classList.toggle('active');

    // 누르면 클라이언트에서 먼저 바꾸기
    currentLikes += likeButton.classList.contains('active') ? 1 : -1;
    likeButton.textContent = `좋아요 ${currentLikes}`;

    // Update(24.12.02): 버튼을 누르면 바로 서버에 반영 
    try {
        await patchLike();
    } catch(error) {
        // 에러 발생 시 상태 복구
        currentLikes = previousLikes;
        likeButton.textContent = `좋아요 ${currentLikes}`;
    }
}

// 서버에 좋아요 수정
const patchLike = async () => {
    // post_id가 정의되어 있는지 확인
    if (typeof post_id === 'undefined') {
        console.error('post_id가 정의되지 않았습니다');
        return;
    }

    try{
        const response = await fetch(`${API_URL}/posts/${post_id}/like`,{
            method : 'PATCH',
            credentials : 'include',
            headers :{'Content-Type': 'application/json'},
            //NOTE : JSON.stringify를 보낼때 {}객체형태로 보낸다.
            //NOTE : 클라이언트 - 서버 간 데이터 key 이름을 일치시켜야한다.
            body : JSON.stringify({likes : currentLikes})
        });

        // 성공 아닐 경우
        if(!response.ok) {
            throw new Error('좋아요 업데이트 중 오류 발생');
        }

    } catch(error) {
        console.error('좋아요 업데이트 중 오류 발생:', error);
        throw error; //에러 상위로 전파
    }
}

// 좋아요 토글 함수
likeButton.addEventListener('click', likeClick);