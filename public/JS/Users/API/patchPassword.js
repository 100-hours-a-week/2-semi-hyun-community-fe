const { json } = require("body-parser");



const patchPassword = async() => {

    try{
        const password = document.getElementById('password');

        const response = await fetch('http://localhost:3000/api/v1/user/me/password',{
            method: 'PATCH',
            credentials: 'include',
            body : JSON.stringify({password})
        });

        if(response.status === 200){
            alert('비밀번호가 수정되었습니다.');
            window.location.href = `/posts`;
        } else {
            alert('비밀번호 수정을 실패했습니다.');
            console.error('서버응답',result);
        }
    }
    catch(error){
        console.error('비밀번호 수정 실패',error);
    }
}


//수정완료 버튼 활성화
showSubmitButton.addEventListener('click',()=>{
   submitButton.style.display='block'; 
});
//수정 요청
submitButton.addEventListener('click',patchPassword);