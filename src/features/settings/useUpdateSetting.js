import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export default function useUpdateSetting() {
  const queryCilent = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting successfully edited");
      queryCilent.invalidateQueries(["settings"]);
      // reset the form
      //   reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateSetting, isUpdating };
}
