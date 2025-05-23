import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export default function useCreateCabin() {
  const queryCilent = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    // data from the createEditCabin api
    onSuccess: (data) => {
      toast.success("New cabin successfully created");
      queryCilent.invalidateQueries(["cabins"]);
      // reset the form
      //   reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createCabin, isCreating };
}
