//Note: js에서는 node.js의 path 모듈을 사용할 수 없다.
//NOTE : BASE_URL : getHeaderImage.js에서 이미 선언
// const BASE_URL = 'http://localhost:3000'; //서버 url 추가 -> 사진 로드 시 사용
const EditButton = document.getElementById('post-edit-btn');
const post_id = PostIdManager.getPostId();

// 게시글 데이터 로드
const postDataLoad = async () => {
    try {
        // 게시글 데이터 가져오기
        const response = await fetch(`http://localhost:3000/api/v1/posts/${post_id}/data`, {
            credentials: 'include'
        });
        const post = await response.json();

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
            authorImg: document.getElementById('post-author-img'),
            postImg: document.querySelector('.post-img'),
            likeBtn: document.querySelector('.likeNum-btn'),
            commentBtn: document.querySelector('.commentNum-btn'),
            viewBtn: document.querySelector('.view-btn'),
            commentList: document.querySelector('.comment-list')
        };

        // HTML 요소 업데이트
        elements.title.textContent = post.title;
        elements.authorName.textContent = post.name;
        elements.content.textContent = post.content;

        // 프로필 이미지 가져오기
        const { image: profileImage } = await fetch(`http://localhost:3000/api/v1/users/${post.user_id}/profile`, {
            credentials: 'include'
        }).then(res => res.json());
        
        elements.authorImg.src = `${BASE_URL}/images/profile/${profileImage}`;

        // 게시글 이미지 처리
        if (post.image) {
            elements.postImg.src = `${BASE_URL}/images/${post.image}`;
            elements.postImg.style.display = 'block';
        } else {
            elements.postImg.style.display = 'none';
        }

        // 메타 정보 업데이트
        elements.likeBtn.textContent = `좋아요 ${post.likes}`;
        elements.commentBtn.textContent = `댓글 ${post.comments_count}`;
        elements.viewBtn.textContent = `조회수 ${post.views}`;

        // 댓글 목록 렌더링
        elements.commentList.innerHTML = ''; //기존 댓글 초기화

        // Promise.all을 사용하여 병렬로 프로필 정보 가져오기
        await Promise.all(post.comments.map(async comment => {
            const { image: commentProfileImage } = await fetch(`http://localhost:3000/api/v1/users/${comment.user_id}/profile`, {
                credentials: 'include'
            }).then(res => res.json());

            const commentItem = document.createElement('li');
            commentItem.className = 'comment-item';
            commentItem.dataset.commentId = comment.comment_id;
            commentItem.innerHTML = `
                <div class="account-info">
                    <img class="account-img" src=${BASE_URL}/images/profile/${commentProfileImage} alt="작성자">
                    <span class="account-name">${comment.name}</span>
                    <span class="comment-date">${comment.created_date}</span>
                </div>
                <span id="comment-content" class="comment-content">${comment.content}</span>
                <div class="comment-btn">
                    <button id="comment-edit-btn" class="edit-btn">수정</button>
                    <button id="comment-delete-btn" class="delete-btn">삭제</button>
                </div>
            `;
            elements.commentList.appendChild(commentItem);
        }));

    } catch (error) {
        console.error('Error:', error);
        alert('게시글을 불러오는 중 오류가 발생했습니다.');
    }
};

// 수정 페이지로 이동
const moveEditPage = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/posts/${post_id}/check`, {
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
