//Note: js에서는 node.js의 path 모듈을 사용할 수 없다.
const imagePath = '/images';

document.addEventListener('DOMContentLoaded', async () => {
    //Note: 쿼리 파라미터를 추출할때 사용
    // const urlParams = new URLSearchParams(window.location.search);
    // const post_id = urlParams.get('post_id');

    let pathParts = window.location.pathname.split('/');
    const post_id = pathParts[pathParts.length -1];
    console.log(post_id);
    try {
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
                        <button onclick="location.href='api/v1/posts'">게시판으로 돌아가기</button>
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
            commentItem.innerHTML = `
                <div class="account-info">
                    <img class="account-img" src="../image/" alt="작성자">
                    <span class="account-name">${comment.user_id}</span>
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
});
