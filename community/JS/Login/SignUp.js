const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname,'../../data/data.json'); //../에서 .../로


//data.json 파일 읽기
// const readUser = () => {
//     return new Promise((resolve, reject) => {
//         console.log(filePath);
//         fs.readFile(filePath, 'utf8', (err, data) => {
//             if (err) { console.error('파일 읽기 오류:', err); reject(err);} //파일 읽기 오류 발생
//             else{
//                 console.log('파일 내용:', data); // 파일 내용 로그 출력
//                 resolve(data ? JSON.parse(data) : []);} //파일 내용 반환
//         });
//     });
// };


async function readData(){
    try{
        const data = await fs.readFile(path.join(__dirname,filePath), 'utf8');
        console.log('파일 내용:', data);
        return data ? JSON.parse(data) : [];
    }
    catch(err){
        console.error('파일 읽기 오류:', err);
        return;
    }
}
const readUser = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            console.log(filePath);
            if (err) {
                console.error('파일 읽기 오류:', err);
                reject(err);
            } else {
                console.log('파일 내용:', data);
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

module.exports = {readUser,writeUser};


// function handleSubmit(event) {
//     event.preventDefault(); // 기본 제출 동작 방지

//     // 팝업 메시지
//     alert('회원가입 되셨습니다.');

//     // 로그인 페이지로 리디렉션 (일정 시간 후)
//     setTimeout(() => {
//         window.location.href = '/login'; // 로그인 페이지의 URL
//     }, 1000); // 1초 후에 리디렉션
// }
