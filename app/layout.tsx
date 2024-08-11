import type { Metadata } from "next";
import "./globals.css";
import { GeneralProvider } from "./utils/contexts/GeneralContext";
import QueryClientWrapper from "./utils/query-provider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import localFont from "@next/font/local";

const kenyan = localFont({
  src: [
    {
      path: "../public/fonts/kenyan-coffee-regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-kenyan-coffee",
});

const serenata = localFont({
  src: [
    {
      path: "../public/fonts/Serenata Vantages Bold.ttf",
      weight: "400",
    },
  ],
  variable: "--font-serenata-vantages",
});

export const metadata: Metadata = {
  title: "Verdroof",
  description: "Your one stop to affordable accomodation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-[#FFFFFF] ${kenyan.variable} ${serenata.variable}  !font-dmsansmin-h-[100vh] w-full`}
      >
        <Suspense fallback={<>Loading...</>}>
          <QueryClientWrapper>
            <GeneralProvider>{children}</GeneralProvider>
            <ToastContainer />
          </QueryClientWrapper>
        </Suspense>
      </body>
    </html>
  );
}
