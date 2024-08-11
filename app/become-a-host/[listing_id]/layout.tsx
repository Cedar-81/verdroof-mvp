"use client";
import { useEffect } from "react";
import { useBecomeAHostContext } from "../../utils/contexts/BecomeAHostContext";

const nav_items = [
  {
    title: "Listings",
    route: "/hosting/listing",
    active: true,
  },
  // {
  //   title: "Solar kit",
  //   route: "/buy/listing",
  //   active: false,
  // },
  // {
  //     title: "Listings",
  //     route: "/listing",
  //     active: false
  // },
];

export default function HostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setNavContent } = useBecomeAHostContext();
  useEffect(() => {
    setNavContent((prev) => {
      return {
        ...prev,
        button_string: "save_exit",
      };
    });
  }, []);
  return (
    <section className="h-[calc(100vh-11rem)] py-[4rem] overflow-y-auto">
      {children}
    </section>
  );
}
