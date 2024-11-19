const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

/*
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'community', 'DashBoard.html'));
});*/

//게시판 조회
router.get('/', dashboardController.getDashboard);

//게시글 작성
router.get('/write',dashboardController.getWritePost);

//게시글 조회
router.get('/posts/:post_id',dashboardController.getPost);

//게시글 수정
router.get('/posts/:post_id/edit',dashboardController.getEditPost);


//NOTE: 라우터 객체를 모듈로 내보내기 -> 주서버에 모두 작성하지 않아도됨
module.exports = router;