import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { isProfileComplete } from "../utils/userStatus";

export default function useOnboardingGuard() {
  const navigate = useNavigate();
  const { user, access } = useSelector((state) => state.auth);

  const profileDone = isProfileComplete(user);

  useEffect(() => {
    if (!access || profileDone) return;

    const alreadyShown = sessionStorage.getItem("onboarding_toast_shown");

    if (!alreadyShown) {
      toast("Complete your profile to unlock full experience ✨", {
        icon: "👤",
      });

      sessionStorage.setItem("onboarding_toast_shown", "true");
    }

    navigate("/dashboard/profile", { replace: true });
  }, [access, profileDone, navigate]);
}