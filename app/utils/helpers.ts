import {
  ImageBlobStore,
  ListingForm,
  NumberCardItemType,
  SubNavItemsInterface,
} from "./interfaces";

import {
  Wifi,
  Tv,
  Thermometer,
  Snowflake,
  WashingMachine,
  Dumbbell,
  Waves,
  Building2,
  Car,
  ArrowUpNarrowWide,
  AlertCircle,
  Shield,
  BriefcaseMedical,
  FireExtinguisher,
  Ban,
  VolumeX,
  Clock,
  Lock,
  CheckSquare,
  Users,
  Heart,
  Music,
  Smartphone,
  CigaretteOff,
} from "lucide-react";

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);

  // Define arrays for month and AM/PM
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format, handle midnight case
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Add leading zero if necessary

  const formattedDate = `${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
  const formattedTime = `${formattedHours}:${minutes}${ampm}`;

  return `${formattedDate} at ${formattedTime}`;
};

export const amenityOptions = {
  basicAmenities: [
    { type: "Wi-Fi", icon: Wifi },
    { type: "TV", icon: Tv },
    { type: "Heating", icon: Thermometer },
    { type: "Air Conditioning", icon: Snowflake },
    { type: "Washer and Dryer", icon: WashingMachine },
  ],
  buildingAmenities: [
    { type: "Gym", icon: Dumbbell },
    { type: "Pool", icon: Waves },
    { type: "Rooftop Terrace", icon: Building2 },
    { type: "Parking Garage", icon: Car },
    { type: "Elevator", icon: ArrowUpNarrowWide },
  ],
  safetyAmenities: [
    { type: "Smoke Detector", icon: AlertCircle },
    { type: "Carbon Monoxide Detector", icon: Shield },
    { type: "First Aid Kit", icon: BriefcaseMedical },
    { type: "Fire Extinguisher", icon: FireExtinguisher },
  ],
};

export const houseRules = [
  { type: "No Pets", icon: Ban },
  //   { type: "Quiet Hours", icon: VolumeX },
  { type: "No Smoking", icon: CigaretteOff },
  //   { type: "Check-in Time", icon: Clock },
  //   { type: "Check-out Time", icon: Clock },
  { type: "Lock the Doors", icon: Lock },
  { type: "Respect Neighbors", icon: Users },
  { type: "Report Damages", icon: CheckSquare },
  { type: "No Parties", icon: Ban },
  { type: "Show Love", icon: Heart },
  { type: "No Loud Music", icon: Music },
  //   { type: "Limit Phone Usage", icon: Smartphone },
];

export const subnav_items: SubNavItemsInterface = {
  auth: [
    {
      title: "Login",
      active: false,
      route: "",
    },
    {
      title: "Signup",
      active: false,
      route: "",
    },
  ],
  other: [
    {
      title: "Help Center",
      active: false,
      route: "",
    },
    {
      title: "Logout",
      active: false,
      route: "",
    },
  ],
  personal: [
    {
      title: "Manage Listing",
      active: false,
      route: "/hosting/listing",
    },
    {
      title: "Account",
      active: false,
      route: "/buy/account",
    },
  ],
};

export const UnitSpecsQuestions: NumberCardItemType[] = [
  { question: "Size of unit", min: 100 },
  { question: "Unit floor", min: 1 },
  { question: "Number of bedrooms", min: 1 },
  { question: "Number of bathrooms", min: 1 },
  { question: "Number of roomates allowed", min: 0 },
];

export const form_fields: ListingForm = {
  apartment_type: "",
  unit_type: "",
  location: "",
  unit_size: "100",
  unit_floor: "1",
  no_of_bedrooms: "1",
  no_of_bathrooms: "1",
  basic_amenities: [],
  building_amenities: [],
  safety_amenities: [],
  house_rules: [],
  cover_image: "",
  other_images: [],
  description: "",
  payment_schedule: "",
  rent: "",
  current_link: "",
  utility_deposit: "",
  security_deposit: "",
  published: 0,
  updated_at: "",
};

export const paths = [
  "step-one",
  "about-your-place",
  "location",
  "about-this-unit",
  "step-two",
  "amenities",
  "listing-photos",
  "description",
  "house-rules",
  "step-three",
  "payment-schedule",
  "rent",
  "additional-bills",
];
