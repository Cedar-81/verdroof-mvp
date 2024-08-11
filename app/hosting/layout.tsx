import { ToastContainer } from "react-toastify";

// import Footer from "../nav/components/Footer";
import HostingNav from "../nav/HostingNav";
import { NavItems } from "../utils/interfaces";
import { BecomeAHostProvider } from "../utils/contexts/BecomeAHostContext";

const nav_items: NavItems[] = [
  // {
  //   title: "Listings",
  //   route: "/hosting/listing",
  //   active: true,
  // },
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
  return (
    <BecomeAHostProvider>
      <section className={`font-dmsans `}>
        <HostingNav nav_items={nav_items} />
        {children}
      </section>
    </BecomeAHostProvider>
  );
}
