const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname,'../../data/login.json'); //../에서 .../로


const readUser = () => {
    console.log("읽기 시작.")
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('파일 읽기 오류:', err);
                reject(err);
            } else {
                // console.log('파일 내용:', data);
                resolve(data ? JSON.parse(data) : []);
            }
        });
    });
};

const writeUser = (users) => {
    return new Promise((resolve, reject)=>{
        fs.writeFile(filePath,JSON.stringify(users,null,2),(err)=>{
            if(err){ console.error('파일 쓰기 오류:', err); reject(err);}
            else resolve();
        });
    });
}

//json 업데이트
async function UpdateUser(updateData){
    console.log("업데이트 시작.");
    const users = await readUser();
    const userIndex = users.findIndex(user => user.email == updateData.email);

    if(userIndex === -1){
        throw new Error('사용자를 찾을 수 없습니다.');
    }

    users[userIndex] = updateData;
}



module.exports = {readUser,writeUser,UpdateUser};


// function handleSubmit(event) {
//     event.preventDefault(); // 기본 제출 동작 방지

//     // 팝업 메시지
//     alert('회원가입 되셨습니다.');

//     // 로그인 페이지로 리디렉션 (일정 시간 후)
//     setTimeout(() => {
//         window.location.href = '/login'; // 로그인 페이지의 URL
//     }, 1000); // 1초 후에 리디렉션
// }
