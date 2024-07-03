import { Button } from '../../shared/ui/button.tsx';

export const AboutUsPage = () => {
  return (
    <div className="flex flex-col items-center justify-start w-screen h-full">
      <div className="flex items-center bg-about-us bg-center bg-no-repeat justify-center w-screen h-min-[570px] p-20 bg-cover mt">
        <div className="min-w-96 w-[82%] p-20 bg-white dark:bg-dark rounded-xl flex flex-col justify-between items-center gap-12">
          <h1 className="!text-wrap text-center w-full !m-0 text-bh font-bold">
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
    </div>
  );
};
