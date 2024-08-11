"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  SubNavItemsInterface,
  GeneralContextType,
  LoginFormData,
  LoginFormErrors,
  SignupFormData,
  SignUpFormErrors,
  ProfileData,
  NavItem,
  SearchParams,
  UserData,
} from "../interfaces";
import { subnav_items } from "../helpers";
import { get_cookie } from "@/app/actions/get_cookie";

export const GeneralContext = createContext<GeneralContextType | undefined>(
  undefined
);

export const GeneralProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showSubNav, setShowSubNav] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [shouldSearch, setShouldSearch] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    unit: "",
    location: "",
    rent: "",
  });
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [signUpFormData, setSignUpFormData] = useState<SignupFormData>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [loginFormErrors, setLoginFormErrors] = useState<LoginFormErrors>({
    email: "",
    password: "",
  });
  const [signUpFormErrors, setSignUpFormErrors] = useState<SignUpFormErrors>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [userData, setUserData] = useState<UserData>({
    email: "",
    firstname: "",
    lastname: "",
  });
  const [profileData, setProfileData] = useState<ProfileData>({
    legal_name: "",
    preferred_name: "",
    email: "",
    phone_number: "",
    government_id: "",
    address: "",
    emergency_contact: "",
  });
  const [subNavItems, setSubNavItems] = useState(subnav_items);
  const [token, setToken] = useState("");
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  useEffect(() => {
    const getToken = async () => {
      const token_str = await get_cookie();
      if (token_str && token_str?.trim() != "") {
        setToken(token_str);
        return;
      }

      setToken((prev) => (prev = ""));
    };

    getToken();
  }, [showSubNav]);

  return (
    <GeneralContext.Provider
      value={{
        loginFormErrors,
        setLoginFormErrors,
        signUpFormErrors,
        setSignUpFormErrors,
        showLogin,
        showSubNav,
        loginFormData,
        setShowSubNav,
        setShowLogin,
        setLoginFormData,
        subNavItems,
        setSubNavItems,
        showSignup,
        setShowSignup,
        signUpFormData,
        setSignUpFormData,
        profileData,
        setProfileData,
        token,
        setToken,
        navItems,
        setNavItems,
        searchParams,
        setSearchParams,
        shouldSearch,
        setShouldSearch,
        userData,
        setUserData,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error("useGeneralContext must be used within an GeneralProvider");
  }
  return context;
};
