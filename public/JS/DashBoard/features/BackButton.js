const backButton = document.getElementById('back-button') || document.getElementById('dashboard-back-button');

const handleClick = () => {
    // dashboard-button인 경우에만 login으로, 나머지는 posts로
    const destination = backButton.id === 'back-button' ? '/posts' : '/auth/login';
    window.location.href = destination;
}

backButton.addEventListener('click', handleClick);