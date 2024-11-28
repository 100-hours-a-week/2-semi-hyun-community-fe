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

//사진 삭제

//회원 정보 수정
const patchPost = (user_id,userdata) => {
    const users = getAllUsers();
    const userIndex = users.findIndex(user => user.user_id === user_id);

    if(userIndex === -1){
        return null
    }

    //데이터 수정 (스프레드 연산자 사용)
    users[userIndex] ={
        ...users[userIndex],
        name: userdata.name,
        image : userdata.image? userdata.image : users[userIndex].image,
        updated_date: new Date().toISOString()
    };

    //수정된 데이터를 저장
    saveUsers(users);

    return true;
}


module.exports ={
    getUserById,
    patchPost
}