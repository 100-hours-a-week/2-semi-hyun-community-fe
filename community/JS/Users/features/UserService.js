const fs = require('fs');
const path = require('path');
const rootDir = path.resolve(__dirname,'../','../','../');
const userFilePath = path.join(rootDir,'data/login.json'); //../에서 .../로

//json 저장 로직 : 모든 데이터를 로드 -> 특정 데이터 find 
//-> 데이터 수정 -> 수정한 데이터로 덮기

//데이터 저장
const saveUsers = (users) => {
    try{
        fs.writeFileSync(userFilePath, JSON.stringify(users,null,2),'utf8');
        return true;
    }catch(error){
        console.error('Error writing user:',error);
    }
}

//모든 데이터 조회
const getAllUsers = () =>{
    try{
        if(!fs.existsSync(userFilePath)){
            return []; //파일이 없다면 빈 배열 반환
        }

        const usersData = fs.readFileSync(userFilePath,'utf8');
        return JSON.parse(usersData);
    }catch(error){
        console.error('Error reading user:',error);
    }
}

//특정 데이터 조회
const getUserById = (user_id) => {
    const users = getAllUsers();
    const user = users.find(user => user.user_id === user_id);

    if(!user) {
        return null;
    }

    return user;
}

module.exports ={
    getUserById
}