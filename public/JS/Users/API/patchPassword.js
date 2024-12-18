import { API_URL } from '/config/constants.js';

const patchPassword = async () => {
    try {
        const password = document.getElementById('password').value; // value 추가

        const response = await fetch(`${API_URL}/users/me/password`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json' // Content-Type 헤더 추가
            },
            body: JSON.stringify({ password }) // 객체 리터럴 단축 구문 사용
        });

        if (response.ok) { // status 대신 ok 사용
            alert('비밀번호가 수정되었습니다.');
            window.location.reload();
        } else {
            alert('비밀번호 수정을 실패했습니다.');
            throw new Error('비밀번호 수정 실패');
        }
    } catch (error) {
        console.error(`비밀번호 수정 실패: ${error}`); // 템플릿 리터럴 사용
    }
};

// DOM 요소 한 번만 선택
const showSubmitButton = document.getElementById('editPwButton');
const submitButton = document.getElementById('editPwButtonToast');

// 화살표 함수 사용
showSubmitButton.addEventListener('click', () => {
    submitButton.style.display = 'block';
});

submitButton.addEventListener('click', patchPassword);