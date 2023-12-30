import { PrismaClient } from '@prisma/client/edge'
class BlogService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAllPosts({ page = 1, pageSize = 10 }: { page?: number; pageSize?: number } = {}) {
    const offset = (page - 1) * pageSize;

    return this.prisma.post.findMany({
      skip: offset,
      take: pageSize,
    });
  }


  async getPostById(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
    });
  }

  async createPost(title: string, content: string, author: string, user_id:string) {
    return this.prisma.post.create({
      data: { title, content, author, user_id },
    });
  }

  async updatePost(id: number, title?: string, content?: string, author?: string) {
  // Retrieve the post before the update
  const existingPost = await this.prisma.post.findUnique({
    where: { id },
  });

  if (!existingPost) {
    return null; // Post not found
  }

  // Apply the update
  const updatedPost = await this.prisma.post.updateMany({
    where: { id },
    data: {
      title: title !== undefined ? { set: title } : undefined,
      content: content !== undefined ? { set: content } : undefined,
      author: author !== undefined ? { set: author } : undefined,
    },
  });

  return updatedPost;
}

  async deletePost(id: number) {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}

export default BlogService;
