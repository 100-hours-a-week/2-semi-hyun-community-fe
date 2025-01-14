import ValidationState from '../../Login/features/ValidationState.js';

document.addEventListener('DOMContentLoaded',()=>{

    const signupButton = document.getElementById('editUserButton');

    const updateButtonState = (state) => {
        const nameValid = state.name.isValid && state.name.isNotDuplicate;
        console.log('name.isValid',state.name.isValid);
        console.log('name.isNotDuplicate',state.name.isNotDuplicate);
        
        if(nameValid){
            signupButton.disabled = false;
            signupButton.style.backgroundColor = '#7F6AEE';
            signupButton.classList.add('active'); // 활성화 스타일 추가
        } else{
            signupButton.disabled = true;
            signupButton.style.backgroundColor = '#ACA0EB';
            signupButton.classList.remove('active'); // 활성화 스타일 제거
        }

    };

    //초기상태 설정
    updateButtonState(ValidationState.getState());

    //상태 변경 감지
    ValidationState.subscribe(updateButtonState);

});