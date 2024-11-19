const LoginButton = document.getElementById('loginButton');

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

            //이름 로컬 스토리지에 저장
            localStorage.setItem('name', data.data.name);
            localStorage.setItem('user_id', data.data.user_id);


            alert(localStorage.getItem('name')+"님 안녕하세요");
            
            //인증처리는?
            window.location.href = '/api/v1/posts';
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