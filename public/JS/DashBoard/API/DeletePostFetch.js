import { API_URL, urlUtils } from '/config/constants.js';

const DeleteButton = document.getElementById('post-delete-btn');
const post_id = urlUtils.getPostId();

const deletePost = async () => {
    try {
        const response = await fetch(`${API_URL}/posts/${post_id}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        const result = await response.json();

        if (!response.ok) {
            if (response.status === 404 || response.status === 403) {
                alert(result.message);
                return;
            }
            else if(response.status === 403){
                alert(result.message);
            }
        }

        if (response.status === 200) {
            alert('게시글이 삭제되었습니다.');
            window.location.href = '/posts';
        }

    } catch (error) {
        console.error('Error deleting post:', error);
    }
};

DeleteButton.addEventListener('click', () => 
    confirm('정말 삭제하시겠습니까?') && deletePost()
);