import { useQuery } from "@tanstack/react-query";

const fetchListings = async (id: string) => {
  const response = await fetch(`https://admin.verdroof.com/api/property/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useSingleListing = (id: string) => {
  return useQuery({
    queryKey: [`listing_${id}`],
    queryFn: () => fetchListings(id),
  });
};
