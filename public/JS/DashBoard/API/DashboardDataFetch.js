import { BASE_URL,API_URL } from '/config/constants.js';
import { initLoadingAnimation,playLoadingAnimation,stopLoadingAnimation } from '/JS/DashBoard/features/AnimationLoading.js';

let isLoading = false; //로딩 중인지 여부
let offset = 0;
const limit = 5;

//게시글 조회목록 렌더링
const postList = document.querySelector('#post-container');
const sentinel = document.querySelector('#sentinel');

//로딩 애니메이션 초기화
initLoadingAnimation();

// 게시판 목록이 있을 경우 list-empty 비활성화
// 게시글 로드 후 실행
const isListEmpty = () => {
  const postEmpty = document.querySelector('.post-empty');
  const hasPost = document.querySelectorAll('.post-list').length > 0; // 게시글 갯수
  postEmpty.style.display = hasPost ? 'none' : 'block';
};

const loadPosts = async () => {
  try {
    console.log(offset);
    const response = await fetch(`${API_URL}/posts/data?offset=${offset}&limit=${limit}`, {
        credentials: 'include',
    });

    if(!response.ok){
        alert('게시글 목록 가져오기를 실패했습니다');
        window.location.replace('/auth/login');
    }

    const posts = await response.json();

    //게시글이 없을경우 가져오지 않음
    if (posts.length === 0) {
      observer.unobserve(sentinel);
      return;
  }

    posts.forEach(post => {
        const postItem = document.createElement('article');
        postItem.className = 'post-list';
        postItem.innerHTML = `
          <a href="/posts/${post.post_id}">
            <div class="post-title">
              <h2>${post.title}</h2>
              <div class="post-meta">
                <span class="stats">
                  <span class="likes">좋아요 ${post.likes}</span>
                  <span class="comments">댓글 ${post.comments}</span>
                  <span class="views">조회수 ${post.views}</span>
                </span>
                <time class="date">${post.created_at}</time>
              </div>
            </div>
          </a>
          <div class="author-info">
            <img class="account-img" src="${BASE_URL}/images/profile/${post.profile_image}" alt="작성자">
            <span class="author-name">${post.name}</span>
          </div>
        `;
        postList.appendChild(postItem);
      });
      
      
      //오프셋 갱신
      offset += limit;

    //게시글 목록이 있을 경우 list-empty 비활성화
    //FIX: foreach 내부 비동기 작업을 기다리지 않고 실행된다.
    isListEmpty();

  } catch(error) {
    console.error('Error:', error);
    console.error('게시글 목록 가져오기 실패', error);
  }
};

//callback
//NOTE entries : 관찰 중인 요소의 교차 상태를 배열로 저장
//NOTE isIntersecting : 요소가 교차 중인지 여부 (true: 요소가 뷰 포트 내부에 있음)
const onIntersection = (entries) => {
  entries.forEach(entry =>{
    console.log('관찰 대상 요소:', entry.target);
    console.log('교차 중:', entry.isIntersecting);
    console.log('교차 비율:', entry.intersectionRatio);

    if(entry.isIntersecting && !isLoading){
      isLoading = true;
      playLoadingAnimation();
      loadPosts().finally(()=>{
        isLoading = false;
        stopLoadingAnimation();
      });
    }
  })
};

//options
const options = {
  root: null, // 뷰포트를 기준으로 관찰
  rootMargin: '0px', // 교차 감지 범위
  threshold: 1.0 // 얼마나 겹쳐야 교차로 인정할지
};

//observer 생성
const observer = new IntersectionObserver(onIntersection, options);

document.addEventListener('DOMContentLoaded', async () => {
  // 1) 초기 로딩
  isLoading = true;       // 로딩 플래그
  await loadPosts();      // 첫 게시글 로드
  isLoading = false;

  // 2) 초기 로딩 끝난 후부터 무한 스크롤 관찰 시작
  observer.observe(sentinel);
});