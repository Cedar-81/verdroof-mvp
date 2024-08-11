"use client";
import Link from "next/link";
import Logo from "./Logo";
import SubNav from "./SubNav";
import Login from "../auth/Login";
import { useGeneralContext } from "../utils/contexts/GeneralContext";
import SignUp from "../auth/Signup";
import { Menu } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { get_user } from "../actions/get_user";
import { UserData } from "../utils/interfaces";
// import { get_cookie } from "../actions/get_cookie";
// import { cookies } from "next/headers";

interface Params {
  nav_items: {
    title: string;
    route: string;
    active: boolean;
  }[];
}

export default function Nav({ nav_items }: Params) {
  const {
    showSubNav,
    setShowSubNav,
    showLogin,
    showSignup,
    setShowLogin,
    navItems,
    setNavItems,
    token,
    setUserData,
    userData,
  } = useGeneralContext();

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

    if (!userData.firstname || !userData.lastname || !userData.email) {
      getUser();
    }
    setNavItems(nav_items);
  }, [token, userData]);

  const searchParams = useSearchParams();
  const showLoginParam = searchParams.get("showLogin");

  if (showLoginParam?.trim() == "true") {
    setShowLogin(true);
  }

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
          {token.trim() != "" && (
            <button className="hidden md:flex">
              <Link href="/hosting">
                <p className="text-sm md:text-base font-medium hover_btn text-black/70 ">
                  Switch to hosting
                </p>
              </Link>
            </button>
          )}
          {/* <button className="btn  ">Signup/in</button> */}
          <div className="relative">
            <button
              onClick={() => setShowSubNav(!showSubNav)}
              className="flex rounded-full items-center justify-between py-[2px] pl-3 px-1 w-[6rem] border border-black/20 hover:shadow-md"
            >
              <Menu className="h-5 w-5 text-black/70" />
              <div className="h-10 w-10 text-white flex text-sm items-center justify-center bg-brand_primary rounded-full">
                {userData.firstname && userData.lastname
                  ? (userData.firstname[0] + userData.lastname[0])
                      .toString()
                      .toLocaleUpperCase()
                  : "N/A"}
              </div>
            </button>
            {showSubNav && <SubNav />}
            {showLogin && <Login />}
            {showSignup && <SignUp />}
          </div>
        </div>
      </nav>
    </div>
  );
}
