import { WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

// TODO: add logo field

export const Partner = z.object({
  userId: z.string().min(1),
  name: z.string().min(1).optional(),
  link: z.string().min(1).optional(),
});
export type Partner = z.infer<typeof Partner>;
export type PartnerWithId = WithId<Partner>;
export const Partners = db.collection<Partner>('partners');
