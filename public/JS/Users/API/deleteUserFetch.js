const deleteUser = document.getElementById('deleteUser');

const showDelete = () => {
    if(confirm('정말 탈퇴하시겠습니까?')){
        deleteUserFetch();
    }
}

const deleteUserFetch = async () => {

    try{
        const response = await fetch('/users/me', {
            method: 'DELETE',
            credentials : 'include'
        });

        const result = await response.json();

        if(!response.ok){

            if(response.status === 404){
                alert(result.message);
                return;
            }
            else if(response.status === 401){
                alert(result.message);
                return;
            }
            else if(response.status === 403){
                alert(result.message);
                return;
            }
            else{
                alert(result.message);
                return;
            }
        }

        if(response.status === 200){
            alert(result.message);
            window.location.href = '/auth/login';
        }


    }catch(error){
        console.error('회원 탈퇴 실패', error);
    }
}

deleteUser.addEventListener('click', showDelete);
