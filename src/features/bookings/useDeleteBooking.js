import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi, // error was thrown from here
    onSuccess: () => {
      // refetch
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      queryClient.invalidateQueries({ queryKey: ["stays"] });
      toast.success("Booking successfully Deleted");
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteBooking };
}
