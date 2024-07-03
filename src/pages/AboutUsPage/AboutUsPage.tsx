import { Button } from '../../shared/ui/button';
import LegoHeadIcon from '../../assets/icons/lego-head.svg?react';
import * as lib from './lib';

// TODO: layout our mission

export const AboutUsPage = () => {
  return (
    <div className="flex flex-col items-center justify-start gap-28 w-full">
      <div className="flex items-center bg-about-us bg-center bg-no-repeat justify-center w-screen h-min-[570px] p-20 bg-cover mt">
        <div className="min-w-96 w-[82%] p-20 bg-white dark:bg-dark rounded-xl flex flex-col justify-between items-center gap-12">
          <h1 className="!text-wrap text-center w-full text-bh font-bold">
            The Ultimate Web Hub for LEGO Enthusiasts
          </h1>
          <p className="text-lg text-center max-w-[922px]">
            At LEGOCY, we are more than just a business; we are a vibrant
            community united by our love for LEGO. Our journey began with a
            simple passion for building and collecting LEGO sets, and it has
            evolved into a thriving platform that celebrates the creativity and
            camaraderie of LEGO enthusiasts worldwide.
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <Button className="!h-12 !w-[244px] !rounded-lg !text-xl">
              Read about us
            </Button>
            <Button className="!h-12 !w-[244px] !rounded-lg !text-xl !bg-celllink !text-white">
              Contact us
            </Button>
          </div>
        </div>
      </div>
      <div className="relative min-w-96 w-[95%] rounded-xl bg-pagesize dark:bg-dark px-10 pb-10 pt-20 text-center text-[1.625rem]">
        <div className="absolute flex justify-center items-center top-[-28px] left-1/2 transform -translate-x-1/2">
          <LegoHeadIcon />
          <h1 className="absolute text-nowrap text-bh font-bold">About Us</h1>
        </div>
        “At LEGOCY, we are not just another company; we are a passionate
        community of LEGO collectors. Our love for LEGO has driven us to create
        a unique web-service dedicated to making your LEGO collecting experience
        richer and more exciting. We understand the joy of building, the thrill
        of discovering new sets, and the excitement of sharing your collection
        with like-minded enthusiasts.“
      </div>
      <div className="flex flex-col gap-12 items-center justify-center text-center">
        <h1 className="text-bh font-bold">Meet the Team</h1>
        <p className="text-lg max-w-[1112px]">
          At LEGOCY, we are not just another company; we are a passionate
          community of LEGO collectors.
          <br />
          <br />
          Behind LEGOCY is a team of passionate individuals who are committed to
          serving the LEGO community. From avid collectors to tech enthusiasts,
          our diverse team brings a wealth of knowledge and expertise to
          everything we do. Meet the faces behind LEGOCY and discover the
          driving force behind our mission to unite LEGO enthusiasts globally.
        </p>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {lib.team.map((teammate) => (
            <Teammate name={teammate.name} picture={teammate.picture} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Teammate = ({ name, picture }: lib.Teammate) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div className="w-80 relative sm:w-[387px] aspect-[1.78] rounded-xl bg-pagesize dark:bg-dark flex justify-center items-center">
        <div className="w-[126px] sm:w-[153px] aspect-square rounded-full bg-legocy" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <img
            src={picture}
            alt=""
            className="w-36 sm:w-24 aspect-[0.53] object-cover overflow-visible"
          />
        </div>
      </div>
      <p className="text-[1.375rem]">{name}</p>
    </div>
  );
};
