import ValidationState from './ValidationState.js';  
const nameInput = document.getElementById('name');
const nameErrorMessage = document.getElementById('error-message-name');

nameInput.maxLength = 10;


const validationName = (name) => {
    let isNameValid = true;

    if(name.includes(' ')){
        isNameValid = false;
        nameErrorMessage.textContent = '띄어쓰기는 불가합니다.';
        nameErrorMessage.style.display = 'block';
    }
    else if(name.length === 0){
        isNameValid = false;
        nameErrorMessage.textContent = '닉네임을 입력해주세요.';
        nameErrorMessage.style.display = 'block';
    }
    else if(name.length > 10){
        isNameValid = false;
        nameErrorMessage.textContent = '닉네임은 10자 이하로 입력해주세요.';
        nameErrorMessage.style.display = 'block';
    }
    else{
        isNameValid = true;
        nameErrorMessage.style.display = 'none';
    }
    ValidationState.setState('name', 'isValid', isNameValid);
}

nameInput.addEventListener('input', () => {
    validationName(nameInput.value);
});


//닉네임 검증+콜백 함수 실행
export function setupNameValidation(callback){

    nameInput.addEventListener('input', ()=>{

    const isName = validationName(nameInput.value)
    if(callback) callback(isName);

    });
}



