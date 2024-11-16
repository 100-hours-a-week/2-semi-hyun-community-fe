const express = require('express');
const path = require('path');
const session = require('express-session');

const authRoutes = require('./routes/authRoutes'); //폴더 경로
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
const port = 8080;

// form-data 파싱
app.use(express.urlencoded({ extended: true })); 
//json 파싱 미들웨어
app.use(express.json());

//(+)세션 미들웨어
app.use(session({
    secret: 'your_secret_key', // 비밀 키
    resave: false, // 세션을 항상 저장할 지 여부'
    saveUninitialized: true, // 초기화되지 않은 세션을 저장할 지 여부
    cookie: {secure:false} //https를 통해서만 쿠키를 전송할지 여부

}))
//정적 파일 제공
// 'public' 디렉토리 내의 파일들을 정적 파일로 제공
app.use(express.static(path.join(__dirname,'community')));

//라우트 설정
app.use('/',authRoutes);
app.use('/dashboard',dashboardRoutes);


app.listen(port, function () {
    console.log(`Server is running on http://localhost:${port}/login`)});