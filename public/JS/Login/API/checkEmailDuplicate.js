let isEmailDuplicate = false;

const emailInput = document.getElementById('email');
const emailErrorMessage = document.getElementById('error-message-email');

const checkEmailDuplicate = async(email) => {
    try{
        const response = await fetch(`http://localhost:8080/api/v1/auth/check-email`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email})
        });

        const result = await response.json();
        return result.isDuplicate;

    }catch(error){
        console.error('이메일 중복 확인 중 오류 발생:', error);
        return false;
    }
}

const EmailCheck = (isDuplicate) => {
    if(!isDuplicate){
        isEmailDuplicate = false;
        emailErrorMessage.textContent = '이미 사용중인 이메일입니다.';
        emailErrorMessage.style.display = 'block';
    }
    else{
        isEmailDuplicate = true;
        emailErrorMessage.style.display = 'none';
    }

}

// 사용 예시
emailInput.addEventListener('blur', async () => {
    const email = emailInput.value;
    const isDuplicate = await checkEmailDuplicate(email);
    EmailCheck(isDuplicate);
});
