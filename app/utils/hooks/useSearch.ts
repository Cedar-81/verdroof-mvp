import { useQuery } from "@tanstack/react-query";
import { useGeneralContext } from "../contexts/GeneralContext";
import { SearchParams } from "../interfaces";

const search = async (search_params: SearchParams) => {
  const response = await fetch(
    `https://admin.verdroof.com/api/properties/search?rent=${search_params.rent}&type=${search_params.unit}&location=${search_params.location}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useSearch = (enabled: boolean) => {
  const { searchParams } = useGeneralContext();
  return useQuery({
    queryKey: [
      `search_${searchParams.location}_${searchParams.rent}_${searchParams.unit}`,
    ],
    queryFn: () => search(searchParams),
    enabled,
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });
};
