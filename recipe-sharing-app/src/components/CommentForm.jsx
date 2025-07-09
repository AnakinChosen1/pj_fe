import { useState } from "react";

export default function CommentForm({ onSubmit }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        className="w-full p-2 border rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Leave a comment..."
      />
      <button
        type="submit"
        className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
      >
        Send
      </button>
    </form>
  );
}
