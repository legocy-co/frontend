import { PageHeading } from '../../shared/ui/page-heading.tsx';
import { useNavigate } from 'react-router-dom';

export const FaqPage = () => {
  return (
    <div className="flex flex-col gap-10 items-center">
      <PageHeading>FAQ</PageHeading>
      <div className="grid gap-7 grid-cols-1 lg:grid-cols-2">
        {['purchases', 'contact-us', 'privacy-policy', 'collections'].map(
          (topic) => (
            <SelectTopic to={topic} />
          )
        )}
      </div>
    </div>
  );
};

interface Props {
  to: string;
}

const SelectTopic = ({ to }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(to)}
      className="flex capitalize items-center justify-center h-32 w-80 sm:w-96 rounded-[10px] bg-faqoption text-[1.625rem] text-white hover:opacity-95 active:opacity-90 cursor-pointer"
    >
      {to.replace('-', ' ')}
    </div>
  );
};
