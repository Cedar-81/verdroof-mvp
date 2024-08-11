interface Params {
  section: string;
}

export default function AccountHeader({ section }: Params) {
  return (
    <section className="py-10">
      <h1 className="text-2xl md:text-3xl font-bold">{section}</h1>
    </section>
  );
}
