const LoginButton = document.getElementById('loginButton');

//이메일 형식 검사
function validateEmail(email){
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //NOTE: test(): 정규식 객체에서 제공하는 함수. 정규식패턴과 일치하면 true
    return emailReg.test(email); 
}

//이메일 형식 검사 이벤트 리스너 (★더 공부)
//FIXME: debounce 공부하고 더 적용
document.addEventListener('DOMContentLoaded', ()=> {
    const emailInput = document.getElementById('email');
    const emailErrorMessage = document.getElementById('error-message-email');
    
    // 이벤트 리스너나 로직 처리
    emailInput.addEventListener('input', () => {
        const email = emailInput.value.trim();
        //유효하지 않을 경우 에러메시지 출력
        if (email && !validateEmail(email)) {
            emailErrorMessage
            emailErrorMessage.textContent = '유효한 이메일 주소를 입력해주세요.';
            emailErrorMessage.style.display = 'block';
        } else {
            emailErrorMessage.style.display = 'none'; // 에러 메시지 숨기기
        }
    });
});

//비밀번호 유효성 검사

//fetch
//NOTE: addEventLister를 사용하면 HTML에 onClick을 추가하지 않아도 이벤트를 처리한다.
LoginButton.addEventListener('click', async ()=>{
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailErrorMessage = document.getElementById('error-message-pw');

    const data = {
        email: email,
        password: password
    };

    try{
        const response = await fetch('/api/v1/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            //이메일,비밀번호 json형식 전송
            body: JSON.stringify(data)
        });
        if (response.status === 200){
            const data = await response.json();
            alert(data.message);
            //인증처리는?
            // window.location.href = '/dashboard';
        }
        else if(response.status === 400){
            emailErrorMessage.textContent = data.message;
            emailErrorMessage.style.display = 'block';
        }
        else if(response.status === 401){
            emailErrorMessage.textContent = data.message;
            emailErrorMessage.style.display = 'block';
        }
        else{
            console.error('로그인 오류:', result.error);
        }
    }catch(error){
        console.error('로그인 요청 중 오류 발생:', error);
    }
});