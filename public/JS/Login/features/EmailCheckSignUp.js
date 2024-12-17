import { setupEmailValidation } from '../features/EmailCheck.js';
import ValidationState from '../features/ValidationState.js';


// 이메일 유효성 검사 설정 및 ValidationState 업데이트
setupEmailValidation((isEmailValid) => {
    ValidationState.setState('email', 'isValid', isEmailValid);
});