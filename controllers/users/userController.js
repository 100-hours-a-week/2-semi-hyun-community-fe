const path = require('path');
const UserService = require('../../community/JS/Users/features/UserService');

//회원정보 수정 : 페이지 로드
exports.getEditUser = (req,res) => {
    res.sendFile(path.join(__dirname, '../../community/HTML', 'EditProfile.html'));
}
// 회원정보 수정: 데이터 조회
exports.getEditUserData = async(req,res) => {
    const user_id = req.user.user_id;
    // console.log(user_id);
    const user = await UserService.getUserById(user_id);

    if(!user){
        return res.status(404).json({message:'회원정보가 없습니다.'});
    }

    return res.status(200).json({
        data: { name: user.name, email: user.email },
        message: 'get user data success'
    });


}

//회원정보 수정 : 패스워드 페이지 로드
exports.getEditPassword = (req,res) => {
    res.sendFile(path.join(__dirname, '../../community/HTML', 'EditPassword.html'));
}

//회원정보 수정 : 닉네임
exports.patchName = (req,res) => {}

//회원정보 수정 : 사진
exports.patchProfile = (req,res) => {}

//회원정보 수정 : 패스워드
exports.patchPassword = (req,res) => {}

//회원정보 삭제
exports.deleteUser = (req,res) => {}