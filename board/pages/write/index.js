export default function Write() {
  return (
    <div className='p-20'>
      <h4>글 작성</h4>

      <form action='/api/post/create' method='POST'>
        <input name='title' placeholder='글 제목 입력' />
        <input name='description' placeholder='글 내용 입력' />
        <button type='submit'>작성</button>
      </form>
    </div>
  );
}
