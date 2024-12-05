const DeleteButton = document.getElementById('post-delete-btn');

const deletePost = async() => {

    try {
        const post_id = PostIdManager.getPostId();
        const response = await fetch(`http://localhost:3000/api/v1/posts/${post_id}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        const result = await response.json();

        if(!response.ok){
            if(response.status === 404){
                alert(result.message);
                return;
            }
            else if(response.status === 403){
                alert(result.message);
            }
        }

        if(response.status === 200){
            alert('게시글이 삭제되었습니다.');
            window.location.href = '/posts';
        }


    }catch(error){
        console.error('Error deleting post:', error);
    }
}

DeleteButton.addEventListener('click', ()=>{
    if(confirm('정말 삭제하시겠습니까?')){
        deletePost();
    }
});