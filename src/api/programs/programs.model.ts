import { WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

// TODO: add photo field

export const Program = z.object({
  title: z.string().min(1),
  description: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  datePosted: z.date().optional().default(new Date()),
  link: z.string().url().min(1).optional(),
});
export type Program = z.infer<typeof Program>;
export type ProgramWithId = WithId<Program>;
export const Programs = db.collection<Program>('programs');
