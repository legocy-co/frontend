import { z } from 'zod';
import { Rule } from 'effector-forms';
import React, { SyntheticEvent } from 'react';
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

export const stringifyParams = (
  params: Record<string, string | number | boolean | null | undefined>,
  withQuerySign = true,
  join?: string
) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, val]) => {
    val !== null &&
      val !== '' &&
      val !== undefined &&
      query.append(key, val.toString());
  });

  let stringified = query.toString();

  if (join !== undefined && join.length > 0)
    stringified = [stringified, join].filter(Boolean).join('&');

  if (withQuerySign) return stringified ? `?${stringified}` : '';
  return stringified;
};

export function handleUploadFile(
  e: React.ChangeEvent<HTMLInputElement>,
  value: File[],
  onChange: (v: File[]) => File[]
) {
  if (e.target.files) {
    Array.from(e.target.files).map((file) =>
      value.push(
        new File(
          [file],
          JSON.stringify({
            time: new Date().getTime(),
          }),
          {
            type: file.type,
          }
        )
      )
    );

    const transfer = new DataTransfer();
    value.map((file) => {
      transfer.items.add(file);
    });
    e.target.files = transfer.files;

    const files = [] as File[];
    files.push(...value);

    onChange(files);
  }
}

export function partialToFull<T>(x: Partial<T>): T {
  return x as T;
}

export function setTwoDecimals(value: number): number {
  return Math.floor(value * 100) / 100;
}

export function toUnixTime(date: string): number {
  // ensure 3 parts
  const parts = date.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid date format');
  }

  // extract year part
  const year = parts[2];

  // construct unix format
  return Math.floor(
    new Date(
      `${year.length === 2 ? `20${year}` : year}.${parts[1]}.${parts[0]}`
    ).getTime() / 1000
  );
}
