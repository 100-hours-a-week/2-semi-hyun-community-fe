//공통으로 사용하는 상수 관리
export const BASE_URL = "http://3.35.218.81:3000";
export const API_URL = `${BASE_URL}/api/v1`;

export const urlUtils = {
    getPostId : ()=>{
        const pathParts = window.location.pathname.split('/');
        const post_id = pathParts[pathParts.length -1];
        return post_id;
    }
}
