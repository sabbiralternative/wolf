import { createContext, useEffect, useState } from "react";
export const StateContext = createContext(null);
import { getSetApis } from "../api/config";
import notice from "../../notice.json";

const StateProvider = ({ children }) => {
  /* Global state this states we are using in full project */

  const [sportsType, setSportsType] = useState(0);
  const [closePopupForForever, setClosePopUpForForever] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [token, setToken] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showChangePassModal, setShowChangePassModal] = useState(false);
  const [getToken, setGetToken] = useState(false);
  const [tokenLoading, setTokenLoading] = useState(true);
  const [showEditStake, setShowEditStake] = useState(false);
  const [placeBetValues, setPlaceBetValues] = useState({});
  const [isCheckedBonusToken, setIsCheckedBonusToken] = useState(false);
  const [successClaimMsg, setSuccessClaimMsg] = useState("");
  const [errClaimMsg, setErrClaimMsg] = useState("");
  const [logo, setLogo] = useState("");
  const [promoSuccessMsg, setPromoSuccessMsg] = useState("");
  const [promoErrMsg, setPromoErrMgs] = useState("");
  const [icon, setIcon] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(null);
  const [showDeposit, setSHowDeposit] = useState(false);
  const [copyTextSuccess, setCopyTextSuccess] = useState("");
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  const [showBonusRule, setShowBonusRule] = useState(false);
  const [openBetSlip, setOpenBetSlip] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [predictOdds, setPredictOdds] = useState([]);
  const [noticeLoaded, setNoticeLoaded] = useState(false);

  useEffect(() => {
    if (!noticeLoaded) {
      const fetchAPI = () => {
        getSetApis(setNoticeLoaded);
      };
      fetchAPI();
    }
  }, [noticeLoaded]);

  useEffect(() => {
    if (noticeLoaded) {
      const token = localStorage.getItem("token");

      setToken(token);
      setTokenLoading(false);
    }
  }, [token, setToken, setTokenLoading, noticeLoaded, getToken]);

  if (!noticeLoaded) {
    return null;
  }

  const stateInfo = {
    sportsType,
    setSportsType,
    showSidebar,
    setShowSidebar,
    showLogin,
    setShowLogin,
    token,
    setToken,
    getToken,
    setGetToken,
    tokenLoading,
    setTokenLoading,
    showEditStake,
    setShowEditStake,
    placeBetValues,
    setPlaceBetValues,
    isCheckedBonusToken,
    setIsCheckedBonusToken,
    logo,
    setLogo,
    successClaimMsg,
    setSuccessClaimMsg,
    errClaimMsg,
    setErrClaimMsg,
    promoSuccessMsg,
    setPromoSuccessMsg,
    promoErrMsg,
    setPromoErrMgs,
    icon,
    setIcon,
    paymentAmount,
    setPaymentAmount,
    showDeposit,
    setSHowDeposit,
    copyTextSuccess,
    setCopyTextSuccess,
    showHelpModal,
    setShowHelpModal,
    showReferral,
    setShowReferral,
    showBonusRule,
    setShowBonusRule,
    openBetSlip,
    setOpenBetSlip,
    showOTP,
    setShowOTP,
    predictOdds,
    setPredictOdds,
    showChangePassModal,
    setShowChangePassModal,
    closePopupForForever,
    setClosePopUpForForever,
  };
  return (
    <StateContext.Provider value={stateInfo}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
