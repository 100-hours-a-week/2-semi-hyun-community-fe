const multer = require('multer');

const createMulter = (uploadPath) => {

    //multer 설정
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const encodedFilename = encodeURIComponent(file.originalname);
            cb(null, Date.now() + '-' + encodedFilename);
        }
    });

    //파일 필터링
    const fileFilter = (req,file,cb) => {
        if(file.mimetype.startsWith('image/')){
            cb(null, true);
        }else{
            cb(new Error('지원하지 않는 파일 형식입니다.'), false);
        }
    };

    return multer({
        storage: storage,
        fileFilter:fileFilter,
        limits: {
            fileSize: 1024 * 1024 * 5, //5MB
        }
    })
}

// 게시글 업로드
const postsUpload = createMulter('community/images');

// 프로필 업로드
const profileUpload = createMulter('community/images/profile');

module.exports = {postsUpload, profileUpload};
