import toast from "react-hot-toast";
import { isProfileComplete } from "./userStatus";

export const canAccessRoute = (user, targetRoute) => {
  const profileDone = isProfileComplete(user);

  const protectedRoutes = [
    "/dashboard/feed",
    "/dashboard/explore",
    "/dashboard/messages",
    "/dashboard/notifications",
    "/dashboard/saved",
  ];

  if (!profileDone && protectedRoutes.includes(targetRoute)) {
    toast("Please complete your profile first ✨", {
      icon: "👤",
    });

    return false;
  }

  return true;
};