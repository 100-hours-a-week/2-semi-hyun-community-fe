import ValidationState from '../../Login/features/ValidationState.js';

document.addEventListener('DOMContentLoaded',()=>{

    const editButton = document.getElementById('editUserButton');

    const updateButtonState = (state) => {
        const nameValid = state.name.isValid && state.name.isNotDuplicate;
        const profileValid = state.profile.isChanged;
        console.log('name.isValid',state.name.isValid);
        console.log('name.isNotDuplicate',state.name.isNotDuplicate);
        console.log('profile.isChanged',state.profile.isChanged);

        if(nameValid || profileValid){
            editButton.disabled = false;
            editButton.style.backgroundColor = '#22428C';
            editButton.classList.add('active'); // 활성화 스타일 추가
        } else{
            editButton.disabled = true;
            editButton.style.backgroundColor = '#5B73AC';
            editButton.classList.remove('active'); // 활성화 스타일 제거
        }

    };

    //초기상태 설정
    updateButtonState(ValidationState.getState());

    //상태 변경 감지
    ValidationState.subscribe(updateButtonState);

});