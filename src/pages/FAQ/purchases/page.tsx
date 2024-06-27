import { PageHeading } from '../../../shared/ui/page-heading.tsx';
import { purchaseAnswers } from '../lib.ts';
import { FaqAnswer } from '../../../entities/faq-answer';

// TODO: layout contact us
export const FaqPurchasesPage = () => {
  return (
    <div className="flex flex-col gap-14 items-center">
      <div className="flex flex-col items-center text-center">
        <PageHeading>Purchases</PageHeading>
        <p className="text-xl max-w-[874px]">
          We provide a platform for buyers and sellers to connect. Please note
          that we do not take responsibility for the condition of the set, the
          quality of its parts, or any other aspects of the purchase. All
          agreements and inspections of the set&apos;s condition are at the
          discretion of the buyer and seller.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        {purchaseAnswers.map((ans, i) => (
          <FaqAnswer
            question={ans.question}
            answer={ans.answer}
            key={'ans-' + i}
          />
        ))}
      </div>
    </div>
  );
};
