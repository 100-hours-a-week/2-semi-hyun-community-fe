const express = require('express');
const router = express.Router(); 
const userController = require('../controllers/users/userController');

//회원정보 수정(닉네임) 페이지 라우트
router.get('/:user_id', userController.getEditProfile);

//회원정보 수정 : 닉네임
router.patch('/:user_id/name', userController.patchName);

//회원정보 수정 : 사진
router.patch('/:user_id/profile', userController.patchProfile);

//회원정보 수정(비밀번호) 페이지 라우트
router.get('/:user_id/password', userController.getEditPassword);

//회원정보 수정 : 패스워드
router.patch('/:user_id/password', userController.patchPassword);

//회원정보 삭제
router.delete('/:user_id',userController.deleteUser);

//라우터 객체를 모듈로 내보내기
//NOTE: 다른 파일에서 라우터를 쉽게 가져와 사용할 수 있다. + 재사용성
module.exports = router; 