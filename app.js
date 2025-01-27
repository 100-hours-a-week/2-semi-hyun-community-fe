import express from 'express';
// import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import {fileURLToPath} from 'url';
import {PORT, CORS_OPTIONS} from './public/config/config.js';

const app = express();
const port = PORT;

//__dirname 대신 __filename 사용
//★ 이유묻기
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Commented out to debug the function behaviors
// app.use(helmet({
//     contentSecurityPolicy :{
//       directives: {
//         "default-src" :["'self'"],
//         "script-src" :["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"], //js를 불러올 때 + 도메인 레벨로 설정
//         "style-src" :["'self'", "'unsafe-inline'"], //css 파일을 불러올 떄
//         "img-src" :["'self'", "data:", "http://localhost:3000"], //이미지를 불러올때
//         "connect-src":["'self'", "http://localhost:3000"] //API 요청
//     }
//     }
// }));

//cors 설정
app.use(cors(CORS_OPTIONS));

//json 파싱 미들웨어
app.use(express.json());
//정적 파일 제공
app.use(express.static(path.join(__dirname,'/public')));


//이용약관 페이지
app.get('/terms', (req, res) => {
    res.sendFile(path.join(__dirname, './public/terms', 'termsOfService.html'));
});

//개인정보 페이지
app.get('/privacy', (req, res) => {
    res.sendFile(path.join(__dirname, './public/terms', 'privacyPolicy.html'));
});

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
app.get('/posts/:post_id/edit', (req, res) => {
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
    console.log(`--Front Server Start-- ${new Date().toISOString()} - Port: ${port}`);
    console.log(` http://localhost:${port}/auth/login`);

});