const addCommentButton = document.getElementById('comment-create-btn');
const editCommentButton = document.getElementById('comment-edit-btn'); //수정 누르면 그 자리에서 form을 받을 수 있도록
const deleteCommentButton = document.getElementById('comment-delete-btn');
const commentList = document.getElementById('comment-list'); //댓글리스트 부모

let currentCommentId = null;
// const pathParts = window.location.pathname.split('/');
// const post_id = pathParts[pathParts.length -1];


const addComment = async() => {

    const user_id = localStorage.getItem('user_id');
    const content = document.getElementById('comment-text').value;

    const data = {
        post_id : window.post_id,
        user_id : user_id,
        content: content
    };

    try{

        const response = await fetch(`/api/v1/posts/${post_id}/comments`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify(data) //json형식으로 요청

        });

        const result = await response.json();

        if(response.status === 400){
            alert(result.message);
            return;
        }

        if(response.status === 201){
            alert(result.message);
            window.location.reload();
        }

    }catch(error){
        console.error('댓글 등록 중 오류 발생:', error);
    }

};

const viewEditComment = async(event) => {

    const target = event.target;  //사용자가 클릭한 실제 html 요소

    // 클릭한 element가 수정 버튼인지 확인
    if (target.classList.contains('edit-btn')) {
        // 가까운 .comment-item 찾기 -> data-comment-id 값 가져오기
        const commentItem = target.closest('.comment-item');
        if (commentItem) {
            //dataset :data- 속성을 읽을 때 사용
            currentCommentId = commentItem.dataset.commentId;
            console.log('수정할 댓글 ID:', currentCommentId);

            //NOTE : 댓글 가져오는 방법
            // 1. 서버에서 fetch로 가져오기
            // 2. DOM에서 직접 content 가져오기
            // 이미 페이지에 내용이 렌더링 되어있으므로 2번으로 가져옴

            //댓글 가져오기
            const commentContent = commentItem.querySelector('.comment-content').textContent;
            console.log('commentContent:', commentContent);

            //입력폼에 표시
            document.getElementById('comment-text').value = commentContent;

            //댓글 등록 -> 댓글 수정 버튼으로 변경
            const editBtn = document.getElementById('comment-create-btn');
            editBtn.textContent = '댓글 수정';
            editBtn.removeEventListener('click', addComment);
            editBtn.addEventListener('click', editComment);
        }else{
            alert('댓글을 찾을 수 없습니다');
        }
    }
};

//수정 후 reload
const editComment = async() => {
    const content = document.getElementById('comment-text').value;

    try{
        const response = await fetch(`/api/v1/posts/${post_id}/comments/${currentCommentId}`,{
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content })
        });
        
        const result = await response.json();

        if(response.status === 400){ //댓글 입력x
            alert(result.message);
            return;
        }
        if(response.status === 200){ //댓글 수정 성공
            alert(result.message);
            window.location.reload();
        }
    }catch(error){
        console.error('댓글 수정 중 오류 발생:', error);
    }

};

const deleteComment = async() => {};

addCommentButton.addEventListener('click', addComment);
commentList.addEventListener('click', viewEditComment); //부모요소에 이벤트 추가
editCommentButton.addEventListener('click', editComment);
deleteCommentButton.addEventListener('click', deleteComment);



