//제목, 본문 모두 입력 시 등록 버튼 활성화 ACA0EB > 7F6AEE
const titleInput = document.getElementById('title'); // HTML 객체를 가리키는 객체
const contextInput = document.getElementById('context');

//제목 최대 26글자. 이후론 입력x
titleInput.maxLength = 26; // HTML 속성으로 최대 길이 제한


//버튼 색 변경
//FIXME: 왜 또 동작이 안돼.
function ChangeButtonColor(){
    if(titleInput.value.length > 0 && contextInput.value.length > 0){
        document.querySelector('.create-button').style.backgroundColor = '#7F6AEE';
    }
}

//NOTE: DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    ChangeButtonColor();
});
