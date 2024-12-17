import { API_URL } from '/config/constants.js';
const PatchButton = document.getElementById('patch-button');

// 경로에서 post_id 추출 - 구조분해할당 활용
const [, , post_id] = window.location.pathname.split('/').slice(0, -1);

// 수정 페이지에 데이터 표시
const loadPatchPost = async () => {
    try {    
        // 게시글 데이터 가져오기
        const response = await fetch(`${API_URL}/posts/${post_id}/data`, {
            credentials: 'include'
        });
        const post = await response.json();

        // 객체 구조분해할당으로 필요한 데이터 추출
        const { title, content, image } = post;

        // DOM 요소 한번에 가져오기
        const elements = {
            title: document.getElementById('title'),
            content: document.getElementById('content'),
            fileName: document.getElementById('file-name')
        };

        // 데이터 표시
        elements.title.value = title;
        elements.content.value = content;
        
        if(image) {
            const imageName = image.split('/').pop();// 파일 경로에서 파일명만 추출
            elements.fileName.textContent = `현재 이미지: ${imageName}`;
        }

    } catch(error) {
        console.error('게시글 데이터 가져오기 실패:', error);
    }
};

// 수정 요청 -> 수정 완료 후 게시글 표시로 이동
const patchPost = async () => {
    try {
        // DOM 요소 한번에 가져오기
        const elements = {
            title: document.getElementById('title'),
            content: document.getElementById('content'),
            image: document.getElementById('image') // value가 아닌 element 자체를 가져옴
        };

        const formData = new FormData();
        formData.append('title', elements.title.value);
        formData.append('content', elements.content.value);
        
        if(elements.image.files[0]) {
            formData.append('image', elements.image.files[0]); //실제객체
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
PatchButton.addEventListener('click', patchPost);