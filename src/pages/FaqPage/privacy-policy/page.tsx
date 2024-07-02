import { PageHeading } from '../../../shared/ui/page-heading.tsx';
import { privacyPolicyTopics } from '../lib.ts';
import { useNavigate } from 'react-router-dom';

export const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-14 items-center max-w-[804px]">
      <div className="flex flex-col items-center">
        <PageHeading>Privacy Policy</PageHeading>
        <p className="text-xl">
          At LEGOCY, we are committed to protecting your privacy and ensuring
          that your personal information is handled in a safe and responsible
          manner. This Privacy Policy outlines how we collect, use, and protect
          your personal data.
        </p>
      </div>
      <ol className="flex flex-col gap-7 items-center self-start list-decimal list-inside">
        {privacyPolicyTopics.map((topic, i) => (
          <div
            key={'topic-' + i}
            className="flex flex-col items-start gap-7 self-start"
          >
            <li className="font-semibold text-xl">{topic.topic}</li>
            <div>
              {topic.text.split('\n').map((paragraph, j) => {
                return paragraph ? (
                  <p key={'p-' + j}>
                    {paragraph}
                    {i === 6 ? (
                      <u
                        onClick={() => navigate('/faq/contact-us')}
                        className="cursor-pointer underline-offset-4"
                      >
                        {' '}
                        here.
                      </u>
                    ) : (
                      ''
                    )}
                  </p>
                ) : (
                  <div key={'br-' + j} className="m-7" />
                );
              })}
            </div>
          </div>
        ))}
      </ol>
    </div>
  );
};
