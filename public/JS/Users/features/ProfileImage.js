const changeButton = document.querySelector('.change-button');
const profileInput = document.getElementById('profile-img');


const showProfileImage = () => {
    const profilePreview = document.getElementById('profile-img-preview');

    const file = profileInput.files[0];
    if(file){
        //NOTE: FileReader: 파일의 내용을 읽기위한 웹 API
        const reader = new FileReader();

        //NOTE: 파일 일기가 완료된 후에 실행될 코드를 onload handler에 등록
        reader.onload = (e) => {
            //NOTE : e.target.result : 읽은 파일의 내용 포함 (image url)
            profilePreview.src = e.target.result;
        }

        //NOTE: Data UR 형식으로 읽기. 이ㅣ미지 파일을 표시하기 위해 사용
        //NOTE: HTML <img> 태그 src 속성에 직접 사용할 수 있도록 형식 변경
        reader.readAsDataURL(file);
    }

}

//기존 사진 표시
// profileInput.addEventListener('DOMContentLoaded',showProfileImage);

//사진 선택
changeButton.addEventListener('click',()=>{
    document.getElementById('profile-img').click();
});
//변경 사진 표시
profileInput.addEventListener('change',showProfileImage);