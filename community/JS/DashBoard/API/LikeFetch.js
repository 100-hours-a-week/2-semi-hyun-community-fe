const likeButton = document.querySelector('.likeNum-btn');

const likeClick = () => {


    //Note: 한번 클릭하면 class="likeNum-btn active 로 변경
    //Note : 두번 클릭하면 class="likeNum-btn로 변경
    likeButton.classList.toggle('active');
};



likeButton.addEventListener('click',likeClick)