import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useDeleteCabin() {
  const querylient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi, // error was thrown from here
    onSuccess: () => {
      // refetch
      querylient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin successfully Deleted");
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteCabin };
}
