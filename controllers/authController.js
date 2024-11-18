const path = require('path');
const SignUp = require('../community/JS/Login/SignUp');
const { v4: uuidv4 } = require('uuid');


exports.getLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../community/HTML', 'Login.html'));
}


exports.getSignUp = (req, res) => {
    res.sendFile(path.join(__dirname, '../community/HTML', 'SignUp.html'));
}

// 로그인 처리
exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    // 데이터 유효성 검사
    // 1. 비밀번호 또는 이메일이 입력되지 않은 경우
    if (!email || !password) {
        return res.status(400).json({
            message : '비밀번호를 입력해주세요.'
        });
    }

    try {
        const users = await SignUp.readUser(); // 비동기 작업 -> 목록 읽기 (프로미스가 해결될때까지 기다림)
        const user = users.find((user) => user.email === email); //없으면 undefined

        //if undefined = false
        if (!user) { 
            return res.status(401).json({
                message:'이메일이 존재하지 않습니다.'
            });
        }

        // 비밀번호 다시 입력
        if (user.password !== password) { 
            return res.status(401).json({
                message:'비밀번호를 다시 입력해주세요.'
            });
        }

        // 로그인 성공 -> 세션에 사용자 정보 저장
        //req.session.user = user;
        //(+) user_id uuid 생성
        const user_id = uuidv4();
        res.status(200).json({
            message: 'login successful',
            data:{
                user_id : user_id,
                user : user
            }
        });
    } catch (error) {
        console.error('로그인 처리 중 오류 발생:', error);
        res.status(500).json({
            status: 'error',
            message: '로그인 중 오류가 발생했습니다.',
            data: null,
        });
    }
};


//회원가입 처리
exports.postSignUp = async (req, res) => {
    console.log('postSignUp 함수 시작'); // 로그 추가
    const { name, email, password } = req.body; //입력한 정보 가져옴
    const userData = { name, email, password };

    console.log('회원가입 요청:', userData); // 로그 추가

    //데이터 유효성 검사
    if (!name || !email || !password) { 
        return res.status(400).json({message:"invalid_format"});
    }

    try {
        const users = await SignUp.readUser();
        console.log('현재 사용자 목록:', users); // 사용자 목록 로그 출력
        
        //중복 이메일 검사
        if (users.find((user) => user.email === email)) {
            return res.status(409).send('이미 가입된 이메일입니다.');
        }
        
        users.push(userData); //새로운 사용자 추가
        await SignUp.writeUser(users);

        //성공 응답 -> 회원가입 완료 후 로그인 화면으로 리디렉션
        console.log('회원가입 성공, 응답 전송');
        res.status(201).json({
            status: 'success',
            message : '회원가입 완료. 로그인 화면으로 이동',
            data:{}
        });

        //1초 후 로그인 화면으로
        //setTimeout(() => {res.redirect('/login')}, 1000);

    } catch (error) {
        console.error('회원가입 처리 중 오류 발생:', error);
        res.status(500).json({
            status: 'error',
            message: '회원가입 중 오류가 발생했습니다.',
            data: null,
        });
    }
};
