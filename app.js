const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 8080;

//cors 설정
app.use(cors({
    origin : 'http://localhost:3000',
    credentials : true  
}));

//json 파싱 미들웨어
app.use(express.json());

//정적 파일 제공
app.use(express.static(path.join(__dirname,'/public')));



//로그인 페이지
app.get('/auth/login', (req, res) => {
    res.sendFile(path.join(__dirname, './public/HTML', 'Login.html'));
});

//회원가입 페이지
app.get('/auth/signup', (req, res) => {
    res.sendFile(path.join(__dirname, './public/HTML', 'SignUp.html'));
});

//게시글 목록 조회
app.get('/posts', (req, res) => {
    res.sendFile(path.join(__dirname, './public/HTML', 'DashBoard.html'));
});

//게시글 작성
app.get('/posts/write', (req, res) => {
    res.sendFile(path.join(__dirname, './public/HTML', 'AddPost.html'));
});

//게시글 상세 조회
app.get('/posts/:post_id', (req, res) => {
    res.sendFile(path.join(__dirname, './public/HTML', 'ViewPost.html'));
});

//게시글 수정 페이지 로드
app.get('/:post_id/edit', (req, res) => {
    res.sendFile(path.join(__dirname, './public/HTML', 'EditPost.html'));
});

//회원정보 수정(닉네임,사진) : 페이지 로드
app.get('/users/me', (req,res) => {
    res.sendFile(path.join(__dirname, './public/HTML', 'EditProfile.html'));
});

//회원정보 수정(패스워드) :페이지 로드
app.get('/users/me/password', (req,res) => {
    res.sendFile(path.join(__dirname, './public/HTML', 'EditPassword.html'));
});








//서버 실행
app.listen(port, function () {
    console.log(`Server is running on http://localhost:${port}/auth/login`)});