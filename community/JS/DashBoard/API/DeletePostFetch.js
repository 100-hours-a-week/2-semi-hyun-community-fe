// import { getLastPath } from '../features/urlUtils.js';

// const post_id = getLastPath().getLastPathSegment();
//FIX: 미친아 id로 가져오면 어떡함.
const DeleteButton = document.getElementById('post-delete-btn');
// const DeleteButton = document.querySelector('.delete-btn');

DeleteButton.addEventListener('click', async ()=>{

    try {

        let pathParts = window.location.pathname.split('/');
        const post_id = pathParts[pathParts.length -1];
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


});