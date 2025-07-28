"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createComment, getComments } from "@/actions/comment.action";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

interface Author {
  username?: string | null;
  imageUrl?: string | null;
}

interface Comment {
  id: string;
  content: string;
  author: Author;
}

export default function CommentSection({ postId }: { postId: string }) {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getComments(postId).then(setComments);
  }, [postId]);

  async function handleSubmit() {
    if (!content.trim()) return;
    await createComment(postId, content);
    setContent("");
    const newComments = await getComments(postId);
    setComments(newComments);
  }

  return (
    <div className="mt-4">
      <div className="mt-4 space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="flex items-center gap-3">
            {c.author.imageUrl ? (
              <Image
                src={c.author.imageUrl}
                alt={c.author.username || ""}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            ) : null}
            <div className="text-sm">
              <strong>{c.author.username || " "}:</strong> {c.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center mt-6 border border-gray rounded-md p-2 h-[60px]">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력하세요..."
          className="min-h-[30px] resize-none border-none focus-visible:ring-0 p-1 text-base"
        />
        <Button
          onClick={handleSubmit}
          className="p-2 bg-transparent hover:bg-gray-100 text-black"
        >
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
}
