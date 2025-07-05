/* eslint-disable react/no-unknown-property */
import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
// import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import UseEncryptData from "../../hooks/UseEncryptData";
import UseTokenGenerator from "../../hooks/UseTokenGenerator";
import { API, Settings } from "../../api";
import Warning from "../ui/Notification/Warning";
import useContextState from "../../hooks/useContextState";
import handleDepositMethod from "../../utils/handleDepositMethod";
import useGetSocialLink from "../../hooks/useGetSocialLink";
import { AxiosSecure } from "../../lib/AxiosSecure";
const Login = ({
  setShowLogin,
  setErrorLogin,
  errorLogin,
  setGetToken,
  setShowForgotOTP,
}) => {
  const { refetchSocialLinks } = useGetSocialLink();
  const { logo, setShowChangePassModal } = useContextState();
  const { register, handleSubmit } = useForm();
  const [disable, setDisable] = useState(false);
  /* Close modal click out side */
  const warningRef = useRef();
  // const loginRef = useRef();
  // useCloseModalClickOutside(loginRef, () => {
  //   if (!warningRef.current) {
  //     setShowLogin(false);
  //   }
  // });

  /* handle login user */
  const onSubmit = async ({ username, password }) => {
    setDisable(true);
    const loginData = {
      username: username,
      password: password,
      b2c: Settings.b2c,
    };

    const { data } = await AxiosSecure.post(API.login, loginData);

    if (data.success) {
      setDisable(false);
      if (Settings.deposit) {
        const handleDeposit = handleDepositMethod(data.result.token);
        const res = await handleDeposit();
        if (res?.success) {
          localStorage.setItem("depositMethod", JSON.stringify(res?.result));
        }
      }
      /* Set token to localeStorage */
      localStorage.setItem("token", data.result.token);
      localStorage.setItem("memberId", data.result.memberId);
      /* Set bonus token in locale storage */
      localStorage.setItem("bonusToken", data?.result?.bonusToken);
      /* Set login name to locale storage */
      localStorage.setItem("loginName", data.result.loginName);
      const buttonValue = JSON.stringify(data.result.buttonValue.game);
      /* set button value to locale storage */
      localStorage.setItem("buttonValue", buttonValue);
      if (Settings.referral) {
        const referralCode = data.result.referralCode;
        localStorage.setItem(
          "referralCode",
          referralCode == null ? "show" : referralCode
        );
      }
      /* if in locale storage token and login name available and  data?.result?.changePassword === false */
      if (
        localStorage.getItem("token") &&
        localStorage.getItem("loginName") &&
        data?.result?.changePassword === false
      ) {
        /* close modal */
        setShowLogin(false);
        /* get current token from locale storage */
        setGetToken((prev) => !prev);
        refetchSocialLinks();
      }
      if (data?.result?.changePassword) {
        setGetToken((prev) => !prev);
        setShowLogin(false);
        setShowChangePassModal(true);
      }
    } else {
      /* Show error message during login failed */
      setDisable(false);
      setErrorLogin(data?.error);
    }
  };

  /* handle login demo user */
  const loginWithDemo = () => {
    setDisable(true);
    /* Random token generator */
    const generatedToken = UseTokenGenerator();
    /* Encrypted the post data */
    const loginData = UseEncryptData({
      username: "demo",
      password: "",
      token: generatedToken,
      site: Settings.siteUrl,
      b2c: Settings.b2c,
    });
    fetch(API.login, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((data) => {
        setDisable(false);
        /* Set token to localeStorage */
        localStorage.setItem("token", data.result.token);
        /* Set login name to locale storage */
        localStorage.setItem("loginName", data.result.loginName);
        /* set button value to locale storage */
        const buttonValue = JSON.stringify(data.result.buttonValue.game);
        localStorage.setItem("buttonValue", buttonValue);
        /* if in locale storage token and login name available and  data?.result?.changePassword === false */
        if (
          localStorage.getItem("token") &&
          localStorage.getItem("loginName") &&
          data?.result?.changePassword === false
        ) {
          /* close modal */
          setShowLogin(false);
          /* get current token from locale storage */
          setGetToken((prev) => !prev);
        } else {
          /* Show error message during login failed */
          setDisable(false);
          setErrorLogin(data?.error);
        }
      });
  };

  return (
    <>
      <div className="cdk-overlay-container">
        <div className="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>
        <div
          className="cdk-global-overlay-wrapper"
          dir="ltr"
          style={{ justifyContent: "center", alignItems: "flex-end" }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.1 }}
            id="cdk-overlay-0"
            className="cdk-overlay-pane login-dialog"
            style={{
              width: "calc(100% - 30px)",
              minHeight: "320px",
              maxWidth: "500px",
              position: "static",
              marginBottom: "10px",
            }}
          >
            <div
              className="cdk-visually-hidden cdk-focus-trap-anchor"
              aria-hidden="true"
            ></div>
            <div
              className="mat-mdc-dialog-container mdc-dialog cdk-dialog-container mdc-dialog--open"
              id="LoginComponent"
              role="dialog"
              aria-modal="true"
              // ref={loginRef}
              // style="--mat-dialog-transition-duration: 150ms;"
            >
              <div className="mdc-dialog__container">
                <div className="mat-mdc-dialog-surface mdc-dialog__surface">
                  <div _nghost-ng-c2806737617="" className="ng-star-inserted">
                    <div _ngcontent-ng-c2806737617="" className="main">
                      <div
                        _ngcontent-ng-c2806737617=""
                        className="container login-section"
                      >
                        <div
                          _ngcontent-ng-c2806737617=""
                          className="login-header-section"
                        >
                          <div _ngcontent-ng-c2806737617="" className="logo">
                            {" "}
                            <img
                              style={{
                                height: `${Settings.logoHeight}px`,
                                width: `${Settings.logoWidth}px`,
                                objectFit: "contain",
                              }}
                              _ngcontent-ng-c2806737617=""
                              alt="logo"
                              src={logo}
                              className="ng-star-inserted"
                            />{" "}
                          </div>
                          {/* <div
                            _ngcontent-ng-c2806737617=""
                            className="welcome-text"
                          >
                            <h2
                              _ngcontent-ng-c2806737617=""
                              className="notranslate"
                            >
                              Login{" "}
                            </h2>
                          </div> */}

                          <button
                            onClick={() => setShowLogin(false)}
                            _ngcontent-ng-c2806737617=""
                            mat-mini-fab=""
                            color="primary"
                            mat-dialog-close=""
                            aria-label="Login Dialog Close Button"
                            className="close-btn mdc-fab mdc-fab--mini mat-mdc-mini-fab mat-primary mat-mdc-button-base"
                            mat-ripple-loader-class-name="mat-mdc-button-ripple"
                            type="button"
                            style={{
                              borderRadius: "50%",
                              fontSize: "25px",
                              height: "25px",
                              width: "25px",
                              border: "none",
                              cursor: "pointer",
                              color: "black",
                            }}
                          >
                            <IoClose
                              style={{
                                height: "100%",
                                width: "100%",
                                fontWeight: "700",
                              }}
                              size={30}
                            />
                          </button>
                        </div>
                        <div
                          _ngcontent-ng-c2806737617=""
                          className="body-section ng-star-inserted"
                          style={{
                            paddingBottom: "20px",
                          }}
                        >
                          <form
                            onSubmit={handleSubmit(onSubmit)}
                            _ngcontent-ng-c2806737617=""
                            className="ng-untouched ng-pristine ng-invalid"
                          >
                            <div
                              _ngcontent-ng-c2806737617=""
                              className="login-form"
                            >
                              <p
                                _ngcontent-ng-c2806737617=""
                                className="form-title"
                              >
                                User ID / Mobile Number
                              </p>
                              <div
                                _ngcontent-ng-c2806737617=""
                                className="form-list"
                              >
                                <div
                                  _ngcontent-ng-c2806737617=""
                                  appearance="fill"
                                  className="mat-mdc-form-field mat-form-field example-full-width ng-tns-c1205077789-3 mat-mdc-form-field-type-mat-input mat-form-field-appearance-fill mat-primary ng-untouched ng-pristine ng-invalid ng-star-inserted"
                                >
                                  <div className="mat-mdc-text-field-wrapper mdc-text-field ng-tns-c1205077789-3 mdc-text-field--filled mdc-text-field--no-label">
                                    <div className="mat-mdc-form-field-focus-overlay ng-tns-c1205077789-3 ng-star-inserted"></div>
                                    <div className="mat-mdc-form-field-flex ng-tns-c1205077789-3">
                                      <div className="mat-mdc-form-field-infix ng-tns-c1205077789-3">
                                        {" "}
                                        <input
                                          {...register("username", {
                                            required: true,
                                          })}
                                          _ngcontent-ng-c28067376
                                          type="text"
                                          name="username"
                                          appnumericonly=""
                                          matinput=""
                                          placeholder="Enter User ID / Mobile Number"
                                          formcontrolname="phone"
                                          className="mat-mdc-input-element ng-tns-c1205077789-3 ng-untouched ng-pristine ng-invalid mat-mdc-form-field-input-control mdc-text-field__input cdk-text-field-autofill-monitored"
                                          id="mat-input-0"
                                          required=""
                                          aria-required="true"
                                        />
                                      </div>
                                    </div>

                                    <div
                                      matformfieldlineripple=""
                                      className="mdc-line-ripple ng-tns-c1205077789-3 mdc-line-ripple--deactivating ng-star-inserted"
                                    ></div>
                                  </div>
                                </div>
                              </div>
                              <p
                                _ngcontent-ng-c2806737617=""
                                className="form-title"
                              >
                                Password
                              </p>
                              <div
                                _ngcontent-ng-c2806737617=""
                                className="form-list"
                              >
                                <div
                                  style={{ marginBottom: "0px" }}
                                  _ngcontent-ng-c2806737617=""
                                  appearance="fill"
                                  className="mat-mdc-form-field mat-form-field example-full-width ng-tns-c1205077789-3 mat-mdc-form-field-type-mat-input mat-form-field-appearance-fill mat-primary ng-untouched ng-pristine ng-invalid ng-star-inserted"
                                >
                                  <div className="mat-mdc-text-field-wrapper mdc-text-field ng-tns-c1205077789-3 mdc-text-field--filled mdc-text-field--no-label">
                                    <div className="mat-mdc-form-field-focus-overlay ng-tns-c1205077789-3 ng-star-inserted"></div>
                                    <div className="mat-mdc-form-field-flex ng-tns-c1205077789-3">
                                      <div className="mat-mdc-form-field-infix ng-tns-c1205077789-3">
                                        {" "}
                                        <input
                                          {...register("password", {
                                            required: true,
                                          })}
                                          _ngcontent-ng-c2806737617=""
                                          type="text"
                                          name="password"
                                          appnumericonly=""
                                          matinput=""
                                          placeholder="Password"
                                          formcontrolname="phone"
                                          className="mat-mdc-input-element ng-tns-c1205077789-3 ng-untouched ng-pristine ng-invalid mat-mdc-form-field-input-control mdc-text-field__input cdk-text-field-autofill-monitored"
                                          id="mat-input-0"
                                          aria-required="true"
                                        />
                                      </div>
                                    </div>

                                    <div
                                      matformfieldlineripple=""
                                      className="mdc-line-ripple ng-tns-c1205077789-3 mdc-line-ripple--deactivating ng-star-inserted"
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {Settings.register && (
                              <div
                                _ngcontent-ng-c2806737617=""
                                className="login-form"
                                style={{ backgroundColor: "none" }}
                              >
                                <div
                                  _ngcontent-ng-c2806737617=""
                                  className="form-btn"
                                >
                                  <button
                                    onClick={() => {
                                      setShowLogin(false);
                                      setShowForgotOTP(true);
                                    }}
                                    _ngcontent-ng-c2806737617=""
                                    className="btn "
                                    style={{
                                      textAlign: "end",
                                      marginRight: "10px",
                                      backgroundColor: "transparent",
                                      color: "white",
                                      fontSize: "11px",
                                      minHeight: "30px",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    Forgot Password ?
                                  </button>
                                </div>
                              </div>
                            )}

                            <div
                              style={{
                                marginTop: Settings.register ? "0px" : "20px",
                              }}
                              _ngcontent-ng-c2806737617=""
                              className="login-form"
                            >
                              <div
                                _ngcontent-ng-c2806737617=""
                                className="form-btn"
                              >
                                <button
                                  disabled={disable}
                                  _ngcontent-ng-c2806737617=""
                                  type="submit"
                                  className="btn secondary-btn"
                                >
                                  Login
                                </button>
                                <p
                                  _ngcontent-ng-c2806737617=""
                                  className="separator ng-star-inserted"
                                >
                                  OR
                                </p>
                                <div
                                  _ngcontent-ng-c2806737617=""
                                  className="extra-btns"
                                >
                                  {" "}
                                  <button
                                    disabled={disable}
                                    onClick={loginWithDemo}
                                    _ngcontent-ng-c2806737617=""
                                    type="button"
                                    className="btn secondary-btn ng-star-inserted"
                                  >
                                    Login with Demo ID
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
            <div
              className="cdk-visually-hidden cdk-focus-trap-anchor"
              aria-hidden="true"
            ></div>
          </motion.div>
        </div>
      </div>
      {errorLogin && (
        <Warning
          message={errorLogin}
          setMessage={setErrorLogin}
          warningRef={warningRef}
        />
      )}
    </>
  );
};

export default Login;
