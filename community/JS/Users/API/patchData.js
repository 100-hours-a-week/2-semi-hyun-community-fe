const showSubmitButton = document.getElementById('editUserButton');
const submitButton = document.getElementById('editUserButtonToast');

const showBtn = () => {
    submitButton.style.display = block;
}

const patchData = async() => {
    //닉네임, 사진 (사진은 있을경우)
    const name = document.getElementById('name').value;
    const profile = document.getElementById('profile-img');

    const formData = new FormData();
    form.append('name',name);

    if(profile.files[0]){
        formData.append('profile',profile.files[0]);
    }

    const response = await fetch('api/v1/user/me/',{});
}



showSubmitButton.addEventListener('click',showBtn());
submitButton.addEventListener('click',showBtn());

//사진변경
document.querySelector('.change-button').addEventListener('click',()=>{
    document.getElementById('profile-img').click();

});