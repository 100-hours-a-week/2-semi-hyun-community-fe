
//얘는 언제 가져오는 걸까..
// const pathParts = window.location.pathname.split('/');
// const user_id = pathParts[pathParts.length -1];
// window.user_id = user_id;


const getUserData = async() => {

    //보안문제
    // const user_id = localStorage.getItem('user_id'); 

    try{
        const response = await fetch(`/api/v1/users/me/data`,{
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if(!response.ok){
            alert('사용자 정보를 불러오는 데 실패했습니다.');
            window.location.href = '/api/v1/posts';
        }

        const result = await response.json();
        console.log(result);

        //NOTE : 데이터에 접근할때 data객체를 통해 접근
        document.getElementById('email').textContent = result.data.email;
        document.getElementById('name').value = result.data.name;

        // 프로필 이미지가 있는 경우
        // if (data.userInfo.profile_image) {
        //     document.getElementById('profilePreview').src = data.userInfo.profile_image;
        // }

    }catch(error){
        console.error('Error fetching user data:', error);
    }

}

document.addEventListener('DOMContentLoaded', getUserData);
