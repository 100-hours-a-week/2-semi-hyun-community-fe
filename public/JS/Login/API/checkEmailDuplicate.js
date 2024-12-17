import ValidationState from '../features/ValidationState.js';
import { API_URL } from '/config/constants.js';

let isNotEmailDuplicate = false;

const checkEmailDuplicate = async(email) => {
    try{
        const response = await fetch(`${API_URL}/auth/check-email`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email})
        });

        const result = await response.json();
        console.log(result.isDuplicate);
        return result.isDuplicate; //true: 중복, false: 중복x

    }catch(error){
        console.error('이메일 중복 확인 중 오류 발생:', error);
        return false;
    }
}

const EmailCheck = (isDuplicate,emailErrorMessage) => {
    if(!isDuplicate){//false
        isNotEmailDuplicate = true;
        emailErrorMessage.style.display = 'none';
    }
    else{//true
        isNotEmailDuplicate = false;
        emailErrorMessage.textContent = '이미 사용중인 이메일입니다.';
        emailErrorMessage.style.display = 'block';
    }

    ValidationState.setState('email','isNotDuplicate',isNotEmailDuplicate);
}


document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const emailErrorMessage = document.getElementById('error-message-email');

    emailInput.addEventListener('blur', async () => {
        const email = emailInput.value;
        const isDuplicate = await checkEmailDuplicate(email);
        EmailCheck(isDuplicate,emailErrorMessage);
    });
});
