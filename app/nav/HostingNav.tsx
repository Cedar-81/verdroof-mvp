"use client";
import Link from "next/link";
import Logo from "./Logo";
import { useState } from "react";

interface Params {
  nav_items: {
    title: string;
    route: string;
    active: boolean;
  }[];
}

export default function HostingNav({ nav_items }: Params) {
  const [navItems, setNavItems] = useState(nav_items);

  const handleActive = (idx: number) => {
    const nav_items_cp = nav_items;

    nav_items_cp.forEach((item, index, arr) => {
      if (idx == index) {
        arr[index].active = true;
      } else {
        arr[index].active = false;
      }
    });

    setNavItems((prev) => (prev = nav_items_cp));
  };

  return (
    <div className="h-[5rem]">
      <nav className="w-full border-b-2 bg-white border-black/15 h-[5rem] fixed top-0 right-0 flex z-40 justify-between px-8 md:px-[5rem] py-4 items-center">
        <Link href={"/"}>
          <Logo />
        </Link>
        <ul className="hidden md:flex space-x-4 text-black/50">
          {navItems.map((item, idx) => (
            <Link key={idx} href={item.route}>
              <button
                onClick={() => handleActive(idx)}
                className={` ${
                  item.active
                    ? "hover_btn text-black/70 font-bold hover:bg-transparent"
                    : "text-black/50 hover_btn"
                }`}
              >
                <li className="">{item.title}</li>
              </button>
            </Link>
          ))}
        </ul>
        <div className="flex space-x-6 items-center">
          <button>
            <Link href="/">
              <p className="text-sm md:text-base font-medium hover_btn text-black/70 ">
                Switch to buying
              </p>
            </Link>
          </button>
        </div>
      </nav>
    </div>
  );
}
