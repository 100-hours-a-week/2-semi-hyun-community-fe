const fs = require('fs');
const path = require('path');
const SignUp = require('../community/JS/Login/SignUp');


exports.getLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../community/HTML', 'Login.html'));
}

exports.getSignUp = (req, res) => {
    res.sendFile(path.join(__dirname, '../community/HTML', 'SignUp.html'));
}

exports.getSignIn = (req, res) => {
    res.sendFile(path.join(__dirname, '../community/HTML', 'SignIn.html'));
}

//회원가입 처리
exports.postSignUp = async (req, res) => {
    const { name, email, password } = req.body; //입력한 정보 가져옴

    console.log(`회원가입 정보: 이름: ${name}, 이메일: ${email}, 비밀번호: ${password}`);

    if (!name || !email || !password) { //각 필드가 존재하는지 확인
        return res.status(400).send('모든 필드를 입력해야 합니다.');
    }

    const userData = { name, email, password };
    
    //FIXME : 데이터 유효성 검사 로직
    try {
        const users = await SignUp.readUser(); //비동기 작업 -> 목록 읽기 (프로미스가 해결될때까지 기다림) -> 그냥 await 삭제
        console.log('현재 사용자 목록:', users); // 사용자 목록 로그 출력
        users.push(userData); //새로운 사용자 추가
        await SignUp.writeUser(users);
        //성공 응답
        res.status(201).json({
            status: 'success',
            message : 'success signup.',
            data:{}

        });
    } catch (error) {
        console.error('회원가입 처리 중 오류 발생:', error);
        res.status(500).json({
            status: 'error',
            message: '회원가입 중 오류가 발생했습니다.',
            data: null,
        });
    }
};

// 로그인 처리
