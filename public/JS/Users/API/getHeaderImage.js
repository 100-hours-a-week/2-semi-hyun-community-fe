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
        const headerProfileImg = document.querySelector('.profile-icon-dropdown .account-img');
        if(result.image){
            headerProfileImg.src = `${BASE_URL}/images/profile/${result.image}`;
        }
        
    } catch (error) {
        console.error('Error fetching header image:', error);
    }


};


document.addEventListener('DOMContentLoaded',getHeaderImage);