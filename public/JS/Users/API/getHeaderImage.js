import { BASE_URL, API_URL } from '/config/constants.js';
// const BASE_URL = 'http://localhost:3000';

const getHeaderImage = async () => {
    try{
        const response = await fetch(`${API_URL}/users/me/header_image`,{
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if(!response.ok) {
            throw new Error('Failed to fetch header image');
        }

        const result = await response.json();

        //NOTE : .account-img 클래스를 가진 모든 요소를 선택 -> 헤더 + 게시글 상세보기 프로필
        const headerProfileImg = document.querySelector('.account-img');
        if(result.image){
            headerProfileImg.src = `${BASE_URL}/images/profile/${result.image}`;
        }
        
    } catch (error) {
        // 템플릿 리터럴 사용
        console.error(`Error fetching header image: ${error}`);
    }
};

// 화살표 함수 사용
document.addEventListener('DOMContentLoaded', getHeaderImage);