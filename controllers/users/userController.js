const path = require('path');

//회원정보 수정 : 페이지 라우트
exports.getEditProfile = (req,res) => {
    res.sendFile(path.join(__dirname, '../community/HTML', 'EditProfile.html'));
}

//회원정보 수정 : 패스워드 페이지 라우트
exports.getEditPassword = (req,res) => {
    res.sendFile(path.join(__dirname, '../community/HTML', 'EditPassword.html'));
}

//회원정보 수정 : 닉네임
exports.patchName = (req,res) => {}

//회원정보 수정 : 사진
exports.patchProfile = (req,res) => {}

//회원정보 수정 : 패스워드
exports.patchPassword = (req,res) => {}

//회원정보 삭제
exports.deleteUser = (req,res) => {}