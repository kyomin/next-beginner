/**
 * 가장 먼저 실행되는 컴포넌트로, 모든 페이지는 _app을 통해 실행된다.
 * 다음과 같은 특성들이 있다.
 *
 * 1. 페이지가 변경되어도 레이아웃과 상태 값을 유지한다.
 * 2. "componentDidCatch"를 통해 에러 핸들링이 가능하다.
 * 3. 페이지에 추가적인 데이터를 삽입할 수 있다.
 * 4. Global CSS는 이곳에 추가한다.
 * 5. 헤더와 푸터같이 공통적으로 사용하는 레이아웃은 이곳에 추가한다.
 */
import NavBar from '@/components/NavBar';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}
