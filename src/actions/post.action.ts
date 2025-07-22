"use server";

import prisma from "@/lib/prisma";
import { getUserId } from "./user.action";

export async function createPost(content: string, image: string) {
  try {
    const userId = await getUserId();

    if (!userId) return;

    const post = await prisma.post.create({
      data: {
        content,
        image,
        authorId: userId,
      },
    });
    return { success: true, post };
  } catch (error) {
    console.error("createPost failed:", error);
    return { success: false, error: "createPost failed:" };
  }
}