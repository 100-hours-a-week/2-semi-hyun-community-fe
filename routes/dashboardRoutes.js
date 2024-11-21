const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../community/JS/Middlewares/authMiddleware');


//게시글 목록조회
router.get('/', authMiddleware, dashboardController.getDashboard);

//게시글 목록조회 - 데이터 조회
router.get('/data', authMiddleware, dashboardController.getDashboardData);


//게시글 작성
router.get('/write',authMiddleware,dashboardController.getWritePost);

//게시글 추가
router.post('/',authMiddleware,dashboardController.postAddPost);

//게시글 상세조회
router.get('/:post_id',authMiddleware,dashboardController.getPost);

//게시글 상세조회 - 데이터 조회
router.get('/:post_id/data',authMiddleware,dashboardController.getPostData);

//게시글 수정
router.get('/:post_id/edit',authMiddleware,dashboardController.getEditPost);


//NOTE: 라우터 객체를 모듈로 내보내기 -> 주서버에 모두 작성하지 않아도됨
module.exports = router;