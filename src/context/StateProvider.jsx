import { createContext, useEffect, useState } from "react";
import { API, Settings } from "../api";
export const StateContext = createContext(null);
import { getSetApis } from "../api/config";
import notice from "../../notice.json";
const StateProvider = ({ children }) => {
  /* Global state this states we are using in full project */

  const [sportsType, setSportsType] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const [token, setToken] = useState("");
  const [showLogin, setShowLogin] = useState(false);

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
  const baseUrl = notice?.result?.settings?.baseUrl;
  useEffect(() => {
    const fetchAPI = () => {
      getSetApis(setNoticeLoaded, baseUrl);
    };
    fetchAPI();
    const interval = setInterval(fetchAPI, 300000);
    return () => clearInterval(interval);
  }, [noticeLoaded, baseUrl]);

  /* Get token from locale storage */
  useEffect(() => {
    if (noticeLoaded) {
      const getToken = localStorage.getItem("token");
      const getBonusToken = localStorage.getItem("bonusToken");
      const getCheckedBonusToken = localStorage.getItem("checkedBonusToken");

      /* If check box true of bonus token and bonus token available then using bonus token in authorization headers */
      if (getCheckedBonusToken && getBonusToken) {
        /* Set bonus token */
        setToken(getBonusToken);
        /* Check box true of bonus */
        setIsCheckedBonusToken(true);
      } else {
        /* Set default token */
        setToken(getToken);
        /* Checkbox box false */
        setIsCheckedBonusToken(false);
      }

      if (token && (getToken === token || getBonusToken === token)) {
        /* handle loading for save crash website` */
        setTokenLoading(false);
      }
    }
  }, [getToken, token, noticeLoaded]);

  useEffect(() => {
    if (noticeLoaded) {
      /* Dynamically get  footer logo  */
      const icon = `${API.assets}/${Settings.siteUrl}/nav-sprite.svg`;
      setIcon(icon);

      /* Dynamically append  theme css  */
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      if (Settings.build === "production") {
        link.href = `${API.assets}/${Settings.siteUrl}/theme.css`;
        document.head.appendChild(link);
      } else {
        link.href = `/assets/css/theme.css`;
        document.head.appendChild(link);
      }

      /*Dynamically append Logo */
      const logo = `${API.assets}/${Settings.siteUrl}/logo.${Settings.logoFormat}`;
      setLogo(logo);
      /* Dynamically append  favicon  */
      const FavIconLink = document.createElement("link");
      FavIconLink.rel = "icon";
      FavIconLink.type = "image/png";
      FavIconLink.href = `${API.assets}/${Settings.siteUrl}/favicon.png`;
      document.head.appendChild(FavIconLink);
      /* Site title */
      document.title = Settings.siteTitle;
    }
  }, [noticeLoaded]);

  if (!noticeLoaded) {
    return;
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
  };
  return (
    <StateContext.Provider value={stateInfo}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
