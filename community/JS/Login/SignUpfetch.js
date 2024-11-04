async function registerUser(){
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };
    
    const response = await fetch('/SignUp',{
        method: 'POST',
        headers: {
            //서버에 json 형식 데이터 전달
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)  //요청 본문
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

// 폼 제출 이벤트 방지
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    registerUser();
});