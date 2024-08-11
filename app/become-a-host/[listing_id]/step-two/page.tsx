"use client";
import Image from "next/image";
import Footer from "../../Footer";

export default function Step2() {
  return (
    <div className="px-8 md:px-[5rem] h-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 h-full">
        <div className="relative top-[50%] -translate-y-[50%] space-y-4 h-max ">
          <h2 className="font-bold text-sm xl:text-lg">Step 2</h2>
          <h1 className="text-2xl md:text-3xl md:text-4xl xl:text-5xl font-medium">
            Make your place stand out
          </h1>
          <p className="xl:text-xl text-black/70 font-light">
            In this step, you’ll add some of the amenities your place offers,
            plus 5 or more photos. Then, you’ll create a title and description.
          </p>
        </div>
        <div className="h-[20rem] md:h-[70vh] w-full overflow-clip relative my-auto">
          <Image
            fill={true}
            alt="building"
            src="/images/step2.png"
            className="h-full w-full object-cover absolute"
          />
        </div>
      </div>
      <div className="h-[6rem]">
        <Footer
          showNext={true}
          showPrev={true}
          nextLink="/amenities"
          prevLink="/about-this-unit"
        />
      </div>
    </div>
  );
}
