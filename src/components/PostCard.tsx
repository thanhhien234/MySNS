"use client";

import { getPosts, deletePost } from "@/actions/post.action";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import CommentSection from "./CommentSection";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = Posts[number];

function PostCard({ post, dbUserId }: { post: Post; dbUserId: string | null }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    const result = await deletePost(post.id);
    if (result?.success){
      console.log("delete successfully")
    }
    else{
      console.log("delete failed")
    }
    setIsDeleting(false)
  }
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          <div className="flex space-x-3 sm:space-x-4">
            {/* 프로필 */}
            <Link href={`/profile/${post.author.username}`}>
              <Avatar className="size-8 sm:w-10 sm:h-10">
                <AvatarImage src={post.author.image ?? "/avatar.png"} />
              </Avatar>
            </Link>

            {/* 글 헤더 & 내용 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 truncate">
                  <Link
                    href={`/profile/${post.author.username}`}
                    className="font-semibold truncate"
                  >
                    {post.author.name}
                  </Link>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Link href={`/profile/${post.author.username}`}>
                      @{post.author.username}
                    </Link>
                    <span>•</span>
                    <span>
                      {formatDistanceToNow(new Date(post.createdAt))} ago
                    </span>
                  </div>
                </div>
                {/* 현재 유저가 작성자일 경우 삭제 아이콘 표시 */}
                {dbUserId === post.author.id && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={handleDelete}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
              </div>
              <p className="mt-2 text-sm text-foreground break-words">
                {post.content}
              </p>
            </div>
          </div>
          {/* 이미지 */}
          {post.image && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt="Post content"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
        {/* 댓글 */}
        <CommentSection postId={post.id} />
      </CardContent>
    </Card>
  );
}

export default PostCard;
