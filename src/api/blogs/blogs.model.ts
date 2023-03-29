import { WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

// TODO: add photo field

export const Blog = z.object({
  title: z.string().min(1),
  description: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  datePosted: z.date().default(new Date()),
});
export type Blog = z.infer<typeof Blog>;
export type BlogWithId = WithId<Blog>;
export const Blogs = db.collection<Blog>('blogs');
