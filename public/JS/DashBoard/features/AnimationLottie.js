// import lottie from 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';

const likeAnimationContainer = document.getElementById('like-animation-container');

const playLikeAnimation = () => {

    const likeAnimation = lottie.loadAnimation({
        container: likeAnimationContainer,
        renderer: 'svg', // Required
        loop: false, // Optional
        autoplay: false, // Optional
        path: '../../Animation/like.json', // Required
        // name: "Hello World", // Name for future reference. Optional.
      });

    likeAnimation.play();

    likeAnimation.addEventListener('complete', () => {
        //transition 시간을 0.5s로 설정
        likeAnimationContainer.style.transition = 'opacity 0.5s ease-out';
        likeAnimationContainer.style.opacity = '0';

        // 페이드 아웃이 완료된 후 컨테이너 비우기
        setTimeout(() => {
            likeAnimationContainer.innerHTML = '';
            // opacity 초기화 (다음 애니메이션을 위해)
            likeAnimationContainer.style.opacity = '1';
        }, 500);
    });

    
}






export { playLikeAnimation };
