import { Input } from '../../../shared/ui/input.tsx';
import { PageHeading } from '../../../shared/ui/page-heading.tsx';
import { Textarea } from '../../../shared/ui/textarea.tsx';

export const ContactUsPage = () => {
  return (
    <div className="flex flex-col gap-14 items-center">
      <div className="flex flex-col items-center text-center">
        <PageHeading>Contact us</PageHeading>
        <p className="text-xl max-w-[720px]">
          Feel free to get in touch with us either by completing the contact
          form or contacting us directly via phone or email. We&apos;re here to
          assist you in any way we can.
        </p>
      </div>
      <div className="flex flex-col items-center gap-3.5">
        <Input labelText="Your name" className="!w-80 sm:!w-[381px] !h-12" />
        <Input
          labelText="Email address"
          className="!w-80 sm:!w-[381px] !h-12 bg-pagesize"
        />
        <Textarea
          labelText="Your message"
          className="!w-80 sm:!w-[381px] min-h-[119px] bg-pagesize"
        />
      </div>
      <div className="!w-80 sm:!w-[381px] flex justify-around font-normal">
        <p>legocy.info@gmail.com</p>
        <p>+7 898 384 9884</p>
      </div>
    </div>
  );
};
