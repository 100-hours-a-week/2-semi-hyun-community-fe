let isNameDuplicate = false;

const nameInput = document.getElementById('name');
const nameErrorMessage = document.getElementById('error-message-name');

const checkNameDuplicate = async(name) => {
    try{
        const response = await fetch(`http://localhost:8080/api/v1/auth/check-name`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: name})
        });

        const result = await response.json();
        return result.isDuplicate;

    }catch(error){
        console.error('이메일 중복 확인 중 오류 발생:', error);
        return false;
    }
}

const NameCheck = (isDuplicate) => {
    if(!isDuplicate){
        isNameDuplicate = false;
        nameErrorMessage.textContent = '이미 사용중인 이메일입니다.';
        nameErrorMessage.style.display = 'block';
    }
    else{
        isNameDuplicate = true;
        nameErrorMessage.style.display = 'none';
    }

}

// 사용 예시
nameInput.addEventListener('blur', async () => {
    const name = nameInput.value;
    const isDuplicate = await checkNameDuplicate(name);
    NameCheck(isDuplicate);
});
