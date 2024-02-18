import { forwardRef } from 'react';
import clsx from 'clsx';
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize';

export type TextareaProps = TextareaAutosizeProps & {
  labelText: string;
  className?: string;
};
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { labelText, className, ...rest } = props;

    return (
      <TextareaAutosize
        ref={ref}
        className={clsx(
          'border dark:bg-dark border-solid border-slate rounded-xl !dark:text-charcoal pl-3 pr-10 outline-0 mb-3.5 py-5',
          'focus:outline-none focus:border-primary-default',
          'placeholder:opacity-95',
          'floating-input-base',
          'w-full',
          className
        )}
        placeholder={labelText}
        {...rest}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
