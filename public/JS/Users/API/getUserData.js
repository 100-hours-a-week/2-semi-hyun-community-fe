const BASE_URL = 'http://localhost:3000'; //이미지 정적파일 로딩 시

const getUserData = async() => {

    //보안문제
    // const user_id = localStorage.getItem('user_id'); 

    try{
        const response = await fetch(`http://localhost:3000/api/v1/users/me/data`,{
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if(!response.ok){
            alert('사용자 정보를 불러오는 데 실패했습니다.');
            window.location.href = '/posts';
        }

        const result = await response.json();
        console.log(result);

        //NOTE : 데이터에 접근할때 data객체를 통해 접근
        document.getElementById('email').textContent = result.data.email;
        document.getElementById('name').value = result.data.name;

        // 프로필 이미지가 있는 경우
        if (result.data.image != null) {
            document.getElementById('profilePreview').src = `${BASE_URL}/images/${result.data.image}`;
        }

    }catch(error){
        console.error('Error fetching user data:', error);
    }

}

document.addEventListener('DOMContentLoaded', getUserData);
