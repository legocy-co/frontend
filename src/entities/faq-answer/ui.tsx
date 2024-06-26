import LegoAsker from '../../assets/pics/lego-asker.png';
import { addDefaultSrc } from '../../services/utils.ts';

type Props = {
  question: string;
  answer: string;
};

export const FaqAnswer = ({ question, answer }: Props) => {
  return (
    <div className="flex flex-col gap-3 items-start sm:w-[640px] lg:w-[727px]">
      <div className="flex gap-3 items-center text-lg">
        <img
          src={LegoAsker}
          className="w-[34px]"
          onError={addDefaultSrc}
          alt=""
        />
        <p>Q: {question}</p>
      </div>
      <div className="w-full p-5 bg-answer text-black rounded-[10px]">
        A: {answer}
      </div>
    </div>
  );
};
