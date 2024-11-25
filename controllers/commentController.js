const path = require('path'); //디렉토리 경로를 다루는 기본 모듈
const PostService = require('../community/JS/DashBoard/features/PostService');


exports.addComment = async (req,res)=> {
    const {post_id, user_id, content} = req.body;

    if(!content){
        return res.status(400).json({message: '내용을 입력해주세요.'});
    }

    try{
        const result = await PostService.addComment(post_id,{user_id,content});

        if(!result){
            return res.status(404).json({message: '게시글을 찾을 수 없습니다.'});
        }

        return res.status(201).json({message: '댓글이 등록되었습니다.'});

    }catch(error){
        console.error('댓글 등록 중 오류 발생:', error);
        return res.status(500).json({message: 'internal_server_error'});
    }
};

exports.editComment = (req,res)=> {};

exports.deleteComment = (req,res)=> {};

