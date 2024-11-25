//Note: js에서는 node.js의 path 모듈을 사용할 수 없다.
const imagePath = '/images';
const EditButton = document.getElementById('post-edit-btn');

const pathParts = window.location.pathname.split('/');
const post_id = pathParts[pathParts.length -1];
window.post_id = post_id;

// 게시글 데이터 로드
const postDataLoad = async () => {
    try {
        console.log(post_id);

        // 게시글 데이터 가져오기
        const response = await fetch(`/api/v1/posts/${post_id}/data`);
        const post = await response.json();

        if (!response.ok) {
            if (response.status === 404) {
                // 404 에러 처리
                document.querySelector('main').innerHTML = `
                    <div class="error-container">
                        <h2>게시글을 찾을 수 없습니다</h2>
                        <p>요청하신 게시글이 존재하지 않거나 삭제되었을 수 있습니다.</p>
                        <button onclick="location.href='/api/v1/posts'">게시판으로 돌아가기</button>
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
            console.log(`경로 : ${imagePath}/${post.image}`);
            postImg.src = `${imagePath}/${post.image}`; // 이미지 경로는 서버 설정에 맞게 조정
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
                    <span class="comment-date">${new Date(comment.created_date).toLocaleString()}</span>
                </div>
                <span class="comment-context">${comment.content}</span>
                <div class="comment-btn">
                    <button class="edit-btn">수정</button>
                    <button class="delete-btn">삭제</button>
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
            const response = await fetch(`/api/v1/posts/${post_id}`, {
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
                window.location.href = '/api/v1/posts';
            }

        }catch(error){
            console.error('Error deleting post:', error); 
        }
    }
);
};

//수정 페이지로 이동
const moveEditPage = () =>{
    window.location.href = `/api/v1/posts/${post_id}/edit`;
};

// DOMContentLoaded 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', postDataLoad);
document.addEventListener('DOMContentLoaded', postDelete);
EditButton.addEventListener('click', moveEditPage);
