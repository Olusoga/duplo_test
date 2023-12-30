import Joi from 'joi';

export const createPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string().required(),
  user_id: Joi.string().required(),
});

export interface CreatePostPayload {
  title: string;
  content: string;
  author: string;
  user_id: string;
}

export const updatePostSchema = Joi.object({
    title: Joi.string(),
    content: Joi.string(),
    author: Joi.string(),
  });

  export const deletePostParamsSchema = Joi.object({
    id: Joi.string().required().pattern(/^[0-9]+$/),
  })