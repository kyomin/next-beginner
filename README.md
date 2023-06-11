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