const deleteUserButton = document.getElementById('deleteUserButton');

// 화살표 함수로 변경하고 불필요한 중괄호 제거
const showDelete = () => confirm('정말 탈퇴하시겠습니까?') && deleteUserFetch();

const deleteUserFetch = async () => {
    
    try{
        const response = await fetch('http://localhost:3000/api/v1/users/me', {
            method: 'DELETE',
            credentials : 'include'
        });

        const result = await response.json();

        // 에러 처리 로직 단순화
        if (!response.ok) {
            alert(result.message);
            return;
        }

        // status 체크 제거 (response.ok로 충분)
        alert(result.message);
        localStorage.clear();
        sessionStorage.clear();

        //NOTE: 브라우저 히스토리에서 현제 URL을 제거, 새 URL 삽입
        // 뒤로가기 버튼을 눌러도 이전 페이지로 돌아갈 수 없다.
        window.location.replace('/auth/login');

    } catch (error) {
        // 템플릿 리터럴 사용
        console.error(`회원 탈퇴 실패: ${error}`);
    }
};

deleteUserButton.addEventListener('click', showDelete);
