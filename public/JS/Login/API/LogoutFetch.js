import { API_URL } from '/config/constants.js';
const logoutButton = document.querySelector('a[href="/auth/logout"]');

const showLogout = (event) => {
    //기본 링크 동작 방지
    event.preventDefault();
    if(confirm('정말 로그아웃하시겠습니까?')){
        logoutFetch();
    }
};

const logoutFetch = async () => {
    try {
        const response = await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });

        const result = await response.json();

        if(!response.ok){
            if([401,403,404,500].includes(response.status)){
                alert(result.message);
                return;
            }
            throw new Error('Failed to logout'); //에러 발생 -> catch 블록에서 처리
        }

        if(response.status === 200){
            alert(result.message);
            localStorage.clear();
            sessionStorage.clear();
            window.location.replace('/auth/login');
            return;
        }
    } catch(error) {
        console.error('Logout failed:', error);
    }
};

logoutButton.addEventListener('click', showLogout);
