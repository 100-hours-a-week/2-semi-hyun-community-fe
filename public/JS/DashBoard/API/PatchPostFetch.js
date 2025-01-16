import { BASE_URL, API_URL } from '/config/constants.js';

// 경로에서 post_id 추출 - 구조분해할당 활용
const [, , post_id] = window.location.pathname.split('/').slice(0, -1);

//기존 이미지 삭제 여부
let isImageDeleted = false;

const elements = {
    title: document.getElementById('title'),
    content: document.getElementById('content'),
    imageInput: document.getElementById('image'),
    fileName: document.getElementById('file-name'),
    currentImg : document.getElementById('current-img'),
    currentImgContainer: document.getElementById('image-preview-container'),
    deleteButton: document.getElementById('delete-button'),
    patchButton: document.getElementById('patch-button')
};

// 수정 페이지에 데이터 표시
const loadPatchPost = async () => {
    try {    
        // 게시글 데이터 가져오기
        const response = await fetch(`${API_URL}/posts/${post_id}/edit-data`, {
            credentials: 'include'
        });
        const post = await response.json();

        if(!response.ok){
            alert('게시글 목록 가져오기를 실패했습니다');
        }

        // 객체 구조분해할당으로 필요한 데이터 추출
        const { title, content, post_image } = post;

        // 데이터 표시
        elements.title.value = title;
        elements.content.value = content;
        
        if(post_image) {
            elements.fileName.textContent = `현재 이미지: ${post_image}`;
            elements.currentImgContainer.style.display = 'block';
            elements.currentImg.src = `${BASE_URL}/images/${post_image}`;
            
        }

    } catch(error) {
        console.error('게시글 데이터 가져오기 실패:', error);
    }
};

// 이미지 삭제
const DeleteImage = () => {

    elements.currentImgContainer.style.display = 'none';
    elements.fileName.textContent = '선택한 이미지 없음';
    elements.imageInput.value = '';
    isImageDeleted = true;

};

// 이미지 표시
const ShowImage = () => {

    const file = elements.imageInput.files[0];
    elements.currentImgContainer.style.display = 'block';

    if(file){
        if (!file.type.match('image.*')) {
            alert('이미지 파일만 업로드 가능합니다.');
            elements.imageInput.value = '';
            elements.fileName.textContent = '선택한 이미지 없음';

            return;
        }
        const reader = new FileReader();
        elements.fileName.textContent = `현재 이미지: ${file.name}`;

        reader.onload = (e) => {
            elements.currentImg.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }

}

// 수정 요청 -> 수정 완료 후 게시글 표시로 이동
const patchPost = async () => {
    try {
        const formData = new FormData();
        formData.append('title', elements.title.value);
        formData.append('content', elements.content.value);

        // 이미지 삭제 여부 전송
        formData.append('isImageDeleted', isImageDeleted);
        
        if(elements.imageInput.files[0]) {
            formData.append('image', elements.imageInput.files[0]); //실제객체
        }

        const response = await fetch(`${API_URL}/posts/${post_id}`, {
            method: 'PATCH',
            credentials: 'include',
            body: formData
        });

        if(response.status === 204) {
            alert('게시글이 수정되었습니다.');
            window.location.href = `/posts/${post_id}`; //api/v1/posts/${post_id} 수정
        } else {
            alert('게시물 수정을 실패했습니다.');
            throw new Error('게시물 수정 실패');
        }
        
    } catch(error) {
        console.error('게시글 수정 실패:', error);
    }
    
};

// 이벤트 리스너
document.addEventListener('DOMContentLoaded', loadPatchPost);
elements.deleteButton.addEventListener('click', DeleteImage);
elements.imageInput.addEventListener('change', ShowImage);
elements.patchButton.addEventListener('click', patchPost);