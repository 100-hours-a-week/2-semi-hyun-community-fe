//제목, 본문 모두 입력 시 등록 버튼 활성화 ACA0EB > 7F6AEE
const titleInput = document.getElementById('title'); // HTML 객체를 가리키는 객체
const contextInput = document.getElementById('context');
const createButton = document.querySelector('.create-button');
//제목 최대 26글자. 이후론 입력x
titleInput.maxLength = 26; // HTML 속성으로 최대 길이 제한

//버튼 색 변경
// function ChangeButtonColor(){
//     const hasTitle = titleInput.value.length > 0;
//     const hasContent = contextInput.value.length > 0;
    
//     if(hasTitle && hasContent){
//         createButton.style.backgroundColor = '#7F6AEE';
//     } else {
//         createButton.style.backgroundColor = '#ACA0EB';
//     }
// }

// titleInput.addEventListener('input', ChangeButtonColor);
// contextInput.addEventListener('input', ChangeButtonColor);

//NOTE : 사용자가 제목이나 내용을 입력할 때마다 버튼의 색상이 자동으로 업데이트되도록 하는 코드
//NOTE : 다른 종류의 이벤트를 추가할때를 고려
// ['input'].forEach(event => {
//     titleInput.addEventListener(event, ChangeButtonColor);
//     contextInput.addEventListener(event, ChangeButtonColor);
// });
