//대시보드 비즈니스 로직을 처리
const path = require('path'); //디렉토리 경로를 다루는 기본 모듈
const upload = require('../community/JS/DashBoard/multerConfig');
const PostService = require('../community/JS/DashBoard/PostService');

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

//게시글 추가
//NOTE: 미들웨어+요청처리 -> 배열로 순서대로 처리
exports.postAddPost = [upload.single('image'),(req,res) => {
    const {title, content, user_id} = req.body;

    try{
        const newPost = PostService.addPost({
            title,
            content,
            user_id,
            imageFilename: req.file ? req.file.filename : ''
        });

        res.status(201).json({
            message: 'post created successfully',
            data: newPost.post_id
        });

    }catch(error){
        res.status(500).json({ message: 'server_error' });
        console.error('Error creating post:', error);
    }



}];
