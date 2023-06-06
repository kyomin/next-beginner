'use client';

import Link from 'next/link';

export default function ListItem({ posts }) {
  const handleDelete = (id, e) => {
    // method를 DELETE로 보낼 시 body가 전송이 안 되는 경우가 발생한다.
    fetch('/api/post/delete', {
      method: 'POST',
      body: id,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // 삭제 실패
        if (!res.deletedCount) {
          const failMessage = typeof res === 'string' ? res : 'Server Error!';
          alert(failMessage);

          return;
        }

        // 서버 요청 성공 시 실행할 코드
        e.target.parentElement.style.opacity = 0;

        setTimeout(() => {
          e.target.parentElement.style.display = 'none';
        }, 1000);
      })
      .catch((error) => {
        // 인터넷 문제로 실패 시 실행할 코드
        console.error(error);
      });
  };

  return (
    <div>
      {posts !== undefined &&
        posts.map((post) => {
          return (
            <div className='list-item' key={post._id}>
              <Link href={`/detail/${post._id}`} prefetch={false}>
                <h4>{post.title}</h4>
              </Link>
              <p>{post.description}</p>
              <Link href={`/edit/${post._id}`}>✏️</Link>
              <span
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleDelete(post._id, e)}
              >
                🗑
              </span>
            </div>
          );
        })}
    </div>
  );
}
