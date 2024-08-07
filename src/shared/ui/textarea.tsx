import { forwardRef } from 'react';
import clsx from 'clsx';
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize';

export type TextareaProps = TextareaAutosizeProps & {
  placeholder?: string;
  labelText?: string;
  className?: string;
  isInvalid?: boolean;
};
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const {
      placeholder,
      labelText,
      className,
      isInvalid = false,
      ...rest
    } = props;

    return (
      <div className="flex flex-col gap-1">
        <label>{labelText}</label>
        <TextareaAutosize
          ref={ref}
          className={clsx(
            'bg-pagesize dark:bg-dark rounded-lg !dark:text-confirmmodal outline-0 pl-5 pt-5 pr-16 pb-16',
            'focus:outline-none',
            'placeholder:opacity-95',
            'floating-input-base',
            'w-full',
            {
              '!bg-invalid dark:!bg-invalid !text-confirmmodal dark:!text-confirmmodal':
                isInvalid,
            },
            className
          )}
          placeholder={placeholder}
          {...rest}
        />
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
