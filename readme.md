# Lunch Tech: 점심 식당 추천🍚
**18101197 김상민 프로젝트**

<img src="/webpage/image/main4.png">

학교에 나오는 날이면 항상 식당에서 먹게 되는 점심, 저는 항상 학교 근처의 수백개나 되는 식당 사이에서 고민에 빠지고 맙니다. 3년 사이에 학교 주변의 어지간한 식당은 이미 다 가 봤고, 결국 발걸음은 항상 가던 곳으로 향하게 됩니다.  
매일 어디서 뭘 먹을지 결정하는 일은 누구에게나 상당한 스트레스고 꽤나 시간을 잡아먹는 과정입니다. 그렇기 때문에, 마침내 내린 결정을 통해 먹은 음식이 별로일 때는 화가 나 버립니다.

이 사이트는 저와 같은 사람들을 위해 클릭 몇 번으로 자신이 원하는 조건의 식당을 순식간에 찾을 수 있게 만들었습니다.

[<img src="/webpage/image/StartButton_2.png" width="200" height="75">](http://124.59.4.96:52272)  
(버튼을 클릭하면 사이트로 갈 수 있습니다.)

## ❓사용법

<img src="/webpage/image/main2.png">

1. 메인 화면에서 "시작하기" 버튼을 누르면 조건을 선택하는 페이지가 등장합니다.
2. 자신이 원하는 시간과 가격을 선택하고 "식당 찾아보기" 버튼을 누르면 조건에 맞는 식당이 랜덤으로 나옵니다.

<img src="/webpage/image/main3.png">

3-1. 당신은 식당의 이름과 별점, 대표 사진과 지도, 메뉴와 가격, 리뷰를 확인할 수 있습니다.  
3-2. 또한 당신은 자신의 이름과 의견을 댓글로 남길 수 있습니다.
3-3. 마지막으로, 식당이 마음에 들지 않을 경우 "다른 식당 찾아보기" 버튼으로 조건에 맞는 다른 식당을 찾을 수도 있습니다.

## ⚙로컬에서 사이트 켜는 법
1. [MySQL 사이트](https://dev.mysql.com/downloads/windows/installer/8.0.html)에서 MySQL Community Server를 다운받습니다.  

<img src="/webpage/image/mysql.png">  

2. 설치하는 과정에서 만든 계정을 server.js의 해당 코드에 입력합니다.  
3. 설치된 mysql workbench에서 Server > Data import로 l_tech.sql 파일을 데이터베이스에 추가합니다.
4. [nodejs 사이트](https://nodejs.org/ko/download/)에서 LTS 버전을 설치합니다.
5. 프로젝트 폴더에서 cmd 창을 켜서  
npm install express  
npm install ejs  
npm install mysql
를 입력해 필요한 모듈을 설치합니다.
6. cmd 창에서 node server.js 를 입력해 서버를 실행합니다.
7. 크롬 등의 인터넷 브라우저에서 http://127.0.0.1:52272 로 접속합니다.

## 🛠구현

가장 먼저, 서울 열린데이터광장(http://data.seoul.go.kr/dataList/datasetList.do) 에서 “노원구 음식점 인허가 정보”csv 파일을 다운받아 약 15,000개의 식당을 ‘공릉동’, ‘영업 중’, ‘카카오맵 검색 결과 존재’ 등의 조건으로 주피터노트북에서 셀레니움과 크롬 드라이버를 통해 카카오맵을 돌면서 크롤링을 통해 식당의 이름, 별점, 리뷰, 메뉴 등을 크롤링했습니다.

이렇게 크롤링한 결과를 mysql에 테이블로 저장했습니다.

그리고 자바스크립트와 nodejs의 express, ejs, mysql 모듈, 카카오맵 지도 api를 사용해 웹페이지를 만들었습니다.

### 🔍페이지 상세 구현 설명

모든 설명은 빨간색 사각형과 그 옆의 알파벳으로 구분합니다.  

<img src="/webpage/image/introd_1.png" width="400" height="400">  

main 페이지  
```
A:  미리 본문의 내용과 버튼을 dom 객체로 저장해뒀다가 시작하기 버튼을 누르면 내용과 버튼이 삭제됩니다.
    또한, 기존에 준비해뒀던 설문조사 내용이 dom 객체로 새로 만들어집니다.
```
<img src="/webpage/image/introd_2.png" width="500" height="400">  

시작하기 버튼 클릭 이후
```
A:  input 태그의 라디오 속성을 이용하여 자신이 원하는 조건을 선택할 수 있게 했습니다.
B:  form 태그의 post method를 이용해 server.js로 선택한 조건을 넘겨줍니다.
    
    server.js에서는 mysql 모듈을 이용해 저장해 뒀던 테이블에서 넘어온 조건에 맞는 식당을 임의로 선택합니다.
    선택된 식당의 리뷰, 메뉴, 코멘트 등을 mysql 테이블에서 select해서 outcome 리스트에 담습니다.
    ejs 모듈을 이용해 outcome 리스트를 introduction.ejs 파일로 보내줍니다.
    
```
<img src="/webpage/image/introd_3.png">  

introduction 페이지  
```
A:  form 태그의 get method를 이용해 클릭할 시 다시 main 페이지로 갑니다.
B:  server.js에서 보낸 outcome 리스트를 받아서 ejs 모듈로 동적으로 만들어집니다.
C:  form 태그의 get method를 이용해 클릭할 시 server.js에 저장해뒀던 기존의 조건을 이용해 다른 식당을 임의로 다시 선택합니다.
    선택된 식당에 맞는 introduction 페이지를 다시 생성합니다.
D:  카카오맵 api를 이용해 해당 식당에 맞는 지도를 출력합니다.
E:  outcome 리스트 중 리뷰의 별점을 css와 ejs 모듈을 사용해 별의 개수가 바뀌게 했습니다.
F:  form 태그의 post method와 mysql의 insert문을 이용해 댓글을 입력해 mysql에 저장시킬 수 있게 했습니다.
    ejs 모듈을 이용해 outcome 리스트에 들어있는 comment들을 출력하게 했습니다.
```

## 🗂파일 설명

📂L_Tech
>server.js `서버를 실행시키기 위한 파일. node server.js 명령어로 실행합니다.`  
l_tech.sql `mysql의 테이블이 들어있는 파일. import database로 mysql에 적용 가능합니다.`  
License `저작권을 표기한 파일. 본 프로젝트는 Apache 2.0 License를 따릅니다.`  
>>📁crawling 폴더 `파이썬을 통한 크롤링 코드와 결과가 들어있는 폴더입니다.`  
Lunch_Tech kakao_map crawling.ipynb `크롤링 코드입니다. 노원구 음식점 인허가 정보 csv 파일을 넣어 돌렸습니다. 셀레니움과 크롬드라이버가 필요합니다.`  
restaurant.csv `크롤링 결과를 mysql 테이블 형태로 변환했습니다. 식당 정보가 들어있습니다.`  
review.csv `각 식당의 리뷰가 들어있습니다.`  
menu.csv `각 식당의 메뉴와 가격이 들어있습니다.`  
comment.csv `각 식당의 댓글이 들어있습니다.`
>
>>📁webpage 폴더 `사이트의 페이지가 들어있는 폴더입니다.`  
main.html `사이트의 첫 페이지입니다.`  
main.js `첫 페이지의 js 파일입니다.`  
main_style.css `첫 페이지의 css 파일입니다.`  
introduction.ejs `검색 결과 페이지입니다.`  
introduction_style.css `검색 결과 페이지의 css 파일입니다.`  
>>>📁image 폴더 `사이트에서 사용하는 각종 이미지가 들어있는 폴더입니다.`  

## 💡참고자료

크롤링 참고
>[김문과의 데이터](https://data101.oopy.io/recommendation-engine-cosine-similarity)  
[그렇게 개발자가 된다](https://zhuyuan7.github.io/blog/making-cafe-web-02/)  
[eric2057.log](https://velog.io/@eric2057/Selenium%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EC%B9%B4%EC%B9%B4%EC%98%A4%EB%A7%B5-%ED%81%AC%EB%A1%A4%EB%A7%81%ED%95%98%EA%B8%B0)

카카오맵 api
>[카카오 지도](https://apis.map.kakao.com/web/guide/)  
[카카오 디벨로퍼](https://developers.kakao.com/)

### 라이센스
본 프로젝트는 Apache 2.0 License를 따릅니다.

## 앞으로 추가할 기능
길찾기 기능  
조건 추가
