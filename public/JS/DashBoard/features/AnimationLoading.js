const loadingAnimationContainer = document.getElementById('loading-animation-container');

let loadingAnimation;

//한번만 로드
export const initLoadingAnimation = () => {
    loadingAnimation = lottie.loadAnimation({
        container: loadingAnimationContainer,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: '../../Animation/loading.json',
    });
}

export const playLoadingAnimation = () => {
    loadingAnimationContainer.classList.add('active');
    loadingAnimation.play();
}

export const stopLoadingAnimation = () => {
    loadingAnimation.stop(); // 애니메이션 정지
    loadingAnimationContainer.classList.remove('active');
}
