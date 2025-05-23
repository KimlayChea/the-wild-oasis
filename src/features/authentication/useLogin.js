import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      loginApi({ fullName, email, password }),
    onSuccess: (user) => {
      // set data to cache
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      console.log("ERROR", error);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { isLoading, login };
}
