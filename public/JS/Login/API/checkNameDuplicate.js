import ValidationState from '../features/ValidationState.js';
import { API_URL } from '/config/constants.js';

let isNotNameDuplicate = false;

const checkNameDuplicate = async(name) => {
    try{
        const response = await fetch(`${API_URL}/auth/check-name`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: name})
        });

        const result = await response.json();
        return result.isDuplicate;//true: 중복, false: 중복x

    }catch(error){
        console.error('이메일 중복 확인 중 오류 발생:', error);
        return false;
    }
}

const NameCheck = (isDuplicate,nameErrorMessage) => {
    if(!isDuplicate){//false
        isNotNameDuplicate = true;
        nameErrorMessage.style.display = 'none';
    }
    else{//true
        isNotNameDuplicate = false;
        nameErrorMessage.textContent = '이미 사용중인 이메일입니다.';
        nameErrorMessage.style.display = 'block';
    }

    ValidationState.setState('name','isNotDuplicate',isNotNameDuplicate);
}

document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name');
    const nameErrorMessage = document.getElementById('error-message-name');

    //닉네임 중복확인
    nameInput.addEventListener('blur', async () => {
        const name = nameInput.value;
        const isDuplicate = await checkNameDuplicate(name);
        NameCheck(isDuplicate,nameErrorMessage);
    });
});

