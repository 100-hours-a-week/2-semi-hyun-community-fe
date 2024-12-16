// const BASE_URL = 'http://localhost:3000'; //이미지 정적파일 로딩 시

const getUserData = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/users/me/data`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if(!response.ok) {
            alert('사용자 정보를 불러오는 데 실패했습니다.');
            window.location.href = '/posts';
            return; // 일찍 반환하여 불필요한 코드 실행 방지
        }

        const result = await response.json(); // 구조 분해 할당 사용
        
        // DOM 요소 한 번만 선택
        const emailElement = document.getElementById('email');
        const nameElement = document.getElementById('name');
        const profileImgElement = document.getElementById('profile-img-preview');

        emailElement.textContent = result.data.email;
        nameElement.value = result.data.name;

        // NOTE: ?. : 옵셔널 체이닝 연산자
        // NOTE: result.data null인 경우 undefined 반환
        if (result.data?.image) {
            const profileImageUrl = `${BASE_URL}/images/profile/${result.data.image}`;
            profileImgElement.src = profileImageUrl;
        }

    } catch(error) {
        console.error(`Error fetching user data: ${error}`); // 템플릿 리터럴 사용
    }
};

document.addEventListener('DOMContentLoaded', getUserData);
