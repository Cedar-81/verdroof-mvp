import { Bookmark, HandCoins, LucideProps, UserRound } from "lucide-react";
import AccountCard from "./AccountCard";
import Link from "next/link";

export default function Account() {
  const accountCards = [
    {
      title: "Profile",
      info: "Update your personal details and property goals",
      route: "/buy/account/profile",
      icon: UserRound,
    },
    {
      title: "Bookmarked Listings",
      info: "View your saved listings",
      route: "/buy/account/bookmarks",
      icon: Bookmark,
    },
    {
      title: "Payment and Payouts",
      info: "Manage you Payment and payout details",
      route: "/buy/account/payments",
      icon: HandCoins,
    },
  ];
  return (
    <div className="h-[100vh] bg-white text-black px-10 md:px-[5rem] font-dmsans">
      <section className="py-20 space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold">My Account</h1>
        <p className="font-bold text-black/70">
          Manage your account details and preferences
        </p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {accountCards.map((item, index) => (
          <Link key={index} href={item.route}>
            <AccountCard key={index} details={item} />
          </Link>
        ))}
      </section>
    </div>
  );
}
