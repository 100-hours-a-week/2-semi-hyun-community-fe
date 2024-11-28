const showSubmitButton = document.getElementById('editUserButton');
const submitButton = document.getElementById('editUserButtonToast');

const showBtn = () => {
    submitButton.style.display = block;
}

const patchData = async() => {
    //닉네임, 사진 (사진은 있을경우)

    try{
        const name = document.getElementById('name').value;
        const profile = document.getElementById('profile-img');

        const formData = new FormData();
        formData.append('name',name);

        if(profile.files[0]){
            formData.append('profile',profile.files[0]);
        }

        const response = await fetch('/api/v1/user/me/user_info',{
            method : 'PATCH',
            credentials : 'include',
            body : formData
        });

        // const result = response.json();

        if(response.status == 204){
            alert('사용자 정보가 수정되었습니다.');
            window.location.href ='/api/v1/users/me';
        }else{
            alert('사용자 정보 수정에 실패했습니다.');
        }

    }catch(error){
        console.error('사용자 정보 수정 중 오류가 발생했습니다.',error);
    }
}

showSubmitButton.addEventListener('click',showBtn());
submitButton.addEventListener('click',showBtn());

//사진변경
document.querySelector('.change-button').addEventListener('click',()=>{
    document.getElementById('profile-img').click();

});