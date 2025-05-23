import Button from "../../ui/Button";
import useCheckout from "../check-in-out/useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();
  return (
    <Button
      onClick={() => checkout(bookingId)}
      variation="primary"
      size="small"
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
