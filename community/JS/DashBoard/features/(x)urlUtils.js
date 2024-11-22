
//  URL 경로의 마지막 세그먼트를 추출하는 함수
// 예: '/posts/123' -> '123'
// @returns {string} 경로의 마지막 세그먼트

export function getLastPathSegment() {
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1];
}


//URL에서 특정 쿼리 파라미터 값을 추출하는 함수
//@param {string} paramName - 추출할 쿼리 파라미터 이름
// @returns {string|null} 파라미터 값 또는 null
export function getQueryParam(paramName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName);
}
