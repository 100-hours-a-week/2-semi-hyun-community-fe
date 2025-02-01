import { API_URL } from '/config/constants.js';
const LoginButton = document.getElementById('loginButton');

//modal
const modal = document.getElementById('welcome-modal');
const welcomeMessage = document.getElementById('welcome-message');
const closeBtn = document.getElementById('modal-close');

//fetch
//NOTE: addEventLister를 사용하면 HTML에 onClick을 추가하지 않아도 이벤트를 처리한다.
LoginButton.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const ErrorMessage = document.getElementById('error-message-pw');

    // 객체 리터럴 단축 구문 사용
    const data = {
        email,
        password
    };

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            //이메일,비밀번호 json형식 전송
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.status === 200){

            welcomeMessage.textContent = `${result.name}님 안녕하세요`;
            modal.classList.add('show');
            
            closeBtn.onclick = () => {
                modal.classList.remove('show');
                window.location.href = '/posts';
            };
            
        } else if (response.status === 400 || response.status === 401) {
            ErrorMessage.textContent = result.message;
            ErrorMessage.style.display = 'block';
            return;
        } else {
            console.error('로그인 오류:', result.error);
        }
    } catch (error) {
        console.error('로그인 요청 중 오류 발생:', error);
    }
});