import ValidationState from '../../Login/features/ValidationState.js';
const profileImg = document.getElementById('profile-img');

let isImageChanged = false;

profileImg.addEventListener('change',()=>{
    isImageChanged = profileImg.files.length > 0;
    ValidationState.setState('profile', 'isChanged', isImageChanged);
});