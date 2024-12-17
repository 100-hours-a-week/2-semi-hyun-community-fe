import { API_URL } from '/config/constants.js';

document.getElementById('AddPostButton').addEventListener('click', async () => {
    const user_id = localStorage.getItem('user_id');
    const name = localStorage.getItem('name');
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const imageInput = document.getElementById('image'); // value가 아닌 element 자체를 가져옴

    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('name', name);
    formData.append('title', title);
    formData.append('content', content);
    if (imageInput.files[0]) formData.append('image', imageInput.files[0]);
    try {
        const response = await fetch(`${API_URL}/posts`, { // 절대 경로로 수정
            method: 'POST',
            credentials: 'include', // 쿠키 포함
            //NOTE: formData는 Content-type이 자동으로 설정됨. 직접 설정 안함
            body: formData
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        console.log(result.post_id);
        if (response.status === 201) {
            alert('게시물이 등록되었습니다.');
            window.location.href = `/posts/${result.post_id}`;
        } else {
            alert('게시물 등록에 실패했습니다.');
        }
    } catch (error) {
        console.log('Error:', error);
        alert('게시물 등록 중 오류가 발생했습니다.');
    }
});



