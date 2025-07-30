"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createComment, getComments } from "@/actions/comment.action";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

interface Author {
  username?: string | null;
  image?: string | null;
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
      <div className="mt-4 space-y-6">
        {comments.map((c) => (
          <div key={c.id} className="flex items-center gap-3">
            {c.author.image ? (
              <Image
                src={c.author.image}
                alt={c.author.username || ""}
                width={30}
                height={30}
                className="size-8 sm:w-10 sm:h-10 rounded-full"
              />
            ) : null}
            <div>
              <strong className="text-xs">{c.author.username || " "}</strong>
              <p className="text-sm text-foreground break-words">{c.content}</p>
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
