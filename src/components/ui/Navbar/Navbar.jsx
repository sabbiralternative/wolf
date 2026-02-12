/* eslint-disable react/no-unknown-property */
import { Link, useLocation, useNavigate } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import Login from "../../modal/Login";
// import UseTokenGenerator from "../../../hooks/UseTokenGenerator";
// import UseEncryptData from "../../../hooks/UseEncryptData";
import { Settings } from "../../../api";
import { useEffect, useState } from "react";
import useBalance from "../../../hooks/useBalance";
import { IoArrowBack } from "react-icons/io5";
import Warning from "../Notification/Warning";
import GetOTP from "../../modal/signup/GetOTP";
import Registration from "../../modal/signup/Registration";
import Success from "../Notification/Success";
import GetForgotOTP from "../../modal/forgotPassword/GetForgotOTP";
import ForgotPassword from "../../modal/forgotPassword/ForgotPassword";
import AppPopup from "./AppPopUp";
import Language from "../../modal/Language";
import useLanguage from "../../../hooks/useLanguage";
import { languageValue } from "../../../utils/language";
import { LanguageKey } from "../../../constant/constant";
import Notification from "./Notification";
import DownloadAPK from "../../modal/DownloadAPK/DownloadAPK";
import BuildVersion from "../../modal/BuildVersion";
import Error from "../../modal/Error/Error";
// import { AndroidView } from "react-device-detect";
const Navbar = () => {
  const [showBuildVersion, setShowBuildVersion] = useState(false);
  const stored_build_version = localStorage.getItem("build_version");
  const { valueByLanguage } = useLanguage();
  const language = localStorage.getItem("language");

  const [orderId, setOrderId] = useState({
    orderId: "",
    otpMethod: "",
  });
  const [errorLogin, setErrorLogin] = useState("");
  const {
    setShowSidebar,
    showLogin,
    setShowLogin,
    token,
    setGetToken,
    isCheckedBonusToken,
    logo,
    setSportsType,
    setSHowDeposit,
    showOTP,
    setShowOTP,
    closePopupForForever,
    setClosePopUpForForever,
  } = useContextState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showForgotOTP, setShowForgotOTP] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();
  const navigate = useNavigate();
  const loginName = localStorage.getItem("loginName");
  /* Get balance data */
  const { balanceData } = useBalance();
  const [showWarning, setShowWarning] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [mobileNo, setMobileNo] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showAPKModal, setShowAPKModal] = useState(false);

  /* handle login demo user */
  // const loginWithDemo = () => {
  //   /* Random token generator */
  //   const generatedToken = UseTokenGenerator();
  //   /* Encrypted the post data */
  //   const loginData = UseEncryptData({
  //     username: "demo",
  //     password: "",
  //     token: generatedToken,
  //   });
  //   fetch(API.login, {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(loginData),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       /* Set token to localeStorage */
  //       localStorage.setItem("token", data.result.token);
  //       /* Set login name to locale storage */
  //       localStorage.setItem("loginName", data.result.loginName);
  //       /* set button value to locale storage */
  //       const buttonValue = JSON.stringify(data.result.buttonValue.game);
  //       /* set modal picture to locale storage for the open modal in home page */
  //       localStorage.setItem("buttonValue", buttonValue);
  //       const modal = [
  //         { banner: data?.result?.banner },
  //         { bannerTitle: data?.result?.bannerTitle },
  //       ];
  //       localStorage.setItem("modal", JSON.stringify(modal));
  //       if (
  //         localStorage.getItem("token") &&
  //         localStorage.getItem("loginName") &&
  //         data?.result?.changePassword === false
  //       ) {
  //         /* Get current token from locale storage */
  //         setGetToken((prev) => !prev);
  //       } else {
  //         /* set  error message during login failed   */
  //         setErrorLogin(data?.error);
  //       }
  //     });
  // };

  /* Handle navigate deposit page */
  const handleNavigateDeposit = () => {
    /* If checked bonus token true then set warning message */
    if (isCheckedBonusToken) {
      setShowWarning("Please switch to main wallet for deposit.");
    } else {
      setSHowDeposit(true);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const newVersion = Settings?.build_version;
    if (!stored_build_version) {
      if (newVersion) {
        localStorage.setItem("build_version", newVersion);
      }
    }
    if (stored_build_version && newVersion) {
      const parseVersion = JSON.parse(stored_build_version);
      if (newVersion > parseVersion) {
        setShowBuildVersion(true);
      }
    }
  }, [stored_build_version]);

  // useEffect(() => {
  //   const expiryTime = localStorage.getItem("installPromptExpiryTime");
  //   const currentTime = new Date().getTime();
  //   if (!expiryTime || currentTime > expiryTime) {
  //     localStorage.removeItem("installPromptExpiryTime");
  //     setIsModalOpen(true);
  //   }
  // }, [isModalOpen]);

  useEffect(() => {
    const apk_modal_shown = sessionStorage.getItem("apk_modal_shown");
    const closePopupForForever = localStorage.getItem("closePopupForForever");
    setClosePopUpForForever(closePopupForForever ? true : false);
    if (location?.state?.pathname === "/apk" || location.pathname === "/apk") {
      sessionStorage.setItem("apk_modal_shown", true);
      localStorage.setItem("closePopupForForever", true);
      setClosePopUpForForever(true);
      localStorage.removeItem("installPromptExpiryTime");
    } else {
      if (!apk_modal_shown) {
        setShowAPKModal(true);
      }
      if (!closePopupForForever) {
        const expiryTime = localStorage.getItem("installPromptExpiryTime");
        const currentTime = new Date().getTime();

        if (!expiryTime || currentTime > expiryTime) {
          setIsModalOpen(true);
        }
      }
    }
  }, [
    windowWidth,
    isModalOpen,
    location?.state?.pathname,
    location.pathname,
    setClosePopUpForForever,
  ]);

  const openWhatsapp = () => {
    if (Settings?.whatsapplink) {
      window.open(Settings?.whatsapplink, "_blank");
    }
  };

  if (Settings.appOnly && !closePopupForForever) {
    return <Error />;
  }

  return (
    <>
      <Notification />
      {Settings.apk_link && isModalOpen && windowWidth < 550 && (
        <AppPopup setIsModalOpen={setIsModalOpen} />
      )}
      {/* Show warning message */}
      {showWarning && (
        <Warning message={showWarning} setMessage={setShowWarning} />
      )}

      {Settings.apk_link && showAPKModal && (
        <DownloadAPK setShowAPKModal={setShowAPKModal} />
      )}
      {showBuildVersion && !showAPKModal && (
        <BuildVersion
          build_version={Settings?.build_version}
          setShowBuildVersion={setShowBuildVersion}
        />
      )}

      <div
        style={{ position: "relative" }}
        _ngcontent-ng-c943649379=""
        className="page-header"
      >
        {showLanguage && <Language setShowLanguage={setShowLanguage} />}
        <div _ngcontent-ng-c943649379="" _nghost-ng-c3243547741="">
          <div
            _ngcontent-ng-c3243547741=""
            className="header-wrapper top-header"
          >
            <div _ngcontent-ng-c3243547741="" className="logo">
              {/* Showing sidebar button in only home page */}
              {location?.pathname === "/" ? (
                <span
                  onClick={() => setShowSidebar(true)}
                  _ngcontent-ng-c3243547741=""
                  role="img"
                  className="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color ng-star-inserted"
                  aria-hidden="true"
                  data-mat-icon-type="font"
                  style={{ cursor: "pointer", color: "white" }}
                >
                  menu
                </span>
              ) : (
                <IoArrowBack
                  size={25}
                  color="#fff"
                  style={{ cursor: "pointer" }}
                  /* Navigate back */
                  onClick={() => {
                    navigate(-1);
                  }}
                />
              )}
              <Link
                /* Set sports type to inplay */
                onClick={() => setSportsType(0)}
                to="/"
              >
                <img
                  style={{
                    // height: `${Settings.logoHeight}px`,
                    // width: `${Settings.logoWidth}px`,
                    objectFit: "contain",
                  }}
                  _ngcontent-ng-c3243547741=""
                  alt="logo"
                  src={logo}
                  className="ng-star-inserted"
                />
              </Link>
            </div>
            {/* If token available then showing below html else----> */}
            <div _ngcontent-ng-c3243547741="" className="header-right-cont">
              {token ? (
                <div
                  _ngcontent-ng-c3243547741=""
                  className="loggedIn ng-star-inserted"
                >
                  <div _ngcontent-ng-c3243547741="" className="bal-cont">
                    <div
                      _ngcontent-ng-c3243547741=""
                      className="bal-amount show-bal"
                    >
                      <span
                        style={{ color: "white", fontSize: "10px" }}
                        _ngcontent-ng-c3243547741=""
                      >
                        {isCheckedBonusToken ? "Bonus" : "Bal"}
                      </span>
                      <p _ngcontent-ng-c3243547741="">
                        {balanceData?.creditLimit}
                      </p>
                    </div>
                    <div
                      _ngcontent-ng-c3243547741=""
                      className="bal-amount exp-bal"
                    >
                      <span
                        style={{ color: "white", fontSize: "10px" }}
                        _ngcontent-ng-c3243547741=""
                      >
                        Exp
                      </span>
                      <p
                        style={{ width: "fit-content" }}
                        _ngcontent-ng-c3243547741=""
                      >
                        {balanceData?.deductedExposure}
                      </p>
                      {/* <span
                        style={{ color: "white", fontSize: "10px" }}
                        _ngcontent-ng-c3243547741=""
                      >
                        {loginName}
                      </span> */}
                    </div>
                  </div>
                  {/* If deposit true in settings then showing deposit button  */}
                  {Settings.deposit && (
                    <button
                      onClick={handleNavigateDeposit}
                      _ngcontent-ng-c3243547741=""
                      mat-flat-button=""
                      className="btn deposit-btn mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-unthemed mat-mdc-button-base ng-star-inserted"
                      mat-ripple-loader-uninitialized=""
                      mat-ripple-loader-class-name="mat-mdc-button-ripple"
                    >
                      <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                      <span className="mdc-button__label">
                        {" "}
                        {languageValue(
                          valueByLanguage,
                          LanguageKey.DEPOSIT,
                        )}{" "}
                      </span>
                      <span className="mat-mdc-focus-indicator"></span>
                      <span className="mat-mdc-button-touch-target"></span>
                    </button>
                  )}
                </div>
              ) : (
                <div
                  _ngcontent-ng-c3243547741=""
                  className="not-loggedIn ng-star-inserted"
                >
                  <button
                    onClick={() => setShowLogin(true)}
                    _ngcontent-ng-c3243547741=""
                    mat-flat-button=""
                    className="btn dark-outlined-btn mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-unthemed mat-mdc-button-base"
                    mat-ripple-loader-class-name="mat-mdc-button-ripple"
                  >
                    <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                    <span className="mdc-button__label">
                      {" "}
                      {languageValue(valueByLanguage, LanguageKey.LOGIN)}
                    </span>
                    <span className="mat-mdc-focus-indicator"></span>
                    <span className="mat-mdc-button-touch-target"></span>
                    <span className="mat-ripple mat-mdc-button-ripple"></span>
                  </button>
                  {/* If registration true in settings then showing registration button  */}
                  {Settings.register && (
                    <button
                      onClick={() => setShowOTP(true)}
                      _ngcontent-ng-c3243547741=""
                      mat-flat-button=""
                      className="btn dark-outlined-btn mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-unthemed mat-mdc-button-base"
                      mat-ripple-loader-class-name="mat-mdc-button-ripple"
                    >
                      <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                      <span className="mdc-button__label">
                        {" "}
                        {languageValue(valueByLanguage, LanguageKey.REGISTER)}
                      </span>
                      <span className="mat-mdc-focus-indicator"></span>
                      <span className="mat-mdc-button-touch-target"></span>
                      <span className="mat-ripple mat-mdc-button-ripple"></span>
                    </button>
                  )}
                  {Settings.registrationWhatsapp && Settings?.whatsapplink && (
                    <button
                      onClick={openWhatsapp}
                      _ngcontent-ng-c3243547741=""
                      mat-flat-button=""
                      className="btn dark-outlined-btn mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-unthemed mat-mdc-button-base"
                      mat-ripple-loader-class-name="mat-mdc-button-ripple"
                    >
                      <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                      <span className="mdc-button__label">Get Id</span>
                      <span className="mat-mdc-focus-indicator"></span>
                      <span className="mat-mdc-button-touch-target"></span>
                      <span className="mat-ripple mat-mdc-button-ripple"></span>
                    </button>
                  )}
                  {/* If demo login true in settings then showing demologin button  */}
                  {/* {Settings.demoLogin && (
                    <button
                      onClick={loginWithDemo}
                      _ngcontent-ng-c3243547741=""
                      mat-flat-button=""
                      className="btn dark-outlined-btn demo-btn mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-unthemed mat-mdc-button-base primary-button"
                      mat-ripple-loader-class-name="mat-mdc-button-ripple"
                    >
                      <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                      <span className="mdc-button__label">Demo ID</span>
                      <span className="mat-mdc-focus-indicator"></span>
                      <span className="mat-mdc-button-touch-target"></span>
                      <span className="mat-ripple mat-mdc-button-ripple"></span>
                    </button>
                  )} */}
                </div>
              )}
              {Settings.language && (
                <button
                  onClick={() => setShowLanguage((prev) => !prev)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "end",
                    background: "transparent",
                    border: "none",
                    // marginTop: "14px",
                  }}
                >
                  <div>
                    <img
                      style={{
                        height: "20px",
                        width: "20px",
                      }}
                      src="/src/assets/globe.gif"
                      alt=""
                    />
                    <p
                      style={{
                        margin: "0px",
                        fontSize: "10px",
                        color: "white",
                        textTransform: "capitalize",
                      }}
                    >
                      {language || "EN"}
                    </p>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Render html in condition */}
        {loginName === "demo" && (
          <div _ngcontent-ng-c943649379="" _nghost-ng-c3660323651="">
            <div
              _ngcontent-ng-c3660323651=""
              className="demoid-marquee bottom ng-star-inserted"
            >
              <marquee
                _ngcontent-ng-c3660323651=""
                width="100%"
                direction="left"
                height="auto"
                scrollamount="5"
                loop=""
              >
                This is a Demo ID (to buy Mercedes play with real money)
              </marquee>

              <p _ngcontent-ng-c3660323651="" className="marquee">
                This is a Demo ID (to buy Mercedes play with real money)
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Login modal */}
      {showLogin && (
        <Login
          setShowLogin={setShowLogin}
          errorLogin={errorLogin}
          setErrorLogin={setErrorLogin}
          setGetToken={setGetToken}
          setShowForgotOTP={setShowForgotOTP}
        />
      )}
      {/* forgot password */}
      {showForgotOTP && (
        <GetForgotOTP
          setOrderId={setOrderId}
          setShowForgotOTP={setShowForgotOTP}
          setShowForgotPassword={setShowForgotPassword}
          mobileNo={mobileNo}
          setMobileNo={setMobileNo}
        />
      )}
      {showForgotPassword && (
        <ForgotPassword
          orderId={orderId}
          setShowForgotPassword={setShowForgotPassword}
          setShowForgotOTP={setShowForgotOTP}
          mobileNo={mobileNo}
          setErrMsg={setErrMsg}
          setSuccessMsg={setSuccessMsg}
        />
      )}
      {/* Opt register modal */}
      {showOTP && (
        <GetOTP
          setOrderId={setOrderId}
          setShowOTP={setShowOTP}
          setShowRegister={setShowRegister}
          mobileNo={mobileNo}
          setMobileNo={setMobileNo}
        />
      )}
      {/* Registration modal */}
      {showRegister && (
        <Registration
          orderId={orderId}
          setShowRegister={setShowRegister}
          setShowOTP={setShowOTP}
          mobileNo={mobileNo}
          setErrRegister={setErrMsg}
          setSuccessRegister={setSuccessMsg}
        />
      )}
      {/* Success message after registration */}
      {successMsg && (
        <Success
          message={successMsg}
          setMessage={setSuccessMsg}
          success={true}
        />
      )}
      {/* Error message after failed registration */}
      {errMsg && (
        <Success message={errMsg} setMessage={setErrMsg} success={false} />
      )}
    </>
  );
};

export default Navbar;
