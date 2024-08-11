"use client";
import Image from "next/image";
import Footer from "../../Footer";

export default function Step1() {
  return (
    <div className="px-8 md:px-[5rem] h-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 h-full">
        <div className="relative top-[50%] -translate-y-[50%] space-y-4 h-max ">
          <h2 className="font-bold text-sm xl:text-lg">Step 1</h2>
          <h1 className="text-2xl md:text-3xl md:text-4xl xl:text-5xl font-medium">
            Tell us about your place
          </h1>
          <p className="xl:text-xl text-black/70 font-light">
            In this step, we&apos;ll ask you which type of property you have and
            if guests will book the entire place or just a room. Then let us
            know the location and how many guests can stay.
          </p>
        </div>
        <div className="h-[20rem] md:h-[70vh] w-full overflow-clip relative my-auto">
          <Image
            fill={true}
            alt="building"
            src="/images/step1.png"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <Footer
        showNext={true}
        showPrev={false}
        nextLink="/about-your-place"
        prevLink=""
      />
    </div>
  );
}
