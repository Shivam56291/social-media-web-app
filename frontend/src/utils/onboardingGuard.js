import { showToast } from "./toast";
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
    showToast.info("Complete your profile to unlock full experience ✨");

    return false;
  }

  return true;
};