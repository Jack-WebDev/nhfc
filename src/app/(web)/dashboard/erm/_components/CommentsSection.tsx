"use client";

import { CommentData, CommentFormValues } from '@/schema/comments';
import React, { useState } from 'react';
import Comment from './Comments';
import { faker } from '@faker-js/faker';


const CommentsSection: React.FC = () => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [formValues, setFormValues] = useState<CommentFormValues>({ author: '', text: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCommentSubmit = () => {
    const newComment: CommentData = {
      id: new Date().toISOString(),
      author: formValues.author,
      text: formValues.text,
      timestamp: new Date(),
      replies: [],
    };

    setComments([...comments, newComment]);
    setFormValues({ author: '', text: '' });
  };

  const handleReplySubmit = (text: string, parentId: string) => {
    const updateComments = (comments: CommentData[]): CommentData[] =>
      comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), {
              id: new Date().toISOString(),
              author: faker.person.fullName(),
              text,
              timestamp: new Date(),
              replies: [],
            }],
          };
        }
        if (comment.replies) {
          return {
            ...comment,
            replies: updateComments(comment.replies),
          };
        }
        return comment;
      });

    setComments(updateComments(comments));
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      <div className="mb-6">
        <input
          type="text"
          name="author"
          value={formValues.author}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border rounded"
          placeholder="Your name"
        />
        <textarea
          name="text"
          value={formValues.text}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Write a comment..."
        />
        <button
          onClick={handleCommentSubmit}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Comment
        </button>
      </div>
      <div>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} onReply={handleReplySubmit} />
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
