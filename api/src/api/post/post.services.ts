import { prismaClient } from "utils/db";

const createPost = async (authorId: string, title: string, content: string, url?: string) => {
  if (url) {
    const newPost = await prismaClient.post.create({
      data: {
        title,
        content,
        authorId,
        postPhotos: {
          create: { url: url },
        },
      },
    });
    return newPost;
  } else {
    const newPost = await prismaClient.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    return newPost;
  }
};
const updatePost = async (postId: string, title: string, content: string, url?: string) => {
  if (url) {
    const post = await prismaClient.post.update({
      where: {
        id: postId,
      },
      data: {
        title: title,
        content: content,
        postPhotos: {
          create: { url: url },
        },
      },
    });
    return post;
  } else {
    const post = await prismaClient.post.update({
      where: {
        id: postId,
      },
      data: {
        title: title,
        content: content,
      },
    });
    return post;
  }
};
const deletePost = async (postId: string) => {
  const del = await prismaClient.post.delete({
    where: {
      id: postId,
    },
  });
  return del;
};
const getPost = async (postId: string) => {
  const post = await prismaClient.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      postPhotos: true,
      comments: true,
    },
  });
  return post;
};
const getAllPosts = async () => {
  const posts = await prismaClient.post.findMany({
    include: {
      postPhotos: true,
      comments: true,
    },
  });
  return posts;
};
const createPostPhoto = async (url: string, postId: string) => {
  const newPostPhoto = await prismaClient.postPhoto.create({
    data: {
      url,
      postId,
    },
  });
  return newPostPhoto;
};
const getAllPhotos = async () => {
  const photos = await prismaClient.postPhoto.findMany();
  return photos;
};

export { createPost, getPost, createPostPhoto, getAllPosts, getAllPhotos, updatePost, deletePost };
