import React, { forwardRef } from 'react';
import clsx from 'clsx';
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize';

export type TextareaProps = TextareaAutosizeProps & {
  labelText: string;
  className?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  autoFocus?: boolean;
  children?: React.ReactNode;
  containerClassName?: string;
};
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { labelText, className, isInvalid } = props;

    return (
      <TextareaAutosize
        ref={ref}
        className={clsx(
          'border border-solid border-slate rounded-xl text-charcoal pl-3 pr-10 outline-0 mb-3.5 py-5',
          { 'border-red-500': isInvalid },
          'focus:outline-none focus:border-primary-default',
          'placeholder:opacity-95',
          'floating-input-base',
          'w-full',
          className
        )}
        placeholder={labelText}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
