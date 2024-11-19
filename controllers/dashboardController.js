//대시보드 비즈니스 로직을 처리

const path = require('path'); //디렉토리 경로를 다루는 기본 모듈

//게시판 조회
exports.getDashboard = (req, res) => {
    res.sendFile(path.join(__dirname, '../community/HTML', 'DashBoard.html'));
}

//게시글 작성
exports.getWritePost = (req, res) => {
    res.sendFile(path.join(__dirname, '../community/HTML', 'AddPost.html'));
}

//게시글 조회
exports.getPost = (req, res) => {
    res.sendFile(path.join(__dirname, '../community/HTML', 'ViewPost.html'));
}

//게시글 수정
exports.getEditPost = (req, res) => {
    res.sendFile(path.join(__dirname, '../community/HTML', 'EditPost.html'));
}

