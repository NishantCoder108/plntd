import toast from "react-hot-toast";

export const validateTradeInputs = (
  amount: string,
  name: string,
  image: File | null,
  isWalletConnected: boolean
) => {
  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
    toast.error("Please enter a valid amount greater than 0");
    return false;
  }

  if (!name.trim()) {
    toast.error("Please enter your name");
    return false;
  }

  // if (!image) {
  //   toast.error("Please upload a picture of a tree");
  //   return false;
  // }

  if (!isWalletConnected) {
    toast.error("Please connect your wallet to continue");
    return false;
  }

  return true;
};
