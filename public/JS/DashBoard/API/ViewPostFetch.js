//Note: js에서는 node.js의 path 모듈을 사용할 수 없다.
//NOTE : BASE_URL : getHeaderImage.js에서 이미 선언
// const BASE_URL = 'http://localhost:3000'; //서버 url 추가 -> 사진 로드 시 사용
const EditButton = document.getElementById('post-edit-btn');
const post_id = PostIdManager.getPostId();

// 게시글 데이터 로드
const postDataLoad = async () => {
    try {
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

        //프로필 이미지 : getHeaderImage.js에서 이미 선언

        // 게시글 이미지가 있는 경우에만 이미지 표시
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

        post.comments.forEach(async comment => {
            //FIXME: 추후 수정 필요. 비효율적
            //사용자 프로필 정보 가져오기
            const profileResponse = await fetch(`http://localhost:3000/api/v1/users/${comment.user_id}/profile`,{
                credentials : 'include'
            });
            const profile = await profileResponse.json();

            const commentItem = document.createElement('li');
            commentItem.className = 'comment-item';
            commentItem.setAttribute('data-comment-id', comment.comment_id);
            commentItem.innerHTML = `
                <div class="account-info">
                    <img class="account-img" src=${BASE_URL}/images/profile/${profile.image} alt="작성자">
                    <span class="account-name">${comment.name}</span>
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

//수정 페이지로 이동
const moveEditPage = async () =>{
    try{
        const response = await fetch(`http://localhost:3000/api/v1/posts/${post_id}/check`,{
            credentials : 'include'
        });

        if(!response.ok){
            if(response.status === 403){
                alert('게시글 작성자만 수정할 수 있습니다.');
                return;
            }
            throw new Error('게시글 수정 권한 확인 중 오류가 발생했습니다.');
        }

        //권한 확인 후 이동
        if(response.status === 200){
            window.location.href = `/posts/${post_id}/edit`;
        }
    }catch(error){
        console.error('Error:', error);
        alert('게시글을 수정하는 중 오류가 발생했습니다.');
    }


    
};

// DOMContentLoaded 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', postDataLoad);
EditButton.addEventListener('click', moveEditPage);
