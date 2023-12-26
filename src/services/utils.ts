import { z } from 'zod';
import { Rule } from 'effector-forms';
import { SyntheticEvent } from 'react';

export function createRule<V, T = unknown>({
  schema,
  name,
}: {
  schema: z.Schema<T>;
  name: string;
}): Rule<V> {
  return {
    name,
    validator: (v: V) => {
      const parsed = schema.safeParse(v);
      if (parsed.success) return { isValid: true, value: v };

      return {
        isValid: false,
        value: v,
        errorText: parsed.error.issues[0]?.message ?? 'error_occurred',
      };
    },
  };
}

export function addDefaultSrc(e: SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.width = 130;
  e.currentTarget.height = 38;
  e.currentTarget.src = './src/assets/pics/404.png';
}
