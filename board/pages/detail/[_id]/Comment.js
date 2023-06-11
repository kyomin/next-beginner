'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Comment(props) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    const response = await axios.get(
      `/api/comment/list?postId=${props.postId}`
    );

    setComments(response.data);
  };

  const createComment = async () => {
    try {
      const response = await axios.post('/api/comment/create', {
        comment,
        postId: props.postId,
      });

      const newComment = response.data;

      // 새 댓글 등록 시 클라이언트 업데이트
      const newComments = [...comments, newComment];
      setComments(newComments);
      setComment('');
    } catch (err) {
      console.error(err);
      alert(err.response.data);
    }
  };

  return (
    <div>
      <hr />
      {comments.length
        ? comments.map((comment, index) => {
            return <p key={index}>{comment.content}</p>;
          })
        : '댓글 없음'}
      <input
        value={comment}
        placeholder='댓글 입력'
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button onClick={createComment}>댓글 전송</button>
    </div>
  );
}
