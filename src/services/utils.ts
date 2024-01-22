import { z } from 'zod';
import { Rule } from 'effector-forms';
import { SyntheticEvent } from 'react';
import Image404 from '../assets/pics/404.png';

export function createRule<V, T = unknown>({
  schema,
  name,
}: {
  schema: z.Schema<T>;
  name: string;
}): Rule<V> {
  return {
    name,
    validator: (value: V) => {
      const parsedSchema = schema.safeParse(value);
      if (parsedSchema.success) return { isValid: true, value: value };

      return {
        isValid: false,
        value: value,
        errorText: parsedSchema.error.issues[0]?.message ?? 'error_occurred',
      };
    },
  };
}

export function addDefaultSrc(e: SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.width = 65;
  e.currentTarget.height = 19;
  e.currentTarget.src = Image404;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
