import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export default function useEditCabin() {
  const queryCilent = useQueryClient();

  const { mutate: editCabin, isLoading: isEditting } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryCilent.invalidateQueries(["cabins"]);
      // reset the form
      //   reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { editCabin, isEditting };
}
