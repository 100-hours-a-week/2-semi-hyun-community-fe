const BASE_URL = 'http://localhost:3000';

const getHeaderImage = async () => {
    try{
        const response = await fetch(`http://localhost:3000/api/v1/users/me/header_image`,{
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if(!response.ok){
            throw new Error('Failed to fetch header image');
        }

        const result = await response.json();

        //NOTE : .account-img 클래스를 가진 모든 요소를 선택 -> 헤더 + 게시글 상세보기 프로필
        const headerProfileImgs = document.querySelectorAll('.account-img');
        if(result.image){
            headerProfileImgs.forEach(img => {
                img.src = `${BASE_URL}/images/profile/${result.image}`;
            });
        }
        
    } catch (error) {
        console.error('Error fetching header image:', error);
    }


};


document.addEventListener('DOMContentLoaded',getHeaderImage);