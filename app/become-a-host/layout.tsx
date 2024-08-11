import {
  BecomeAHostContext,
  BecomeAHostProvider,
} from "../utils/contexts/BecomeAHostContext";
import BecomeAHostNav from "../nav/BecomeAHostNav";

const form_fields = {
  apartment_type: "",
  unit_type: "",
  location: "",
  unit_size: "",
  unit_floor: "",
  no_of_bedrooms: "",
  no_of_bathrooms: "",
  basic_amenities: [],
  building_amenities: [],
  safety_amenities: [],
  cover_image: "",
  other_images: [],
  description: "",
  payment_schedule: "",
  rent: "",
  utility_deposit: "",
  security_deposit: "",
};

export default function HostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={`font-dmsans overflow-hidden`}>
      <BecomeAHostProvider>
        <BecomeAHostNav />
        {children}
      </BecomeAHostProvider>
    </section>
  );
}
