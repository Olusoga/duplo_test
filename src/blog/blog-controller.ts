;import BlogService from './blog-service';
import { FastifyRequest, FastifyReply } from 'fastify';
import { createPostSchema, CreatePostPayload, updatePostSchema, deletePostParamsSchema } from '../utils/blogsValidation'


class BlogController {
  private blogService: BlogService;

  constructor(blogService: BlogService) {
    this.blogService = blogService;
  }

  async getAllPosts(request: FastifyRequest<{ Querystring: { page?: string; pageSize?: string } }>, reply: FastifyReply) {
    const page: number = request.query.page ? parseInt(request.query.page, 10) : 1;
    const pageSize: number = request.query.pageSize ? parseInt(request.query.pageSize, 10) : 10;

    try {
      const posts = await this.blogService.getAllPosts({ page, pageSize });
      reply.send(posts);
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }
  async getPostById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const postId = parseInt(request.params.id, 10);

    const post = await this.blogService.getPostById(postId);

    if (!post) {
      reply.code(404).send({ error: 'Post not found' });
      return;
    }

    reply.send(post);
  }

  async createPost(request: FastifyRequest<{ Body: CreatePostPayload }>, reply: FastifyReply) {
    try {
      // Validate request payload using Joi schema
      const { error, value } = createPostSchema.validate(request.body);

      if (error) {
        reply.code(400).send({ error: error.details[0].message });

        return;
      }

      const { title, content, author, user_id } = value;
      const post = await this.blogService.createPost(title, content, author, user_id);

      reply.code(201).send(post);
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }
  
  async updatePost(request: FastifyRequest<{ Params: { id: string }; Body: { title?: string; content?: string; author?: string } }>, reply: FastifyReply) {
    const postId = parseInt(request.params.id, 10);
    const { title, content, author } = request.body;

    try {
      // Validate request payload using Joi schema
      const { error, value } = updatePostSchema.validate({ title, content, author });

      if (error) {
        reply.code(400).send({ error: error.details[0].message });
        return;
      }

      const updatedPost = await this.blogService.updatePost(postId, value.title, value.content, value.author);

      if (!updatedPost) {
        reply.code(404).send({ error: 'Post not found' });
        return;
      }

      reply.send(updatedPost);
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }



  async deletePost(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      // Validate request parameters using Joi schema
      const { error, value } = deletePostParamsSchema.validate(request.params);

      if (error) {
        reply.code(400).send({ error: error.details[0].message });
        return;
      }

      const postId = parseInt(value.id, 10);
      const deletedPost = await this.blogService.deletePost(postId);

      if (!deletedPost) {
        reply.code(404).send({ error: 'Post not found' });
        return;
      }

      reply.send(deletedPost);
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }
}

export default BlogController;
