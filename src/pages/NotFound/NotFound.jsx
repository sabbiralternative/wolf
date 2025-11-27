import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useContextState from "../../hooks/useContextState";
import { Settings } from "../../api";
import { useIndex } from "../../hooks";

const NotFound = () => {
  const location = useLocation();
  const { setShowOTP } = useContextState();
  const navigate = useNavigate();
  const { mutate } = useIndex();

  useEffect(() => {
    const showRegister = () => {
      if (location.pathname?.toLowerCase() === "/register") {
        if (Settings.register) {
          setShowOTP(true);
        }
        navigate("/");
      } else if (location.pathname.includes("/ref/")) {
        const splitPath = location.pathname.split("/");
        const lastDigit = splitPath[splitPath?.length - 1];
        if (parseFloat(lastDigit)) {
          mutate({ type: "addReferralCount", referral_id: lastDigit });
          localStorage.setItem("referralCode", lastDigit);
          setShowOTP(true);
          navigate("/");
        }
      }
    };
    showRegister();
  }, [location, navigate, setShowOTP]);

  return <Navigate to="/" replace />;
};

export default NotFound;
