import Nav from "../nav/Nav";

const nav_items = [
  {
    title: "Listings",
    route: "/buy/listing",
    active: true,
  },
  {
    title: "Solar kit",
    route: "/buy/listing",
    active: false,
  },
];

export default async function BuyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={`font-dmsans`}>
      {/* <Header /> */}
      <Nav nav_items={nav_items} />
      {children}
    </section>
  );
}
