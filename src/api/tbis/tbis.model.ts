import { WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

// TODO: add logo field

export const TBI = z.object({
  name: z.string().min(1).optional(),
  address: z.string().min(5).optional(),
  universityAffiliated: z.string().min(1).optional(),
  contactPerson: z.string().min(1).optional(),
  contactNumber: z.string().min(7).optional(),
  email: z.string().min(1).email().optional(),
  startups: z
    .object({
      id: z.string().min(1),
      name: z.string().min(1),
      slug: z.string().min(1),
    })
    .array()
    .optional(),
  socialMedia: z
    .object({
      name: z.string().min(1),
      link: z.string().min(1).url(),
    })
    .array()
    .optional(),
  services: z
    .object({
      name: z.string().min(1),
      description: z.string().min(1),
    })
    .array()
    .optional(),
  slug: z.string().min(1).optional(),
});

export type TBI = z.infer<typeof TBI>;
export type TBIWithId = WithId<TBI>;
export const TBIs = db.collection<TBI>('tbis');
