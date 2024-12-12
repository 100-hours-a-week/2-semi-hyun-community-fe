// DOM 요소 선택 추가
const showSubmitButton = document.getElementById('showSubmitButton');
const submitButton = document.getElementById('submitButton');

const patchPassword = async() => {
    try{
        const password = document.getElementById('password').value; // .value 추가
        
        const response = await fetch('http://localhost:3000/api/v1/user/me/password',{
            method: 'PATCH',
            credentials: 'include',
            headers: { // headers 추가
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password}) 
        });

        if(response.status === 200){
            alert('비밀번호가 수정되었습니다.');
            window.location.reload();
        } else {
            alert('비밀번호 수정을 실패했습니다.');
            throw new Error('비밀번호 수정 실패');
        }
    }
    catch(error){
        console.error('비밀번호 수정 실패:', error);
    }
}



//수정완료 버튼 활성화
showSubmitButton.addEventListener('click',()=>{
   submitButton.style.display='block'; 
});
//수정 요청
submitButton.addEventListener('click',patchPassword);