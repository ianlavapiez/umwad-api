import { WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

// TODO: add supportingDocuments array, logo, and logo field to partners array of objects

export const Startup = z.object({
  name: z.string().min(1).optional(),
  address: z.string().min(5).optional(),
  owner: z.string().min(1).optional(),
  contactNumber: z.string().min(7).optional(),
  email: z.string().min(1).email().optional(),
  website: z.string().min(1).url().optional(),
  numberOfEmployees: z
    .object({
      female: z.number(),
      male: z.number(),
    })
    .optional(),
  socialMedia: z
    .object({
      name: z.string().min(1),
      link: z.string().min(1).url(),
    })
    .array()
    .optional(),
  tbisAffiliated: z
    .object({
      id: z.string().min(1),
      name: z.string().min(1),
      slug: z.string().min(1),
    })
    .array()
    .optional(),
  supportingDescription: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
});

export type Startup = z.infer<typeof Startup>;
export type StartupWithId = WithId<Startup>;
export const Startups = db.collection<Startup>('startups');
