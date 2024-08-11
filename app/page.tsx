"use client";
import {
  ArrowRight,
  Headset,
  Mail,
  MessageCircle,
  PhoneCall,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Nav from "./nav/Nav";
import Link from "next/link";

function Home() {
  const router = useRouter();
  // useEffect(() => {
  //   router.push("/buy/listing");
  // }, []);

  const nav_items = [
    {
      title: "Listings",
      route: "/buy/listing",
      active: false,
    },
    // {
    //   title: "Solar kit",
    //   route: "/buy/listing",
    //   active: false,
    // },
  ];

  return (
    <main className="relative space-y-[129px] max-w-screen overflow-hidden">
      <section>
        <Nav nav_items={nav_items} />
        <Image
          src="/images/banner.png"
          width="1728"
          height="1163"
          className="h-screen w-full object-cover absolute"
          alt="cozy living room"
        />
        <div className="h-screen w-screen relative top-0 right-0 z-10 text-white ">
          <div className="relative top-10 md:top-40">
            <div className="py-1 px-4 bg-white/20 backdrop-blur rounded-sm border border-white/30 w-max mx-auto relative top-4 z-10 -rotate-6">
              <h2 className="font-kenyan text-md md:text-xl">
                WE HAVE AN OFFER FOR YOU
              </h2>
            </div>
            <div className="py-8 px-8 md:py-6 md:px-32 bg-white/5 backdrop-blur-sm md:mx-auto border border-white/30 w-full md:w-max md:rounded-md">
              <h1 className="font-bbneue text-7xl md:text-8xl">
                Let us help you secure <br className="hidden md:block" />
                your <span className="text-brand_accent">dream apartment</span>
              </h1>
            </div>
          </div>

          <div className="absolute bottom-10 md:bottom-40 w-full h-max px-10 md:px-[100px] flex flex-col md:flex-row justify-between items-center">
            <div className="relative">
              <div className="md:w-[35%] space-y-3">
                <div className="border-2 w-[20%] border-brand_secondary"></div>
                <p className=" text-sm">
                  Our algorithms help you find your dream homes by understanding
                  your needs and preferences and then searching for suitable
                  options
                </p>
              </div>
            </div>

            <Link href="/buy/listing">
              <button className="py-4 px-6 mt-16 md:mt-0 flex space-x-4 bg-white animate-bounce rounded-md text-black w-max cursor-pointer">
                <p className=" w-full text-sm">Search our properties</p>
                <ArrowRight className="text-brand_accent" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col md:flex-row justify-between gap-x-14 items-center">
        <div className="px-10 md:pl-[100px] mb-16 md:mb-0 space-y-4 md:w-[50%]">
          <h2 className="text-7xl font-bbneue">
            Zero hassle, <br />
            <span className="text-brand_secondary">No middle man needed.</span>
          </h2>
          <p className="">
            Finding your perfect home has never been easier. With Verdroof, you
            can browse a wide range of eco-friendly apartments without the need
            for agents or middlemen. This means no hidden fees, no extra costs,
            and a completely transparent rental process. Discover the simplicity
            and efficiency of renting with Verdroof, and enjoy a seamless
            experience from start to finish.
          </p>
        </div>

        <div className="h-[25rem] relative aspect-video overflow-clip">
          <Image
            src="/images/section_one.png"
            width="854"
            height="570"
            className="object-cover absolute h-full w-full"
            alt="girl surfing the internet"
          />
        </div>
      </section>

      <section className="flex flex-col md:flex-row-reverse justify-between items-center gap-x-14">
        <div className="px-10 mb-16 md:mb-0 md:pr-[100px] space-y-4 md:w-[50%]">
          <h2 className="text-7xl font-bbneue">
            Help save the planet with
            <span className="text-brand_accent"> green living.</span>
          </h2>
          <p className="">
            At Verdroof, we believe that everyone can make a difference. By
            choosing eco-friendly apartments, you&apos;re not only creating a
            healthier living environment for yourself but also contributing to
            the wellbeing of our planet. Join us in our mission to promote
            sustainable living and make a positive impact on the environment,
            one apartment at a time.
          </p>
        </div>

        <div className="h-[25rem] left-0 relative aspect-video overflow-clip">
          <Image
            src="/images/section_two.png"
            width="854"
            height="570"
            className="object-cover absolute h-full w-full"
            alt="girl surfing the internet"
          />
        </div>
      </section>

      <section className="px-10 md:px-[100px] bg-brand_primary text-white py-24">
        <div className="md:w-[70%] mx-auto">
          <h3 className="text-7xl font-bbneue text-center">
            Finding your dream apartment{" "}
            <span className="text-brand_secondary">shouldn&apos;t be hard</span>
            , <span className="text-brand_accent">it should be fun</span>
          </h3>
          <p className=" text-center md:w-[80%] mx-auto">
            With Verdroof, enjoy a seamless and enjoyable search for your
            perfect eco-friendly home. No agents, no hidden fees – just a
            smooth, transparent process tailored to your needs.
          </p>
          <Link href="/buy/listing">
            <button className="py-4 px-6 flex space-x-4 bg-white mx-auto mt-16 animate-bounce rounded-md text-black w-max cursor-pointer">
              <p className=" w-full text-sm">
                Let&apos;s get you started. ASAP!
              </p>
              <ArrowRight className="text-brand_accent" />
            </button>
          </Link>
        </div>
      </section>

      <section className="px-10 md:px-[100px]">
        <div className="flex flex-col gap-y-16 md:flex-row gap-x-10 justify-between">
          <div className="space-y-4  bg">
            <MessageCircle className="h-16 w-16 text-brand_accent" />
            <div className="space-y-3">
              <h4 className="font-bbneue text-2xl">Chat with Us</h4>
              <p className="md:w-[70%]">
                Instant assistance at your fingertips. Start a conversation with
                our team on WhatsApp now!
              </p>
            </div>
            <button className="underline text-brand_accent">
              Let&apos;s chat on Whatsapp
            </button>
          </div>
          <div className="space-y-4  bg">
            <Headset className="h-16 w-16 text-brand_accent" />
            <div className="space-y-3">
              <h4 className="font-bbneue text-2xl">Call Us</h4>
              <p className="md:w-[70%]">
                Speak directly with our experts for personalized support and
                answers to your questions.
              </p>
            </div>
            <button className="underline text-brand_accent">
              (+234) 810 337 3456
            </button>
          </div>
          <div className="space-y-4  bg">
            <Mail className="h-16 w-16 text-brand_accent" />
            <div className="space-y-3">
              <h4 className="font-bbneue text-2xl">General Inquiries</h4>
              <p className="md:w-[80%]">
                Send us an email for any inquiries or information. We&apos;re
                here to help!
              </p>
            </div>
            <button className="underline text-brand_accent">
              support@verdroof.com
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-brand_primary text-white px-10 md:px-[100px] py-16">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Explore Section */}
          <div>
            <h2 className="font-bold text-lg mb-4 font-bbneue">Explore</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-green-400">
                  Listings
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-green-400">
                  Become a host
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400">
                  Policies
                </a>
              </li>
            </ul>
          </div>
          {/* Support Section */}
          <div>
            <h2 className="font-bold text-lg mb-4 font-bbneue">Support</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-green-400">
                  Chat with us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-green-400">
                  Speak with us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400">
                  Leave an enquiry or review
                </a>
              </li>
            </ul>
          </div>
          {/* Follow Us Section */}
          <div>
            <h2 className="font-bold text-lg mb-4 font-bbneue">Follow us</h2>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-400">
                <Twitter />
              </a>
              <a href="#" className="hover:text-green-400">
                <Facebook />
              </a>
              <a href="#" className="hover:text-green-400">
                <Instagram />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            &copy; 2024 Verdroof. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

export default Home;
