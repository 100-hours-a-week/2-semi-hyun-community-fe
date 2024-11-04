//대시보드 비즈니스 로직을 처리

const path = require('path'); //디렉토리 경로를 다루는 기본 모듈

exports.getDashboard = (req, res) => {
    res.sendFile(path.join(__dirname, '../community/HTML', 'DashBoard.html'));
}


