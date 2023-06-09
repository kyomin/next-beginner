# 개요
Next.js는 프론트엔드부터 서버까지 만들 수 있는 React기반 프레임워크이다.   
이것만 사용해도 풀스택 웹개발이 가능하다.   
   
Next.js 사용 시 서버사이드 렌더링이 쉽기 때문에 React, Vue만 사용해서 만든 사이트들보다 로딩시간이 빠르고, 검색엔진에 친화적인 사이트를 만들 수 있다.   
서버기능과 회원인증 기능도 만들기 쉽다.   

client-side rendering은 브라우저에서 html을 실시간으로 만드는 방법이고,    
server-side rendering은 서버에서 html을 미리 만들어 보내주는 방법이다.   
   
client-side rendering 사용 시 이쁘고 부드러운 사이트는 만들 수 있지만 첫 페이지 로딩속도저하, 검색 노출의 어려움 같은 단점이 있어서 웹사이트의 bounce rate 이런 지표들이 낮아지고 트래픽 잡으려고 광고비도 많이 들고 이로 인해 투자대비 수입 지표가 낮아질 수 있다.   
   
반면 server-side rendering을 사용하는 경우, 서버에서 html을 미리 만들어주기 때문에 위의 단점들이 사라지는 경우가 많다.   
   
현재 프로젝트에서 Next.js는 13 버전을 사용한다.   
이번 버전은 재밌고 유용한 기능이 많은데, 다음과 같다.   
- 폴더기반 자동 라우팅
- 새로 디자인한 서버 API 기능
- 쉬운 DB 연결
- 직관적인 rendering 전략 선택기능
- hydration없는 server-side rendering
- 파워풀한 캐싱
- 이미지와 폰트 최적화   
   
# 사용 DB
데이터베이스 종류는 대표적으로 관계형, 비관계형 데이터베이스로 나뉜다.   
   
관계형 데이터베이스는 데이터를 엑셀처럼 표에 저장한다.   
데이터 입출력 시 SQL이라는 언어를 사용해야 하고, 미리 스키마 정의도 해야하고, 데이터 중복 저장을 피하기 위해 정규화 작업도 하는 등 여러가지 귀찮은 점들을 신경써야 한다.   
주로 안정적인 데이터 저장과 운영이 필요한 곳에서 쓰면 좋다.   
   
비관계형 데이터베이스는 자료를 좀 더 자유로운 형식으로 저장할 수 있다.   
SQL 언어, 스키마 정의, 정규화 등 이런 것들이 대부분 필요가 없다.   
분산처리를 기본적으로 잘해서 주로 SNS 서비스처럼 많은 데이터 입출력이 필요할 때에도 강점을 보인다.   
   
현 프로젝트에서는 그 중에 비관계형(NoSQL) 데이터베이스인 `MongoDB`를 사용한다.   
데이터를 자바스크립트 object 자료형과 같은 모양으로 저장할 수 있어 편리하다.   
   
# MongoDB의 데이터 저장 방식
MongoDB를 사용할 때, 기본이라고 할 수 있는 데이터베이스와 컬렉션에 대해 알아본다.   
`Database`라는 것은 MongoDB에서 사용하는 데이터베이스의 가장 큰 단위이다.   
`Collection`은 Database의 하위에 속하는 개념이다.   
`Field`는 모여서 하나의 컬렉션(Collection)을 구성하게 된다.   
`Document`는 위의 항목으로 구성된 데이터베이스의 실제 데이터이다.   
   
알기 쉽게 다음의 예를 들어본다.   
   
쇼핑몰을 만들기 위해 DB를 구축해야 하는 상황이다.   
쇼핑몰 내에서 관리되어야 할 DB에는 유저 정보, 상품 정보, 결제 정보, 문의 내용 등 여러가지가 있다.   
여기서 쇼핑몰 자체가 `Database`가 되고, 유저 정보, 상품 정보 등의 내용은 `Collection`이 된다.   
그리고 유저 정보 내의 이름, 생년월일, 전화번호 등의 정보는 `Field`가 된다.   
유저정보에 이름, 생년월일, 전화번호 등의 모든 필드를 채운 완성된 하나의 정보가 들어가면 `Document`가 된다.   
   
한가지 더 예를 들어서 학원을 운영하는 프로그램을 개발하는데, 여기에 구축해야 될 DB를 만든다고 하면,   
학원은 `Database`가 되고, 학원 내에 필요한 정보들인 선생님 정보, 학생 정보, 과목 정보 등이 `Collection`이 된다.   
여기서도 선생님 정보를 예로 들면 선생님 이름, 가르치는 과목 등의 정보가 `Field`가 된다.   
이 필드들이 모두 채워진 하나 이상의 데이터를 `Document`라 한다.   
   
MySQL과 같은 관계형 DB와 비교하자면 다음과 같다.   
- MySQL의 Database = MongoDB의 Database
- MySQL의 Table = MongoDB의 Collection
- MySQL의 Column = MongoDB의 Field
- MySQL의 Row = MongoDB의 Document   
   
다음은 MongoDB 관련 명령어이다.   
   
1. Database 생성   
`use shop`   
ㄴ shop이라는 이름으로 DB를 생성한다.   
2. Collection 생성 (대소문자 구분에 주의한다)   
`db.createCollection("users");`   
ㄴ users라는 이름으로 컬렉션을 생성한다.   
위에서 shop이라는 DB 생성 과정을 거쳤으므로 shop DB 내에 users 컬렉션이 생성되는 것이다.   
3. Collection 생성 확인   
`show collections;`   
4. Database 생성 확인   
`show databases;`   
5. users 컬렉션에 유저 도큐먼트를 생성한다.   
`db.users.insert({"name": "홍길동", "age": 20, "gender": "man"});`
ㄴ name 필드, age 필드, gender 필드로 구성된 users 컬렉션에 해당 도큐먼트를 생성하는 명령이다.   
6. users 컬렉션의 생성한 데이타를 확인한다.   
`db.users.find();`   
7. 만들어진 컬렉션을 삭제한다.   
`db.users.drop();`   
ㄴ show collections; 명령으로 users 컬렉션이 삭제된 것을 확인할 수 있다.   
8. 만들어진 데이터베이스를 삭제한다.   
`use shop;`   
`db.dropDatabase();`   
ㄴ db.dropDatabase() 명령만 사용하여 바로 제거해도 되지만, 실수로 다른 DB를 선택해놓고 삭제하는 것을 방지 하기 위해 use 데이타베이스 명령으로 확실히 데이터베이스를 설정해주고 삭제하도록 하는 것이 좋다.   
이제 show databases; 명령으로 shop 데이터베이스가 삭제된 것을 확인할 수 있다.   
   
# Next.js를 이용한 게시판 프로젝트
현재 프로젝트는 Next.js를 이용하여 간단한 게시판을 만들어 본다.   
기본적인 CRUD부터, 인증 기술을 이용한 로그인 기능을 구현하였다.   
애플리케이션의 페이지는 크게 다음과 같다.   
   
### List Page
![list page](https://github.com/kyomin/next-beginner/assets/46395776/3977b514-e468-438e-9116-c16577a24a22)   
   
### Register Page
![register page](https://github.com/kyomin/next-beginner/assets/46395776/6c94b643-8502-46d7-981e-693dfbc30920)   
   
### Login Page
![login page](https://github.com/kyomin/next-beginner/assets/46395776/caef290b-bced-4a56-8f1e-c61af7a5e13e)