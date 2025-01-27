import { API_URL,urlUtils } from '/config/constants.js';
import { playLikeAnimation } from '/JS/DashBoard/features/AnimationLike.js';

const likeButton = document.querySelector('.likeNum-btn');

let currentLikes = 0;

//(+) 좋아요를 눌렀는지 취소했는지 확인
let isLike = false;
let isInitialized = false;

const post_id = urlUtils.getPostId();

const initializeLikes = () => {
    if(!isInitialized) {
        currentLikes = parseInt(likeButton.textContent.split(' ')[1]) || 0;
        isInitialized = true;
        console.log('초기 좋아요:', currentLikes);
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
            body : JSON.stringify({likes : isLike})
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

const likeClick = async () => {

    // click시 좋아요 초기화
    initializeLikes();
    
    const previousLikes = currentLikes;
    const previousState = isLike;

    // 누르면 클라이언트에서 먼저 바꾸기
    // 좋아요 상태 전환 + 애니메이션 실행
    likeButton.classList.toggle('active');
    isLike = likeButton.classList.contains('active');
    currentLikes += isLike ? 1 : -1;
    if(isLike) {
        playLikeAnimation();
    }
    likeButton.textContent = `좋아요 ${currentLikes}`;


    // Update(24.12.02): 버튼을 누르면 바로 서버에 반영 (좋아요를 가져오지는 않는다?)
    try {
        await patchLike();
    } catch(error) {
        // 에러 발생 시 상태 복구
        likeButton.classList.toggle('active', previousState);
        isLike = previousState;
        currentLikes = previousLikes;
        likeButton.textContent = `좋아요 ${currentLikes}`;
        alert('좋아요 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
}


// 좋아요 토글 함수
likeButton.addEventListener('click', likeClick);