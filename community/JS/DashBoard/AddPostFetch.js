const AddPostButton = document.getElementById('AddPostButton');

AddPostButton.addEventListener('click', async ()=>{
    const user_id = localStorage.getItem('user_id');
    const title = document.getElementById('title').value;
    const context = document.getElementById('context').value;
    const image = document.getElementById('image').value;

    const formData =new FormData();
    formData.append('user_id',user_id);
    formData.append('title',title);
    formData.append('context',context);
    formData.append('image',image);

    const response = await fetch('api/v1/posts',{
        method: 'POST',
        credentials: 'include', // 쿠키 포함
        //NOTE: formData는 Content-type이 자동으로 설정됨. 직접 설정 안함
        body: formData
    });

    const result = await response.json();

    if(response.status === 201){
        alert('게시물 등록 완료.');
    }


});



