const fs = require('fs');
const path = require('path');
const postsFilePath = path.join(__dirname, '../../data', 'posts.json');

//게시글 저장
const savePosts = (posts) => {
    try {
        fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing posts:', error);
        throw new Error('Failed to save posts');
    }  
};

// 모든 게시글 조회
const getAllPosts = () => {
    try {
        const postsData = fs.readFileSync(postsFilePath, 'utf8');
        return JSON.parse(postsData);
    } catch (error) {
        console.error('Error reading posts:', error);
        throw new Error('Failed to read posts');
    }
};

// 특정 게시글 조회
const getPosts = (offset, limit) => {
    const posts = getAllPosts();
    //NOTE: 유효한 범위로 제한
    const startIndex = Math.max(0, offset);
    const endIndex = Math.min(posts.length, startIndex + limit);
    
    return posts.slice(startIndex, endIndex);
}


//게시글 추가
//NOTE: {} : 객체 구조 분해 -> 매개변수 순서가 자유롭다. 기본값 설정이 쉽다.
const addPost = ({ title, content, name, user_id, imageFilename = '' }) => {
    console.log('addPost 호출');
    console.log(title, content, user_id, imageFilename);

    const posts = getAllPosts();
    
    const newPost = {
        post_id: Date.now().toString(), //NOTE:현재시간을 밀리초 단위로 반환
        title,
        content,
        image: imageFilename,
        name,
        user_id,
        created_date: new Date().toISOString(),
        updated_date: new Date().toISOString(),
        views: "0",
        likes: "0",
        comments_count: "0",
        profile_image_path: "",
        comments: []
    };

    posts.unshift(newPost);
    savePosts(posts);
    return newPost;
};


// id로 게시글 조회

const getPostById = (post_id) => {
    const posts = getAllPosts();
    const post = posts.find(post => post.post_id === post_id);
    return post;

};

//게시글 수정



module.exports = {
    addPost,
    getPostById,
    getPosts
}