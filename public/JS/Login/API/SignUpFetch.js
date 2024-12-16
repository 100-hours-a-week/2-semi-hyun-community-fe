// 회원가입 POST 함수
const registerUser = async () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const passwordCheck = document.getElementById('password-check').value;
    const imageInput = document.getElementById('profile-img');

    const formData = new FormData();
    // 객체 리터럴 단축 구문 사용
    const userData = { name, email, password, passwordCheck }; //name: name, email: email
    Object.entries(userData).forEach(([key, value]) => formData.append(key, value));
    formData.append('image', imageInput.files[0]); //필수

    // 필드 점검
    // FIXME : input 작성 시 점검
    const validations = [
        { value: name, errorId: 'error-message-name' },
        { value: email, errorId: 'error-message-email' },
        { value: password, errorId: 'error-message-password' },
        { value: imageInput.files[0], errorId: 'error-message-profile' }
        ];
    
        validations.forEach(({ value, errorId }) => {
        document.getElementById(errorId).style.display = value ? 'none' : 'block';
    });

    try {
        const response = await fetch('http://localhost:3000/api/v1/auth/signup', {
            method: 'POST',
            body: formData  //요청 본문
        });

        const result = await response.json();

        // 응답 상태 처리
        switch(response.status) {
            case 201:
                alert('회원가입 완료. 로그인 화면으로 이동합니다.');
                window.location.href = '/auth/login';
                break;
            case 400:
                alert(result.message);
                break;
            case 409:
                alert('이미 가입된 이메일입니다.');
                break;
            default:
                console.error('회원가입 오류:', result.error);
        }
    } catch (error) {
        console.error('회원가입 요청 중 오류 발생:', error);
    }
};

// 폼 제출 이벤트 방지
document.getElementById('signupForm').addEventListener('submit', (event) => {
    event.preventDefault();
});

// button 태그의 type 속성. id가 signupButton인 요소를 찾아 클릭 이벤트를 추가
// addEventLister() : 특정 이벤트가 발생할때 호출할 함수 지정 -> click 이벤트 발생 시 registerUser() 호출
// 버튼 클릭 이벤트 처리
document.getElementById('signupButton').addEventListener('click', registerUser);
