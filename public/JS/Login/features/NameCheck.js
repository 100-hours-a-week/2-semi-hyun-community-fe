const ValidationState = require('./ValidationState.js');   

document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name');
    const nameErrorMessage = document.getElementById('error-message-name');
    
    nameInput.maxLength = 10;
    let isNameValid = true;

    const validationName = (name) => {
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
        validationName(nameInput.value.trim());
    });
});
