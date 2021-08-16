<p align="center">
    <img src="">
    </img>
</p>
<h1 align="center">UDHD</h1>

<h3 align="center">어차피 덕질할 거 행복하게 덕질하자</h3>

<h4 align="center">
    <a href="#공통-부분">공통 부분</a> &nbsp; • &nbsp;   
    <a href="#key-features">Key Features</a> &nbsp; • &nbsp;   
    <a href="#what-we-use">What We Use</a> &nbsp; • &nbsp;
    <a href="#how-to-use">How To Use</a> &nbsp; •&nbsp;  
    <a href="#made-by">Made By</a>

</h4>
<br>

## 공통 부분
---
### Problem

- 많은 사람들은 아이돌 짤방을 검색하고 저장하는데 문제를 겪고 있습니다.
- 대부분은 검색 결과에서 나타나는 중복 사진들에 대한 불편함과 일반적인 폴더 구조를 사용함으로서 생기는 관리의 어려움입니다.
- 또한 찾고싶은 사진이 있는데 키워드를 몰라 검색하지 못하기도 합니다.

### Solution

- 특정 알고리즘과 자료구조를 사용해 내가 가지고 있는 사진을 걸러내고 나에게 없는 사진만 보여줍니다.  
- 각 사진에 적합한 태그(해시태그)를 사용해 사진을 손쉽게 관리할 수 있습니다.  
- 특정 사진과 유사한 사진도 함께 찾아볼 수 있습니다.
<br/><br/>
<img src="docs/architecture-front.png" />
- [Front Server](https://git.swmgit.org/swm-12/12_swm44/udhd-front)
- [API Server](https://git.swmgit.org/swm-12/12_swm44/api-server)
- [Query Server](https://git.swmgit.org/swm-12/12_swm44/udhd-query-api)
- [Tag Server](https://git.swmgit.org/swm-12/12_swm44/img-experiment-lab)
---
<br/><br/>
## Key Features
---
- 사용자가 저장한 사진들을 보거나 검색할 수 있는 갤러리 역할을 합니다.
- API Server에 구글 드라이브에 있는 사진을 저장하도록 요청을 보냅니다.
- API Server에서 받은 url을 사용해 AWS S3에서 사진 데이터를 받아봅니다.
- 사진 검색, 태그 수정 등의 요청을 API Server에 보냅니다.
<br/>

---

---

<br/>

<br>


## What We Use
---
<table style="margin-left:auto;margin-right:auto;">
<tr>
<td><img width=200 src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"></td>
<td><img width=200 src="https://camo.githubusercontent.com/92ec9eb7eeab7db4f5919e3205918918c42e6772562afb4112a2909c1aaaa875/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313630373535343338352f7265706f7369746f726965732f6e6578742d6a732f6e6578742d6c6f676f2e706e67"></td>
</tr>
<tr>
<td colspan="2">
<img width=650 src=docs/amplify-logo.png />
</td>
</tr>
<table>


## How To Use
```
npm i
npm run build
```

## Made By

Team - Kim Dong Uk / SW Maestro 12st

