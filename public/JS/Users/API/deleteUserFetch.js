const deleteUserButton = document.getElementById('deleteUserButton');

const showDelete = () => {
    if(confirm('정말 탈퇴하시겠습니까?')){

        deleteUserFetch();
    }
}

const deleteUserFetch = async () => {
    
    try{
        const response = await fetch('http://localhost:3000/api/v1/users/me', {
            method: 'DELETE',
            credentials : 'include'
        });

        const result = await response.json();

        if(!response.ok){
            if ([404, 401, 403].includes(response.status)) {
                alert(result.message);
                return;
            }
            alert(result.message);
            return;
        }

        if(response.status === 200){
            alert(result.message);
            localStorage.clear();
            sessionStorage.clear();

            //NOTE: 브라우저 히스토리에서 현제 URL을 제거, 새 URL 삽입
            // 뒤로가기 버튼을 눌러도 이전 페이지로 돌아갈 수 없다.
            window.location.replace('/auth/login');
        }


    }catch(error){
        console.error('회원 탈퇴 실패', error);
    }
}

deleteUserButton.addEventListener('click', showDelete);
