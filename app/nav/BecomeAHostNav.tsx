"use client";
import Link from "next/link";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { useBecomeAHostContext } from "../utils/contexts/BecomeAHostContext";
import { useFormSave } from "../utils/hooks/useFormSave";
import { get_user } from "../actions/get_user";
import { useGeneralContext } from "../utils/contexts/GeneralContext";

export default function BecomeAHostNav() {
  const { navContent, setNavContent } = useBecomeAHostContext();
  const { setNavItems, setUserData } = useGeneralContext();
  const [handleSave, isSaving, isPending] = useFormSave();

  useEffect(() => {
    const getUser = async () => {
      const user = await get_user();
      const parsed_user = user && JSON.parse(user);
      parsed_user &&
        setUserData({
          email: parsed_user.email,
          firstname: parsed_user.first_name,
          lastname: parsed_user.last_name,
        });
    };

    getUser();
  }, []);

  const handleActive = (idx: number) => {
    const nav_items_cp = navContent.nav_items;

    nav_items_cp.forEach((item, index, arr) => {
      if (idx == index) {
        arr[index].active = true;
      } else {
        arr[index].active = false;
      }
    });

    setNavContent((prev) => {
      return {
        ...prev,
        nav_items: nav_items_cp,
      };
    });
  };

  const handleSaveAndExit = () => {
    handleSave({ exit: true, publish: false });
  };

  return (
    <div className="h-[5rem]">
      <nav className="w-full border-b-2 bg-white border-black/15 h-[5rem] fixed top-0 right-0 flex z-40 justify-between px-8 md:px-[5rem] py-4 items-center">
        <Link href={"/"}>
          <Logo />
        </Link>
        <ul className="flex space-x-4 text-black/50">
          {navContent.nav_items.map((item, idx) => (
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
          {navContent.button_string == "save_exit" && (
            <button
              onClick={handleSaveAndExit}
              className="hover_btn border border-black/40 hover:border-black/70 "
            >
              <p className=" text-black/70 font-medium ">
                {isPending || isSaving ? "Saving..." : "Save & exit"}
              </p>
            </button>
          )}
          {navContent.button_string == "exit" && (
            <Link href="/hosting/listing">
              <button
                disabled={isSaving || isPending}
                className="hover_btn border border-black/10 hover:border-black/70 !px-7"
              >
                <p className=" text-black/70 font-medium ">Exit</p>
              </button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
