//게시글 목록 가져오기
//제목, 작성자,날짜,좋아요,댓글,조회수
const params = new URLSearchParams({
    offset: 0, //시작 위치
    limit: 5, // 가져올 데이터 개수
});

document.addEventListener('DOMContentLoaded', async ()=> {

    try{

        const response = await fetch(`http://localhost:3000/api/v1/posts/data?${params.toString()}`,{
            credentials : 'include',
        });

        if(!response.ok){
            alert('게시글 목록 가져오기를 실패했습니다');
            return;
        }

        const posts = await response.json();

        //게시글 조회목록 렌더링
        const postList = document.querySelector('#post-container');

        posts.forEach(post => {
            const postItem = document.createElement('article');
            postItem.className = 'post-list'; //<article class="post-list"></article>
            postItem.innerHTML = `
            <a href="/posts/${post.post_id}">
            <div class="post-title">
                <h2>${post.title}</h2>
                <div class="post-meta">
                    <span class="stats">
                        <span class="likes">좋아요 ${post.likes}</span>
                        <span class="comments">댓글 ${post.comments_count}</span>
                        <span class="views">조회수 ${post.views}</span>
                    </span>
                    <time class="date">${post.created_date}</time>
                </div>
            </div>
            </a>
            <div class="author-info">
                <img class="account-img" src="../image/" alt="작성자" >
                <span class="author-name">${post.name}</span>
            </div>
            `;
            postList.appendChild(postItem);
        });

        //게시글 목록이 있을 경우 list-empty 비활성화
        IsListEmpty();
    }catch(error){
        console.error('Error:', error);
        console.error('게시글 목록 가져오기 실패', error);
    }

});