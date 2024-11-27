//로그인, 회원가입 라우트트 설정하는 파일
const express = require('express');
//NOTE: express.Router 라우터 객체 생성 -> 라우터를 하나로 그룹화
// ㄴ라우터를 모듈화 하고 구조적으로 관리 가능
const router = express.Router(); 
const authController = require('../controllers/authController');


//로그인 페이지를 클라이언트에 전송
router.get('/login', authController.getLogin);
//로그인 처리 (POST)
router.post('/login',authController.postLogin);

//회원가입 페이지 라우트
router.get('/signUp',authController.getSignUp);
//회원가입 처리 라우트 (POST)
router.post('/signUp',authController.postSignUp);

//로그아웃 라우트
// router.get('/logout', authController.getLogout);


//라우터 객체를 모듈로 내보내기
//NOTE: 다른 파일에서 라우터를 쉽게 가져와 사용할 수 있다. + 재사용성
module.exports = router; 
