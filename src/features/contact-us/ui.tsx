import { Input } from '../../shared/ui/input.tsx';
import { Textarea } from '../../shared/ui/textarea.tsx';
import { Button } from '../../shared/ui/button.tsx';
import { useState } from 'react';
import { FormError } from '../../shared/ui/form-error.tsx';

// mock
export const ContactUs = () => {
  const [sent, setSent] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3.5">
      <Input
        labelText="Your name"
        className="!w-80 sm:!w-[381px] !h-12 bg-pagesize mt-1"
      />
      <Input
        labelText="Email address"
        className="!w-80 sm:!w-[381px] !h-12 bg-pagesize mt-1"
      />
      <Textarea
        labelText="Your message"
        className="!w-80 sm:!w-[381px] min-h-[119px] mt-1"
      />
      <div className="flex justify-center">
        {sent && (
          <FormError className="!bg-sent !text-[#3E8267]">Sent</FormError>
        )}
        <Button
          onClick={() => setSent(true)}
          className="!w-52 !h-12 !text-xl mt-12"
        >
          Send
        </Button>
      </div>
    </div>
  );
};
