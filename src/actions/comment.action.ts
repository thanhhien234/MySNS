"use server";

import prisma from "@/lib/prisma";
import { getUserId } from "./user.action";

export async function createComment(postId: string, content: string) {
  const userId = await getUserId();
  if (!userId) return;

  const comment = await prisma.comment.create({
    data: {
      postId,
      content,
      authorId: userId,
    },
  });

  return { success: true, comment };
}

export async function getComments(postId: string) {
  return prisma.comment.findMany({
    where: { postId },
    include: {
      author: {
        select: {
          username: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

