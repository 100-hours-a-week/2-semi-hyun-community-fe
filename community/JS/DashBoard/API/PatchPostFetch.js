const PatchButton = document.getElementById('patch-button');

//NOTE: 재할당이 필요없으면 const
const pathParts = window.location.pathname.split('/');
const post_id = pathParts[pathParts.length -2]; // /edit 앞의 post_id 가져오기


//수정 페이지에 데이터 표시
const loadPatchPost = async() => {

    try{    
        // 게시글 데이터 가져오기
        const response = await fetch(`/api/v1/posts/${post_id}/data`);
        const post = await response.json();

        // 게시글 데이터 표시
        document.getElementById('title').value = post.title;
        document.getElementById('content').value = post.content;
        
        if(post.image){
            // document.getElementById('image').value = post.image;
            // document.getElementById('file-name').textContent = post.image;
            const imageName = post.image.split('/').pop(); // 파일 경로에서 파일명만 추출
            document.getElementById('file-name').textContent = `현재 이미지: ${imageName}`;
        };



    }catch(error){
        console.error('게시글 데이터 가져오기 실패:', error);
    }


    
};

// 수정 요청 -> 수정 완료 후 게시글 표시로 이동
const patchPost = async()=> {

    try{
        //Fixme: 모듈 시스템으로 변경(addPostFetch.js)
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const imageInput = document.getElementById('image'); // value가 아닌 element 자체를 가져옴

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        
        if(imageInput.files[0]) {
            formData.append('image', imageInput.files[0]); //실제 객체
        }

        const response = await fetch(`/api/v1/posts/${post_id}`,{
            method: 'PATCH',
            credentials: 'include',
            body: formData
        });

        // Note: 서버가 빈응 응답을 보냈을 경우 에러가 날 수 있다.
        // const result = await response.json();

        if(response.status === 204){
            alert('게시글이 수정되었습니다.');
            window.location.href = `/api/v1/posts/${post_id}`; //api/v1/posts/${post_id} 수정
        } else {
            alert('게시물 수정을 실패했습니다.');
            console.error('서버응답',result);
        }
        
    }catch(error){//네트워크 오류, 파싱 오류
        console.error('게시글 수정 실패:', error);
    }
    
};


document.addEventListener('DOMContentLoaded', loadPatchPost);
PatchButton.addEventListener('click', patchPost);