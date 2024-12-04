//Note: js에서는 node.js의 path 모듈을 사용할 수 없다.
//NOTE : BASE_URL : getHeaderImage.js에서 이미 선언
// const BASE_URL = 'http://localhost:3000'; //서버 url 추가 -> 사진 로드 시 사용
const EditButton = document.getElementById('post-edit-btn');

// 게시글 데이터 로드
const postDataLoad = async () => {
    try {
        const post_id = PostIdManager.getPostId();

        // 게시글 데이터 가져오기
        const response = await fetch(`http://localhost:3000/api/v1/posts/${post_id}/data`,{
            credentials : 'include'
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

        // HTML 요소 업데이트
        document.querySelector('h2').textContent = post.title;
        document.querySelector('.account-name').textContent = post.name;
        document.querySelector('.post-content').textContent = post.content;

        // 이미지가 있는 경우에만 이미지 표시
        const postImg = document.querySelector('.post-img');
        if (post.image) {
            postImg.src = `${BASE_URL}/images/${post.image}`; // 이미지 경로는 서버 설정에 맞게 조정
            postImg.style.display = 'block';
        } else {
            postImg.style.display = 'none';
        }

        // 메타 정보 업데이트
        document.querySelector('.likeNum-btn').textContent = `좋아요 ${post.likes}`;
        document.querySelector('.commentNum-btn').textContent = `댓글 ${post.comments_count}`;
        document.querySelector('.view-btn').textContent = `조회수 ${post.views}`;

        // 댓글 목록 렌더링
        const commentList = document.querySelector('.comment-list');
        commentList.innerHTML = ''; // 기존 댓글 초기화

        post.comments.forEach(comment => {
            const commentItem = document.createElement('li');
            commentItem.className = 'comment-item';
            commentItem.setAttribute('data-comment-id', comment.comment_id);
            commentItem.innerHTML = `
                <div class="account-info">
                    <img class="account-img" src="../image/" alt="작성자">
                    <span class="account-name">${localStorage.getItem('name')}</span>
                    <span class="comment-date">${comment.created_date}</span>
                </div>
                <span id="comment-content" class="comment-content">${comment.content}</span>
                <div class="comment-btn">
                    <button id="comment-edit-btn" class="edit-btn">수정</button>
                    <button id="comment-delete-btn" class="delete-btn">삭제</button>
                </div>
            `;
            commentList.appendChild(commentItem); //ul 태그 안에 넣기
        });

    } catch (error) {
        console.error('Error:', error);
        alert('게시글을 불러오는 중 오류가 발생했습니다.');
    }
};

//게시글 삭제
const postDelete = async()=> {
    const DeleteButton = document.getElementById('post-delete-btn');
    DeleteButton.addEventListener('click', async ()=> {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/posts/${post_id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
    
            if(!response.ok){
                if(response.status === 404){
                    throw new Error('Post not found');
                }
                throw new Error('Failed to delete post');
            }
    
            if(response.status === 204){
                alert('게시글이 삭제되었습니다.');
                window.location.href = '/posts';
            }

        }catch(error){
            console.error('Error deleting post:', error); 
        }
    }
);
};

//수정 페이지로 이동
const moveEditPage = () =>{
    window.location.href = `/posts/${post_id}/edit`;
};

// DOMContentLoaded 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', postDataLoad);
document.addEventListener('DOMContentLoaded', postDelete);
EditButton.addEventListener('click', moveEditPage);
