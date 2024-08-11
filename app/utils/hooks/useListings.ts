import { useQuery } from "@tanstack/react-query";

const fetchListings = async () => {
  const response = await fetch("https://admin.verdroof.com/api/properties/all");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useListings = () => {
  return useQuery({ queryKey: ["listings"], queryFn: fetchListings });
};
