import { z } from 'zod';
import { Rule } from 'effector-forms';

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
