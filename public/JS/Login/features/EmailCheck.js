let isEmailValid = false;

//이메일 형식 검사
function validationEmail(email){
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //NOTE: test(): 정규식 객체에서 제공하는 함수. 정규식패턴과 일치하면 true
    return emailReg.test(email); 
}

/**
 * 이메일 입력 필드의 유효성을 검사하고 에러 메시지를 표시합니다.
 * @param {string} emailInputId - 이메일 입력 필드의 ID
 * @param {string} errorMessageId - 에러 메시지 요소의 ID
 * @param {function} [callback] - 추가 동작을 위한 콜백 함수 (선택 사항)
 */

//FIXME: debounce 공부하고 더 적용
export function setupEmailValidation(callback) {
    document.addEventListener('DOMContentLoaded', ()=> {
        const emailInput = document.getElementById('email');
        const emailErrorMessage = document.getElementById('error-message-email');
    
        // 이벤트 리스너나 로직 처리
        emailInput.addEventListener('input', () => {
            const email = emailInput.value.trim();
            //유효하지 않을 경우 에러메시지 출력
            if (email && !validationEmail(email)) {
                isEmailValid = false;
                emailErrorMessage.textContent = '올바른 이메일 형식을 입력해주세요.';
                emailErrorMessage.style.display = 'block';
                
            } else {
                isEmailValid = true;
                emailErrorMessage.style.display = 'none'; // 에러 메시지 숨기기
            }
            if(callback) callback(isEmailValid);
        });
    });
}