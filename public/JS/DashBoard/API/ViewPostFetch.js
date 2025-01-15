import { BASE_URL, API_URL, urlUtils} from '/config/constants.js';

const EditButton = document.getElementById('post-edit-btn');
const post_id = urlUtils.getPostId();

// 게시글 데이터 로드
const postDataLoad = async () => {
    try {
        // 게시글 데이터 가져오기
        const response = await fetch(`${API_URL}/posts/${post_id}/data`, {
            credentials: 'include'
        });
        const result = await response.json();

        if (!response.ok) {
            if (response.status === 401) {
                alert('로그인이 필요합니다.');
                return;
            }
            if (response.status === 404) {
                // 404 에러 처리
                document.querySelector('main').innerHTML = `
                    <div class="error-container">
                        <h2>게시글을 찾을 수 없습니다</h2>
                        <p>요청하신 게시글이 존재하지 않거나 삭제되었을 수 있습니다.</p>
                        <button onclick="location.href='/posts'">게시판으로 돌아가기</button>
                    </div>
                `;
                return;
            }
            throw new Error('게시글을 불러오는데 실패했습니다.');
        }

        // DOM 요소들을 한번에 가져오기
        const elements = {
            title: document.querySelector('h2'),
            authorName: document.querySelector('.account-name'),
            content: document.querySelector('.post-content'),
            profileImg: document.getElementById('post-author-img'),
            postImg: document.querySelector('.post-img'),
            likeBtn: document.querySelector('.likeNum-btn'),
            commentBtn: document.querySelector('.commentNum-btn'),
            viewBtn: document.querySelector('.view-btn'),
            commentList: document.querySelector('.comment-list')
        };

        // HTML 요소 업데이트
        elements.title.textContent = result.post.title;
        elements.authorName.textContent = result.post.name;
        elements.content.textContent = result.post.content;
        elements.profileImg.src = `${BASE_URL}/images/profile/${result.post.profile_image}`;

        // 게시글 이미지 처리
        if (result.post.post_image) {
            elements.postImg.src = `${BASE_URL}/images/${result.post.post_image}`;
            elements.postImg.style.display = 'block';
        } else {
            elements.postImg.style.display = 'none';
        }

        // 좋아요 누름 여부 표시
        if(result.is_liked){
            elements.likeBtn.classList.toggle('active');
            
        }
        // 메타 정보 업데이트
        elements.likeBtn.textContent = `좋아요 ${result.post.likes}`;
        elements.commentBtn.textContent = `댓글 ${result.post.comments_count}`;
        elements.viewBtn.textContent = `조회수 ${result.post.views}`;

        //NOTE: comment 테이블에서 가져옴

        // 댓글 목록 렌더링
        elements.commentList.innerHTML = ''; //기존 댓글 초기화

        result.comment.forEach(comment =>{

            const commentItem = document.createElement('li');
            commentItem.className = 'comment-item';
            commentItem.dataset.commentId = comment.comment_id;
            commentItem.innerHTML = `
                <div class="account-info">
                    <img class="account-img" src=${BASE_URL}/images/profile/${comment.profile_image} alt="작성자">
                    <span class="account-name">${comment.name}</span>
                    <span class="comment-date">${comment.created_at}</span>
                </div>
                <span id="comment-content" class="comment-content">${comment.content}</span>
                <div class="comment-btn">
                    <button id="comment-edit-btn" class="edit-btn">수정</button>
                    <button id="comment-delete-btn" class="delete-btn">삭제</button>
                </div>
            `;

            elements.commentList.appendChild(commentItem);
        });

    } catch (error) {
        console.error('Error:', error);
        alert('게시글을 불러오는 중 오류가 발생했습니다.');
    }
};

// 수정 페이지로 이동
const moveEditPage = async () => {
    try {
        const response = await fetch(`${API_URL}/posts/${post_id}/check`, {
            credentials: 'include'
        });

        if (!response.ok) {
            if (response.status === 403) {
                alert('게시글 작성자만 수정할 수 있습니다.');
                return;
            }
            throw new Error('게시글 수정 권한 확인 중 오류가 발생했습니다.');
        }

        if (response.status === 200) {
            window.location.href = `/posts/${post_id}/edit`;
        }
    } catch (error) {
        console.error('Error:', error);
        alert('게시글을 수정하는 중 오류가 발생했습니다.');
    }
};

// 이벤트 리스너
document.addEventListener('DOMContentLoaded', postDataLoad);
EditButton.addEventListener('click', moveEditPage);
