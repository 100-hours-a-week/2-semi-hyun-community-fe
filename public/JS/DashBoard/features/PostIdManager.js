const PostIdManager =(()=>{
    const pathParts = window.location.pathname.split('/');
    const post_id = pathParts[pathParts.length -1];

    return{
        //NOTE: 메서드로 반환 -> 나중에 return 기능을 추가할 수 있다.
        //ex) isValidId: () => post_id.length >0
        getPostId : () => post_id
    }
})();

//NOTE: 즉시 실행 함수 표현식 사용 : (()=>{})() -> 함수 선언 후 바로 실행
