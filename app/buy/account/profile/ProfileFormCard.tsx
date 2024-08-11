"use client";

import { useGeneralContext } from "@/app/utils/contexts/GeneralContext";
import { useUpdateProfile } from "@/app/utils/hooks/useUpdateProfile";
import { ProfileFormCardProps } from "@/app/utils/interfaces";
import { useState, useEffect, FormEvent } from "react";

const capitalizeWords = (str: string) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const validateInput = (label: string, value: string): string | null => {
  switch (label) {
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? null : "Invalid email address";
    case "phone number":
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      return phoneRegex.test(value) ? null : "Invalid phone number";
    case "legal name":
      return value.trim() !== "" ? null : "Legal name cannot be empty";
    default:
      return null;
  }
};

export default function ProfileFormCard({
  label,
  value,
  onChange,
}: ProfileFormCardProps) {
  const [edit, setShowEdit] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const { profileData, userData } = useGeneralContext();
  const { mutate: update } = useUpdateProfile();

  useEffect(() => {
    if (label === "legal name") {
      const names = value.split(" ");
      if (names.length > 1) {
        setFirstName(names[0]);
        setLastName(names[1]);
      } else {
        setFirstName(value);
        setLastName("");
      }
    }
  }, [label, value]);

  useEffect(() => {
    const validationError = validateInput(label, value);
    setError(validationError);

    if (label === "legal name") {
      setIsSaveDisabled(
        !(
          firstName.trim() != "" &&
          lastName.trim() != "" &&
          validationError !== null
        )
      );
    } else {
      setIsSaveDisabled(validationError !== null);
    }
  }, [label, value, firstName, lastName]);

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    if (label === "legal name") {
      const fullName = `${firstName.trim()} ${lastName.trim()}`;
      const validationError = validateInput(label, fullName);
      if (validationError) {
        setError(validationError);
      } else {
        setError(null);
        onChange(fullName);
        setShowEdit(false);
      }
    } else {
      const validationError = validateInput(label, value);
      if (validationError) {
        setError(validationError);
      } else {
        setError(null);
        setShowEdit(false);
      }
    }

    update(profileData);
  };

  return (
    <div className="">
      {!edit && (
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg">{capitalizeWords(label)}</h3>
            <p className="text-black/70">
              {label == "legal name"
                ? `${userData.firstname} ${userData.lastname}`
                : label == "email"
                ? userData.email
                : value || "N/A"}
            </p>
          </div>
          {label != "legal name" && label != "email" && (
            <button onClick={() => setShowEdit(true)}>
              <p className="text-sm underline font-bold">Edit</p>
            </button>
          )}
        </div>
      )}
      {edit && (
        <div className="space-y-4">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg">{capitalizeWords(label)}</h3>
              <p className="text-sm text-black/70">
                {label === "legal name"
                  ? "Make sure this matches the name on your government ID."
                  : ""}
              </p>
            </div>
            <button onClick={() => setShowEdit(false)}>
              <p className="text-sm underline font-bold">Cancel</p>
            </button>
          </div>
          <form onSubmit={handleSave} className="space-y-5">
            {label === "legal name" ? (
              <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-5">
                <div className="flex rounded-lg flex-col border border-black/70 p-2">
                  <label htmlFor="firstname" className="text-sm">
                    First name on ID
                  </label>
                  <input
                    id="firstname"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="outline-none bg-transparent"
                  />
                </div>
                <div className="flex rounded-lg flex-col border border-black/70 p-2">
                  <label htmlFor="lastname" className="text-sm">
                    Last name on ID
                  </label>
                  <input
                    id="lastname"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="outline-none bg-transparent"
                  />
                </div>
              </div>
            ) : (
              <div className="flex rounded-lg flex-col border border-black/70 p-2">
                <label htmlFor={label} className="text-sm">
                  {capitalizeWords(label)}
                </label>
                <input
                  id={label}
                  type="text"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="outline-none bg-transparent"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            )}
            <button type="submit" className="btn" disabled={isSaveDisabled}>
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
