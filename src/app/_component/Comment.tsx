import React, { useState } from "react";
import { CommentForm } from "./CommentForm";

export interface IComment {
  _id: string;
  id: string;
  name: string;
  text: string;
  createdAt: Date;
  parentCommentId?: string;
  replies?: IComment[];
}

interface CommentProps {
  comment: IComment;
  onReply: (name: string, text: string, parentId: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  loading: boolean;
}

export const Comment: React.FC<CommentProps> = ({
  comment,
  onReply,
  onDelete,
  loading,
}) => {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleReply = async (name: string, text: string, parentId: string) => {
    await onReply(name, text, parentId);
    setReplyingTo(null);
  };

  return (
    <div className="mb-4">
      <div className="relative bg-gray-700 p-4 rounded-lg border border-gray-600">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-blue-300">{comment.name}</span>
          <small className="text-gray-400">
            {new Date(comment.createdAt).toLocaleString()}
          </small>
        </div>
        <p className="text-white">{comment.text}</p>
        <div className="absolute right-4 bottom-4 flex items-center space-x-2">
          {!comment.parentCommentId && (
            <svg
              onClick={() => setReplyingTo(comment.id)}
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              className="hover:cursor-pointer"
            >
              <path
                fill="#4CAF50"
                d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"
              />
            </svg>
          )}
          <svg
            onClick={() => onDelete(comment._id)}
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            className="hover:cursor-pointer"
          >
            <path
              fill="#f20000"
              d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
            ></path>
          </svg>
        </div>
      </div>

      {replyingTo === comment.id && (
        <CommentForm
          onSubmit={(name, text) => handleReply(name, text, comment.id)}
          loading={loading}
          parentId={comment.id}
        />
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-4 mt-2 space-y-2">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onDelete={onDelete}
              loading={loading}
            />
          ))}
        </div>
      )}
    </div>
  );
};
