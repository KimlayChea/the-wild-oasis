import { useQuery } from "@tanstack/react-query";
import getCabins from "../../services/apiCabins";

export default function useCabins() {
  const {
    data: cabins,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { cabins, isLoading, error, isError };
}
