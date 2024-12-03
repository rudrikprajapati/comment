"use client";

import React, { useState, useEffect } from "react";
import { IComment } from "./Comment";
import { CommentForm } from "./CommentForm";
import { Comment } from "./Comment";

export default function CommentMain() {
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const response = await fetch("/api/comments");
    const data = await response.json();
    setComments(data);
  };

  const handleSubmit = async (
    name: string,
    text: string,
    parentId?: string
  ) => {
    setLoading(true);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          text,
          parentCommentId: parentId,
        }),
      });

      if (response.ok) {
        await fetchComments();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);

    try {
      const response = await fetch("/api/comments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId: id }),
      });

      if (response.ok) {
        await fetchComments();
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6">
        <div className="flex items-center mb-6 space-y-3 flex-col">
          <h2 className="text-2xl font-bold text-white">Community Comments</h2>
          <p>Share your opinion on this minimal comment system</p>
        </div>

        <CommentForm onSubmit={handleSubmit} loading={loading} />

        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {comments
            .filter((comment) => !comment.parentCommentId)
            .map((comment) => (
              <Comment
                key={comment.id}
                comment={{
                  ...comment,
                  replies: comments.filter(
                    (reply) => reply.parentCommentId === comment.id
                  ),
                }}
                onReply={handleSubmit}
                onDelete={handleDelete}
                loading={loading}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
