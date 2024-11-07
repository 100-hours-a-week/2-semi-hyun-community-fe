
//회원가입 POST 함수
async function registerUser(){
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };

    console.log('회원가입 요청 데이터:', data); // 요청 데이터 로그 추가
    
    const response = await fetch('/SignUp',{
        method: 'POST',
        headers: {
            //서버에 json 형식 데이터 전달
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)  //요청 본문
    })

    const result = await response.json();

    if(response.status === 201){
        alert('회원가입 완료. 로그인 화면으로 이동합니다.');
        window.location.href = '/login'; // 로그인 페이지로 이동
        //setTimeout(() => {res.redirect('/login')}, 1000);
    }
    else if(response.status === 400){
        alert('모든 필드를 입력해야 합니다.');
    }
    else if(response.status === 409){
        alert('이미 가입된 이메일입니다.');
    }
    else{
        console.error('회원가입 오류:', result.error);
    }

    // .then(response => response.json()) // 응답을 JSON 형식으로 파싱
    // .then(data => {
    //     console.log('Success:', data); // 성공적으로 파싱된 데이터 출력
    // })
    // .catch((error) => {
    //     console.error('Error:', error); // 오류 발생 시 오류 메시지 출력
    // });
}

async function loginUser(){
    const response = await fetch('/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)  //요청 본문
    })

}

// 폼 제출 이벤트 방지
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
});


// 버튼 클릭 이벤트 처리
// button 태그의 type 속성. id가 signupButton인 요소를 찾아 클릭 이벤트를 추가
// addEventLister() : 특정 이벤트가 발생할때 호출할 함수 지정 -> click 이벤트 발생 시 registerUser() 호출
document.getElementById('signupButton').addEventListener('click', function() {
    registerUser();
});