import { WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

// TODO: communities' photo field,

export const Community = z.object({
  fullName: z.string().min(1).optional(),
  position: z.string().min(1).optional(),
  testimonial: z.string().min(1).optional(),
});

export type Community = z.infer<typeof Community>;
export type CommunityWithId = WithId<Community>;
export const Communities = db.collection<Community>('communities');
