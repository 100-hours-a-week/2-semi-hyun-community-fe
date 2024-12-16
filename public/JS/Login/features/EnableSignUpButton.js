const ValidationState = require('./ValidationState.js');   

document.addEventListener('DOMContentLoaded',()=>{

    const submitButton = document.getElementById('signupButton');

    const updateButtonState = (state) => {

        const emailValid = state.email.isValid && state.email.isNotDuplicate;
        const nameValid = state.name.isValid && state.name.isNotDuplicate;
        const passwordValid = state.password.isValid && state.password.isMatch;
        
        if(emailValid && nameValid && passwordValid){
            signupButton.disabled = false;
            signupButton.classList.add('active'); // 활성화 스타일 추가
        } else{
            signupButton.disabled = true;
            signupButton.classList.remove('active'); // 활성화 스타일 제거
        }

    };

    //초기상태 설정
    updateButtonState(ValidationState.getState());

    //상태 변경 감지
    ValidationState.subscribe(updateButtonState);

});