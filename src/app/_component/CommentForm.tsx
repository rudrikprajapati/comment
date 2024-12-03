import React, { useState } from "react";

interface CommentFormProps {
  onSubmit: (name: string, text: string, parentId?: string) => Promise<void>;
  loading: boolean;
  parentId?: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  loading,
  parentId,
}) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(name, text, parentId);
    setName("");
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${
        parentId ? "mt-2 ml-4 bg-gray-800 p-3 rounded-lg" : "mb-8 space-y-4"
      }`}
    >
      <input
        type="text"
        placeholder={parentId ? "Your name" : "Your name"}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-2 mb-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        placeholder={parentId ? "Write a reply..." : "Share your thoughts..."}
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        className="w-full p-2 mb-2 bg-gray-700 text-white rounded-md border border-gray-600 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <div className="flex space-x-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading
            ? parentId
              ? "Sending..."
              : "Posting..."
            : parentId
            ? "Reply"
            : "Post Comment"}
        </button>
        {parentId && (
          <button
            type="button"
            onClick={() => {
              /* Handle cancel logic */
            }}
            className="w-full p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
