async function registerUser(){
    const response = await fetch('/SignUp',{
        method: 'POST',
        headers: {
            //서버에 json 형식 데이터 전달
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ //요청 본문
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        }),
    });

    const result = await response.json(); // JSON 형식으로 응답 처리

    if (response.ok) { // 응답 상태가 200-299일 경우
        alert(result.message); // 성공 메시지 표시
    } else {
        alert(result.message); // 오류 메시지 표시
    }

}