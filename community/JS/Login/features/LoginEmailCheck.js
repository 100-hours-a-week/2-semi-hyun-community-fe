//이메일 형식 검사
function validateEmail(email){
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //NOTE: test(): 정규식 객체에서 제공하는 함수. 정규식패턴과 일치하면 true
    return emailReg.test(email); 
}

//이메일 형식 검사 이벤트 리스너 (★더 공부)
//FIXME: debounce 공부하고 더 적용
document.addEventListener('DOMContentLoaded', ()=> {
    const emailInput = document.getElementById('email');
    const emailErrorMessage = document.getElementById('error-message-email');
    
    // 이벤트 리스너나 로직 처리
    emailInput.addEventListener('input', () => {
        const email = emailInput.value.trim();
        //유효하지 않을 경우 에러메시지 출력
        if (email && !validateEmail(email)) {
            emailErrorMessage.textContent = '유효한 이메일 주소를 입력해주세요.';
            emailErrorMessage.style.display = 'block';
        } else {
            emailErrorMessage.style.display = 'none'; // 에러 메시지 숨기기
        }
    });
});