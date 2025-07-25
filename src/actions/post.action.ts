"use server";

import prisma from "@/lib/prisma";
import { getUserId } from "./user.action";

export async function createPost(content: string, image: string) {
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
}

export async function getPosts() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
          username: true,
        },
      },
      comments: {
        include: {
          author: {
            select: {
              id: true,
              username: true,
              image: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      likes: {
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });

  return posts;
}
