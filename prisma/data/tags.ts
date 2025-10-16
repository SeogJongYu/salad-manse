import { TagKey } from '@prisma/client';

export const tags = Object.values(TagKey).map(key => ({
  key,
}));
