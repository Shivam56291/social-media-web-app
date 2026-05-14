import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { showToast } from "../utils/toast";
import { isProfileComplete } from "../utils/userStatus";

export default function useOnboardingGuard() {
  const navigate = useNavigate();
  const { user, access } = useSelector((state) => state.auth);

  const profileDone = isProfileComplete(user);

  useEffect(() => {
    if (!access || profileDone) return;

    const alreadyShown = sessionStorage.getItem("onboarding_toast_shown");

    if (!alreadyShown) {
      showToast.warning("Please complete your profile first ✨");

      sessionStorage.setItem("onboarding_toast_shown", "true");
    }

    navigate("/dashboard/profile", { replace: true });
  }, [access, profileDone, navigate]);
}