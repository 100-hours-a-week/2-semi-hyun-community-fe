const express = require('express');
const path = require('path');
const authRoutes = require('./routes/authRoutes'); //폴더 경로
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
const port = 8080;

//정적 파일 제공
// 'public' 디렉토리 내의 파일들을 정적 파일로 제공
app.use(express.static(path.join(__dirname,'community')));

//라우트 설정
app.use('/',authRoutes);
app.use('/dashboard',dashboardRoutes);


app.listen(port, function () {
    console.log(`Server is running on http://localhost:${port}`)});