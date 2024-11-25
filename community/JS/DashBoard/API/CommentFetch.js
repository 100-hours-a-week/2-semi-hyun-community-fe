const addCommentButton = document.getElementById('comment-create-btn');
const editCommentButton = document.getElementById('comment-edit-btn'); //수정 누르면 그 자리에서 form을 받을 수 있도록
const deleteCommentButton = document.getElementById('comment-delete-btn');

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

const viewEditComment = async() => {

    const comment_id = document.querySelector('.comment-item').getAttribute('data-comment-id');
    console.log(comment_id);
    return;

    try{
        const response = await fetch(`/api/v1/comments/${comment_id}`);

    }catch(error){
        console.error('댓글 수정 중 오류 발생:', error);
    }

    //기존 댓글이 창에 보여짐 + 댓글 등록 -> 댓글 수정
    document.getElementById('comment-text').value = comment.content;

    const editBtn = document.getElementById('comment-create-btn');
    editBtn.textContent = '댓글 수정';

    editBtn.removeEventListener('click', addComment);
    editBtn.addEventListener('click', editComment);
};

//수정 후 reload
const editComment = async() => {};

const deleteComment = async() => {

};

addCommentButton.addEventListener('click', addComment);
editCommentButton.addEventListener('click', viewEditComment);
deleteCommentButton.addEventListener('click', deleteComment);



