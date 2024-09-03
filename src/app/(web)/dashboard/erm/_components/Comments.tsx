"use client";

import { CommentData } from '@/schema/comments';
import React, { useState } from 'react';

interface CommentProps {
  comment: CommentData;
  onReply: (text: string, parentId: string) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, onReply }) => {
  const [replyText, setReplyText] = useState('');
  const [showReply, setShowReply] = useState(false);

  const handleReply = () => {
    onReply(replyText, comment.id);
    setReplyText('');
    setShowReply(false);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4">
      <p className="font-bold">{comment.author}</p>
      <p>{comment.text}</p>
      <small className="text-gray-500">{comment.timestamp.toLocaleString()}</small>
      <div className="mt-4">
        <button 
          className="text-blue-500 hover:underline" 
          onClick={() => setShowReply(!showReply)}
        >
          {showReply ? 'Cancel' : 'Reply'}
        </button>
        {showReply && (
          <div className="mt-2">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Write your reply..."
            />
            <button
              onClick={handleReply}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit Reply
            </button>
          </div>
        )}
      </div>
      {comment.replies && (
        <div className="mt-4 ml-4 border-l pl-4">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
