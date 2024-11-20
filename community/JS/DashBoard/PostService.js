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


//게시글 추가
const addPost = ({ title, content, user_id, imageFilename = '' }) => {
    console.log('addPost 호출');
    console.log(title, content, user_id, imageFilename);

    const posts = getAllPosts();
    
    const newPost = {
        post_id: Date.now().toString(),
        title,
        content,
        image: imageFilename,
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

//게시글 수정



module.exports = {
    addPost
}