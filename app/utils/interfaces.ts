import { LucideProps } from "lucide-react";
import { z } from "zod";

export const listingSchema = z.object({
  id: z.number(),
  apartment_type: z.string(),
  unit_type: z.string(),
  location: z.string(),
  unit_size: z.string(),
  unit_floor: z.string(),
  no_of_bedrooms: z.string(),
  no_of_bathrooms: z.string(),
  basic_amenities: z.array(z.string()),
  building_amenities: z.array(z.string()),
  safety_amenities: z.array(z.string()),
  house_rules: z.array(z.string()),
  cover_image: z.string(),
  other_images: z.array(z.string()),
  description: z.string(),
  payment_schedule: z.string(),
  rent: z.string(),
  utility_deposit: z.string(),
  security_deposit: z.string(),
  published: z.number(),
  updated_at: z.string(),
  current_link: z.string(),
});

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const SignupFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstname: z.string().min(4),
  lastname: z.string().min(4),
});

// export const ImageBlobStoreSchema = z.object({
//   cover_image: z.instanceof(File),
//   other_images: z.array(z.instanceof(File)),
// });

export interface ImageStore {
  url: string | null;
  file: File | null;
  type: string;
  index: number;
}

export interface ImageBlobStore {
  cover_image: ImageStore;
  other_images: ImageStore[];
}
export const listingFormSchema = listingSchema.omit({ id: true });
export const userDataSchema = SignupFormSchema.omit({ password: true });
export type ListingForm = z.infer<typeof listingFormSchema>;
export type Listing = z.infer<typeof listingSchema>;
export type LoginFormData = z.infer<typeof LoginFormSchema>;
export type SignupFormData = z.infer<typeof SignupFormSchema>;
export type UserData = z.infer<typeof userDataSchema>;

export interface AddressContextType {
  address: string;
  setAddress: (address: string) => void;
  coordinates: [number, number] | null;
  setCoordinates: (coordinates: [number, number]) => void;
}

export interface InspectionDay {
  month: string;
  day: string;
  date: string;
}

export interface NavItem {
  title: string;
  route: string;
  active: boolean;
}

export interface SearchParams {
  rent: string;
  unit: string;
  location: string;
}

export interface GeneralContextType {
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  showSignup: boolean;
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
  showSubNav: boolean;
  setShowSubNav: React.Dispatch<React.SetStateAction<boolean>>;
  loginFormData: LoginFormData;
  setLoginFormData: React.Dispatch<React.SetStateAction<LoginFormData>>;
  signUpFormData: SignupFormData;
  setSignUpFormData: React.Dispatch<React.SetStateAction<SignupFormData>>;
  loginFormErrors: LoginFormErrors;
  setLoginFormErrors: React.Dispatch<React.SetStateAction<LoginFormErrors>>;
  signUpFormErrors: SignUpFormErrors;
  setSignUpFormErrors: React.Dispatch<React.SetStateAction<SignUpFormErrors>>;
  subNavItems: SubNavItemsInterface;
  setSubNavItems: React.Dispatch<React.SetStateAction<SubNavItemsInterface>>;
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  navItems: NavItem[];
  setNavItems: React.Dispatch<React.SetStateAction<NavItem[]>>;
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  shouldSearch: boolean;
  setShouldSearch: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

export interface SubNavItems {
  title: string;
  active: boolean;
  route: string;
}

export interface SubNavItemsInterface {
  auth: SubNavItems[];
  other: SubNavItems[];
  personal: SubNavItems[];
}

export interface LoginFormErrors {
  email: string;
  password: string;
}

export interface SignUpFormErrors {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export const listing_schema_without_id = listingSchema.omit({ id: true });

export interface BecomeAHostContextType {
  formField: ListingForm;
  setFormField: React.Dispatch<React.SetStateAction<ListingForm>>;
  navContent: NavContentInterface;
  setNavContent: React.Dispatch<React.SetStateAction<NavContentInterface>>;
  editingId: number | undefined;
  setEditingId: React.Dispatch<React.SetStateAction<number | undefined>>;
  isUpdate: boolean;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  imageBlobStore: ImageBlobStore;
  setImageBlobStore: React.Dispatch<React.SetStateAction<ImageBlobStore>>;
  showDuplicatePopup: boolean;
  setShowDuplicatePopup: React.Dispatch<React.SetStateAction<boolean>>;
  consolidatedImages: string[];
  setConsolidatedImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface NavItems {
  title: string;
  route: string;
  active: boolean;
}

export interface NavContentInterface {
  button_string: string;
  nav_items: NavItems[];
}

export interface ListingFormContextType {
  formField: ListingForm;
  setFormField: React.Dispatch<React.SetStateAction<ListingForm>>;
}

export interface NumberCardItemType {
  question: string;
  min: number;
}

export interface IconCardItemType {
  type: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

export interface RentalOptions {
  propertyTypes: IconCardItemType[];
  unitTypes: IconCardItemType[];
}

export interface AccountCards {
  title: string;
  info: string;
  route: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

export interface ProfileData {
  legal_name: string;
  preferred_name: string;
  email: string;
  phone_number: string;
  government_id: string;
  address: string;
  emergency_contact: string;
}

export interface ProfileFormCardProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}
