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

exports.editComment = async(req,res)=> {
    const {post_id,comment_id} = req.params;
    const {content} = req.body;

    if(!content){
        return res.status(400).json({message: '내용을 입력해주세요.'});
    }
    const post = await PostService.patchComment(post_id,comment_id,content);

    if(!post){
        return res.status(404).json({message: '게시글을 찾을 수 없습니다.'});
    }

    //수정 성공
    return res.status(200).json({message: '댓글이 수정되었습니다.'});
};

exports.deleteComment = async (req,res)=> {
    const {post_id,comment_id} = req.params;

    const post = await PostService.deleteComment(post_id,comment_id);

    if(!post){
        return res.status(404).json({message: '댓글이 존재하지 않습니다.'});
    }

    //NOTE : fetch : json()을 사용하기 위해 204 대신 json 포함해서 전송
    return res.status(200).json({message: '댓글이 삭제되었습니다.'});
};

