import ValidationState from './ValidationState.js';

let isPasswordValid = false;
let isPasswordMatch = false;

const validatePassword= (password) =>{

    if(password.length<8 || password.length>20){
        return "비밀번호는 8자 이상 20자 이하여야 합니다";
    }

    //조건 체크 정규 표현식
    const hasUpperCase = /[A-Z]/.test(password); //대문자 있으면 true
    const hasLowerCase = /[a-z]/.test(password); //소문자 있으면 true
    const hasNumber = /[0-9]/.test(password); //숫자 있으면 true
    const hasSpecialChar = /[~!@#$%^&*().?:{}|<>]/.test(password); //특수문자 있으면 true

    //조건 충족 여부 확인
    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
        // 오류 메시지 반환
        return "대문자, 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다";
    }

    return true;
}


const showErrormessage = () => {
    
    const passwordInput = document.getElementById('password');
    const passwordCheckInput = document.getElementById('password-check');
    const passwordErrorMessage = document.getElementById('error-message-password');
    const passwordCheckErrorMessage = document.getElementById('error-message-password-check');


    // 비밀번호 유효성 검사
    passwordInput.addEventListener('input',() => {
        const password = passwordInput.value.trim();
        const validationResult = validatePassword(password);
        
        if(validationResult !== true){
            passwordErrorMessage.textContent = validationResult;
            passwordErrorMessage.style.display = 'block';
            isPasswordValid = false;
        } else{
            passwordErrorMessage.textContent = '';
            passwordErrorMessage.style.display = 'none';
            isPasswordValid = true;
        }

        ValidationState.setState('password', 'isValid', isPasswordValid);
    });

    //비밀번호 확인 검사
    passwordCheckInput.addEventListener('input',() => {
        const password = passwordInput.value.trim();
        const passwordCheck = passwordCheckInput.value.trim();

        if(password !== passwordCheck){
            passwordCheckErrorMessage.textContent = '비밀번호가 다릅니다.';
            passwordCheckErrorMessage.style.display = 'block';
            isPasswordMatch = false;
        }else if(passwordCheck.length === 0){
            passwordCheckErrorMessage.textContent = '비밀번호를 한번 더 입력해주세요';
            passwordCheckErrorMessage.style.display = 'block';
            isPasswordMatch = false;
        }
        else {
            passwordCheckErrorMessage.style.display = 'none';
            isPasswordMatch = true;
        }

        ValidationState.setState('password', 'isMatch', isPasswordMatch);

    });
}

//NOTE : 함수를 참조로 전달 -> 새로운 함수를 만들어서 전달
document.addEventListener('DOMContentLoaded',showErrormessage);
