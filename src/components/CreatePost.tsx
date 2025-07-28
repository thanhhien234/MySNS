"use client";

import { useState, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { createPost } from "@/actions/post.action";
import { ImageIcon, Loader2Icon, SendIcon, XIcon } from "lucide-react";
import Image from "next/image";

export default function CreatePost() {
  const { user } = useUser();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setIsPosting(true);
    const result = await createPost(content, imageUrl);
    if (result?.success) {
      setContent(""); // reset the form
      setImageUrl("");
      setUploadingImage(false);
      console.log("Post successfully:", result);
    }
    setIsPosting(false);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setUploadingImage(true);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("이미지 업로드 실패");
    }

    const data = await res.json();
    setImageUrl(data.url);
    setUploadingImage(false);
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.imageUrl || "/avatar.png"} />
            </Avatar>
            <Textarea
              placeholder="어쩌구 어쩌구"
              className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isPosting}
            />
          </div>

          {imageUrl && (
            <div className="relative w-full max-w-xs">
              <Image
                src={imageUrl}
                alt="preview"
                className="rounded-md object-cover"
                width={300}
                height={200}
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                onClick={() => setImageUrl("")}
                disabled={isPosting}
              >
                <XIcon className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
                onClick={handleImageClick}
                disabled={isPosting || uploadingImage}
              >
                {uploadingImage ? (
                  <>
                    <Loader2Icon className="size-4 mr-2 animate-spin" />
                    Image Posting...
                  </>
                ) : <ImageIcon className="size-4 mr-2" />}
              </Button>
            </div>
            <Button
              className="flex items-center"
              onClick={handleSubmit}
              disabled={(!content.trim() && !imageUrl) || isPosting}
            >
              {isPosting ? (
                <>
                  <Loader2Icon className="size-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <SendIcon className="size-4 mr-2" />
                  Post
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
