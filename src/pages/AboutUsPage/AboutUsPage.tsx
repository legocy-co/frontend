import { Button } from '../../shared/ui/button';
import LegoHeadIcon from '../../assets/icons/lego-head.svg?react';
import LocationIcon from '../../assets/icons/location.svg?react';
import RocketIcon from '../../assets/icons/rocket.svg?react';
import MarketplaceIcon from '../../assets/icons/catalog.svg?react';
import CollectionIcon from '../../assets/icons/collection.svg?react';
import * as lib from './lib';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/AuthService.ts';
import clsx from 'clsx';
import React, { useRef } from 'react';
import { ContactUs } from '../../features/contact-us';

export const AboutUsPage = () => {
  const navigate = useNavigate();

  const aboutUsRef = useRef<HTMLDivElement | null>(null);
  const contactUsRef = useRef<HTMLDivElement | null>(null);

  const scroll = (ref: React.MutableRefObject<HTMLDivElement | null>) =>
    ref.current!.scrollIntoView();

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
            <Button
              onClick={() => scroll(aboutUsRef)}
              className="!h-12 !w-[244px] !rounded-lg !text-xl"
            >
              Read about us
            </Button>
            <Button
              onClick={() => scroll(contactUsRef)}
              className="!h-12 !w-[244px] !rounded-lg !text-xl !bg-celllink !text-white"
            >
              Contact us
            </Button>
          </div>
        </div>
      </div>
      <div className="relative min-w-96 w-[95%] rounded-xl bg-about dark:bg-dark p-10 pt-20 text-center text-[1.625rem]">
        <section className="absolute -top-32" ref={aboutUsRef} />
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
        <div className="flex items-center justify-center gap-14 flex-wrap">
          {lib.team.map((teammate) => (
            <Teammate
              key={teammate.name}
              name={teammate.name}
              picture={teammate.picture}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-8 items-center justify-center">
        <h1 className="text-bh font-bold">Our mission</h1>
        <div className="mt-14 min-w-96 rounded-xl bg-about flex lg:flex-col gap-3 lg:gap-12 items-center justify-center dark:bg-dark px-10 pl-20 py-10 lg:pt-20 lg:pl-10 text-center">
          <div className="h-[450px] w-max-[948px] flex flex-col lg:flex-row justify-between lg:w-[77%] lg:h-0 border border-solid border-state dark:border-white">
            {lib.spotPics.map((spotPic) => (
              <div className="relative" key={spotPic}>
                <Spot picture={spotPic} />
              </div>
            ))}
          </div>
          <p className="w-52 sm:w-56 text-left lg:text-center lg:w-[875px] xl:w-[1094px] text-lg">
            At LEGOCY, our mission is to connect LEGO enthusiasts worldwide,
            creating a vibrant, inclusive community where passion for LEGO
            transcends borders. We strive to offer an innovative platform that
            enriches the LEGO experience, making it more accessible, enjoyable,
            and rewarding for enthusiasts of all ages. Together, we build more
            than just models; we build friendships, knowledge, and a global
            community united by a shared love for LEGO.
          </p>
        </div>
        <Button
          onClick={() => navigate('/auth/sign-up')}
          className={clsx('!h-12 !w-[278px] !rounded-xl', {
            hidden: authService.IsAuthorized(),
          })}
        >
          Create account
        </Button>
      </div>
      <div className="w-screen py-24 bg-about dark:bg-dark flex flex-col gap-6 justify-between items-center">
        <div className="relative min-w-96 w-[82%] bg-white dark:bg-darkpage text-lg text-center p-10 pt-32 flex items-center justify-center rounded-xl">
          <div className="absolute dark:[&>svg>g>circle]:fill-darkpage justify-center items-center -top-10 left-1/2 transform -translate-x-1/2">
            <RocketIcon />
            <h1 className="absolute top-20 text-nowrap text-bh font-bold">
              Our goals
            </h1>
          </div>
          <p className="max-w-[1010px]">
            At LEGOCY, we are more than just a business; we are a vibrant
            community united by our love for LEGO. Our journey began with a
            simple passion for building and collecting LEGO sets, and it has
            evolved into a thriving platform that celebrates the creativity and
            camaraderie of LEGO enthusiasts worldwide.
          </p>
        </div>
        {lib.goals.map((goal, i) => (
          <Goal
            header={goal.header}
            index={i + 1}
            text={goal.text}
            key={'goal-' + i}
          />
        ))}
      </div>
      <div className="flex flex-col gap-20 items-center justify-center mb-[900px]">
        <h1 className="font-bold text-bh">Our services</h1>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {lib.services.map((serv, i) => (
            <Service
              buttonText={serv.buttonText}
              header={serv.header}
              index={i}
              text={serv.text}
              to={serv.to}
              key={'serv-' + i}
            />
          ))}
        </div>
      </div>
      <div
        ref={contactUsRef}
        className="absolute bottom-24 w-screen flex flex-col justify-center bg-contact-us bg-center bg-cover bg-no-repeat items-center gap-4 py-16"
      >
        <div className="min-w-96 w-[61%] bg-white dark:bg-darkpage rounded-xl flex flex-col justify-center p-20 items-center gap-8">
          <h1 className="text-bh font-bold">Contact us</h1>
          <p className="max-w-[568px] text-center text-lg">
            Whether you have inquiries, suggestions, or a desire to contribute
            to our vibrant LEGO community, we would love to hear from you.
          </p>
          <ContactUs />
        </div>
        <div className="flex flex-wrap text-white justify-center items-center gap-6 text-xl">
          <p>legocy.info@gmail.com</p>
          <p>+7 898 384 9884</p>
        </div>
      </div>
    </div>
  );
};

const Teammate = ({ name, picture }: lib.Teammate) => (
  <div className="flex flex-col gap-4 items-center justify-center">
    <div className="w-80 relative sm:w-[387px] aspect-[1.78] rounded-xl bg-step dark:bg-dark flex justify-center items-center">
      <div className="w-[126px] sm:w-[153px] aspect-square rounded-full bg-legocy" />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-[55%]">
        <img
          src={picture}
          alt=""
          className="w-20 sm:w-24 aspect-[0.53] object-cover overflow-visible"
        />
      </div>
    </div>
    <p className="text-[1.375rem]">{name}</p>
  </div>
);

const Spot = ({ picture }: { picture: string }) => (
  <div className="absolute flex lg:flex-col gap-4 sm:gap-8 -bottom-[8px] sm:-bottom-[16px] -right-[5px] justify-end items-center lg:gap-8 lg:-bottom-2 lg:-right-8">
    <div className="absolute -top-3 sm:-top-5 right-10 w-10 sm:w-16 aspect-square lg:aspect-auto lg:static">
      <img
        src={picture}
        alt=""
        className="w-full lg:h-20 object-cover object-center overflow-visible"
      />
    </div>
    <LocationIcon className="iconfills w-4 h-6 -rotate-90 lg:rotate-0 overflow-visible" />
  </div>
);

const Goal = ({ index, header, text }: lib.Goal & { index: number }) => (
  <div className="min-w-96 w-[82%] rounded-xl text-lg py-8 px-14 bg-white dark:bg-darkpage flex items-center justify-center gap-10">
    <h1 className="text-[3.125rem] font-semibold text-legocy">
      {index < 10 ? '0' + index : index}
    </h1>
    <div className="flex flex-col gap-2 justify-between w-max-[857px]">
      <h2 className="text-[1.375rem] font-semibold">{header}</h2>
      <p>{text}</p>
    </div>
  </div>
);

const Service = ({
  header,
  text,
  buttonText,
  to,
  index,
}: lib.Service & { index: number }) => {
  const navigate = useNavigate();

  const icons: React.ReactNode[] = [
    <MarketplaceIcon className="iconfills" />,
    <CollectionIcon className="iconfills iconstrokes" />,
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <div className="w-80 sm:w-[596px] rounded-xl text-lg px-6 py-8 bg-about dark:bg-dark flex flex-col items-center justify-center gap-8">
        <div className="flex items-center justify-center gap-8 font-semibold text-[1.375rem]">
          {icons[index]}
          <h1>{header}</h1>
        </div>
        <p>{text}</p>
      </div>
      <Button
        className="!w-80 sm:!w-[340px] !h-12 !text-xl !rounded-xl"
        onClick={() => navigate(to)}
      >
        {buttonText}
      </Button>
    </div>
  );
};
