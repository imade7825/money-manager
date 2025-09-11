import { toast } from "react-toastify";

export const notify = {
  saved: () => toast.success("Transaction saved!"),
  deleted: () => toast.success("Transaction deleted!"),
  error: () => toast.error("Please try again."),
};
