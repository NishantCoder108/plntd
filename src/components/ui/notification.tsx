"use client";
import toast from "react-hot-toast";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

type NotificationType = "PENDING" | "SUCCESS" | "ERROR";

const notification = (status: NotificationType, message: string) => {
  switch (status) {
    case "PENDING":
      toast.loading(
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin text-blue-500" />
          <span>{message || "Processing..."}</span>
        </div>
      );
      break;
    case "SUCCESS":
      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-500" />
          <span>{message || "Operation Successful!"}</span>
        </div>
      );
      break;
    case "ERROR":
      toast.error(
        <div className="flex items-center gap-2">
          <XCircle className="text-red-500" />
          <span>{message || "Something went wrong!"}</span>
        </div>
      );
      break;
    default:
      toast(message || "Unknown status!");
  }
};

export default notification;
