import { PageHeading } from '../../../shared/ui/page-heading.tsx';
import { collectionsAnswers } from '../lib.ts';
import { FaqAnswer } from '../../../entities/faq-answer';

export const FaqCollectionsPage = () => {
  return (
    <div className="flex flex-col gap-14 items-center">
      <div className="flex flex-col items-center text-center">
        <PageHeading>Collections</PageHeading>
        <p className="text-xl max-w-[839px]">
          All ratings and opinions presented on our platform are subjective and
          reflect the personal views of users. They do not have legal value and
          cannot be used as an official assessment or conclusion.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        {collectionsAnswers.map((ans) => (
          <FaqAnswer question={ans.question} answer={ans.answer} />
        ))}
      </div>
    </div>
  );
};
