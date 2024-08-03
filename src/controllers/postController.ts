import { PrismaClient } from "@prisma/client";
import { Context } from "hono";

const prisma = new PrismaClient();

// Get All Post
export const getPosts = async (c: Context) => {
  try {
    const posts = await prisma.post.findMany();

    return c.json({
      success: true,
      message: "List Data Posts!",
      data: posts,
    });
  } catch (error) {
    console.error(`Error getting posts: ${error}`);
  }
};

// Get Post By Id
export const getPostById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    return c.json({
      success: true,
      message: "Get Post Success!",
      data: post,
    });
  } catch (error) {
    console.error(`Error getting post: ${error}`);
  }
};

// Create Post
export const createPost = async (c: Context) => {
  const { title, content } = await c.req.json();
  try {
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
      },
    });

    return c.json({
      success: true,
      message: "Create Post Success!",
      data: post,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
  }
};

// export const;
