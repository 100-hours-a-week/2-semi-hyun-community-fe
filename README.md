# 2-semi-hyun-community-fe
우당탕탕 커뮤니티
## 0. 정리
- [2-semi-hyun-community-fe](https://github.com/100-hours-a-week/2-semi-hyun-community-fe)
- [2-semi-hyun-community-be](https://github.com/100-hours-a-week/2-semi-hyun-community-be)
- 
## 1. 스택
HTML, CSS, JavaScript

## 2. 기능
- 사용자 별 게시글 작성/수정/삭제 기능 구현
- 게시글 댓글 기능을 통해 상호작용 가능
- 나만의 닉네임을 가져봐요★
  
## 3. 폴더구조
```
2-semi-hyun-community-fe
├─ app.js
├─ package-lock.json
├─ package.json
├─ public
│  ├─ CSS
│  │  ├─ addpost.css
│  │  ├─ dashboard.css
│  │  ├─ default.css
│  │  ├─ default_profile.css
│  │  ├─ editPassword.css
│  │  ├─ editProfile.css
│  │  ├─ login.css
│  │  └─ viewPost.css
│  ├─ HTML
│  │  ├─ AddPost.html
│  │  ├─ DashBoard.html
│  │  ├─ EditPassword.html
│  │  ├─ EditPost.html
│  │  ├─ EditProfile.html
│  │  ├─ Login.html
│  │  ├─ SignUp.html
│  │  └─ ViewPost.html
│  └─ JS
│     ├─ DashBoard
│     │  ├─ API
│     │  │  ├─ AddPostFetch.js
│     │  │  ├─ CommentFetch.js
│     │  │  ├─ DashboardDataFetch.js
│     │  │  ├─ DeletePostFetch.js
│     │  │  ├─ LikeFetch.js
│     │  │  ├─ PatchPostFetch.js
│     │  │  └─ ViewPostFetch.js
│     │  └─ features
│     │     ├─ AddPostFunction.js
│     │     ├─ DashboardFunction.js
│     │     ├─ PostIdManager.js
│     │     └─ urlUtils.js
│     ├─ Login
│     │  ├─ API
│     │  │  ├─ LoginFetch.js
│     │  │  └─ SignUpFetch.js
│     │  └─ features
│     │     └─ LoginEmailCheck.js
│     └─ Users
│        ├─ API
│        │  ├─ getHeaderImage.js
│        │  ├─ getUserData.js
│        │  ├─ patchPassword.js
│        │  └─ patchUserData.js
│        └─ features
│           ├─ EditPwCheck.js
│           └─ ProfileImage.js
└─ README.md

```

## 4. 파일 구조
```mermaid
graph TD
    subgraph Frontend
        HTML[HTML Files]
        CSS[CSS Files]
        JS[JavaScript Files]
        
        subgraph HTML
            Dashboard[DashBoard.html]
            ViewPost[ViewPost.html]
            AddPost[AddPost.html]
            EditPost[EditPost.html]
            EditProfile[EditProfile.html]
            EditPassword[EditPassword.html]
        end

        subgraph CSS
            DefaultCSS[default.css]
            DashboardCSS[dashboard.css]
            ViewPostCSS[viewPost.css]
            AddPostCSS[addpost.css]
            ProfileCSS[default_profile.css]
        end

        subgraph JS
            Features[Features]
            API[API]
        end
    end

    subgraph Backend
        Express[Express Server]
        Routes[Routes]
    end

    %% 연결관계
    Dashboard --> DashboardCSS
    Dashboard --> DefaultCSS
    Dashboard --> ProfileCSS
    
    ViewPost --> ViewPostCSS
    ViewPost --> DefaultCSS
    ViewPost --> ProfileCSS
    
    Features --> API
    HTML --> JS
    JS --> Express

    %% API 호출 관계
    API --> |Fetch| Express
    Express --> |Response| API

    %% 스타일 적용
    classDef html fill:#f96,stroke:#333,stroke-width:2px
    classDef css fill:#9cf,stroke:#333,stroke-width:2px
    classDef js fill:#ff9,stroke:#333,stroke-width:2px
    classDef server fill:#9f9,stroke:#333,stroke-width:2px

    class Dashboard,ViewPost,AddPost,EditPost,EditProfile,EditPassword html
    class DefaultCSS,DashboardCSS,ViewPostCSS,AddPostCSS,ProfileCSS css
    class Features,API js
    class Express,Routes server
```
