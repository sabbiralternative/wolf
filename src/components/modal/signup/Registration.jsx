import { useRef, useState } from "react";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { API, Settings } from "../../../api";
import useContextState from "../../../hooks/useContextState";
import handleDepositMethod from "../../../utils/handleDepositMethod";
import useGetSocialLink from "../../../hooks/useGetSocialLink";
import { AxiosSecure } from "../../../lib/AxiosSecure";
/* eslint-disable react/no-unknown-property */
const Registration = ({
  setShowRegister,
  setShowOTP,
  mobileNo,
  setSuccessRegister,
  setErrRegister,
  orderId,
}) => {
  const referralCode = localStorage.getItem("referralCode");
  const { refetchSocialLinks } = useGetSocialLink();
  const { logo, setGetToken } = useContextState();
  /* Close modal click outside */
  const registerRef = useRef();
  useCloseModalClickOutside(registerRef, () => {
    setShowRegister(false);
  });
  const [user, setUser] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    mobileNo: "",
    otp: "",
    referralCode: "",
  });
  const { handleSubmit } = useForm();
  /* Handle register */
  const onSubmit = async () => {
    const registerData = {
      username: user?.userName,
      password: user?.password,
      confirmPassword: user?.password,
      mobile: mobileNo,
      otp: user?.otp,
      isOtpAvailable: Settings.otp,
      referralCode: referralCode || user.referralCode,
      orderId: orderId.orderId,
      otpMethod: orderId.otpMethod,
    };

    const { data } = await AxiosSecure.post(API.register, registerData);

    if (data?.success) {
      if (window?.fbq) {
        window.fbq("track", "CompleteRegistration", {
          content_name: "User Signup",
          status: "success",
        });
      }
      localStorage.removeItem("referralCode");
      if (Settings.deposit) {
        const handleDeposit = handleDepositMethod(data.result.token);
        const res = await handleDeposit();
        if (res?.success) {
          localStorage.setItem("depositMethod", JSON.stringify(res?.result));
        }
      }
      const banner = data?.result?.banner;
      if (banner) {
        localStorage.setItem("banner", banner);
      }
      /* Set token to localeStorage */
      localStorage.setItem("token", data.result.token);
      /* Set bonus token in locale storage */
      localStorage.setItem("bonusToken", data?.result?.bonusToken);
      /* Set login name to locale storage */
      localStorage.setItem("loginName", data.result.loginName);
      const buttonValue = JSON.stringify(data.result.buttonValue.game);
      /* set button value to locale storage */
      localStorage.setItem("buttonValue", buttonValue);

      /* if in locale storage token and login name available and  data?.result?.changePassword === false */
      if (
        localStorage.getItem("token") &&
        localStorage.getItem("loginName") &&
        data?.result?.changePassword === false
      ) {
        setGetToken((prev) => !prev);
        refetchSocialLinks();
        /* Show success message */
        setSuccessRegister("User registration successful!");
        /* Close modal */
        setShowRegister(false);
      } else {
        setErrRegister(data?.error?.description);
      }
    } else {
      setErrRegister(data?.error?.description);
    }
  };
  return (
    <div className="cdk-overlay-container">
      <div
        className="cdk-global-overlay-wrapper"
        dir="ltr"
        style={{
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1 }}
          id="cdk-overlay-1"
          className="cdk-overlay-pane login-dialog"
          style={{
            width: "calc(100% - 30px)",
            height: "auto",
            minHeight: "395px",
            maxWidth: "500px",
            position: "static",
            marginBottom: "10px",
          }}
          ref={registerRef}
        >
          <div
            className="cdk-visually-hidden cdk-focus-trap-anchor"
            aria-hidden="true"
          ></div>
          <div
            className="mat-mdc-dialog-container mdc-dialog cdk-dialog-container mdc-dialog--open"
            id="LoginWithOtpComponent"
            role="dialog"
            aria-modal="true"
            // style="--mat-dialog-transition-duration: 150ms;"
          >
            <div className="mdc-dialog__container">
              <div className="mat-mdc-dialog-surface mdc-dialog__surface">
                <div _nghost-ng-c1411651695="" className="ng-star-inserted">
                  <div _ngcontent-ng-c1411651695="" className="main">
                    <div
                      _ngcontent-ng-c1411651695=""
                      className="container login-section"
                    >
                      <div
                        _ngcontent-ng-c1411651695=""
                        className="login-header-section"
                      >
                        <button
                          onClick={() => {
                            setShowRegister(false);
                            setShowOTP(true);
                          }}
                          _ngcontent-ng-c1411651695=""
                          color="primary"
                          aria-label="Page back icon"
                          className="page-back-btn"
                        >
                          <span
                            _ngcontent-ng-c1411651695=""
                            role="img"
                            className="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color"
                            aria-hidden="true"
                            data-mat-icon-type="font"
                          >
                            keyboard_backspace
                          </span>
                          <span _ngcontent-ng-c1411651695="">Back</span>
                        </button>
                        <div _ngcontent-ng-c1411651695="" className="logo">
                          <img
                            _ngcontent-ng-c1411651695=""
                            alt="logo"
                            src={logo}
                            className="ng-star-inserted"
                          />
                        </div>
                        {Settings.otp && (
                          <div
                            _ngcontent-ng-c1411651695=""
                            className="welcome-text"
                          >
                            <h2 _ngcontent-ng-c1411651695="">
                              Enter verification code
                            </h2>
                          </div>
                        )}
                        <button
                          onClick={() => setShowRegister(false)}
                          _ngcontent-ng-c1411651695=""
                          mat-mini-fab=""
                          color="primary"
                          mat-dialog-close=""
                          aria-label="Login Dialog Close Button"
                          className="close-btn mdc-fab mdc-fab--mini mat-mdc-mini-fab mat-primary mat-mdc-button-base"
                          mat-ripple-loader-uninitialized=""
                          mat-ripple-loader-class-name="mat-mdc-button-ripple"
                          type="button"
                        >
                          <span className="mat-mdc-button-persistent-ripple mdc-fab__ripple"></span>
                          <span
                            style={{
                              color: "black",
                              fontSize: "20px",
                              marginTop: "4px",
                            }}
                            _ngcontent-ng-c1411651695=""
                            role="img"
                            className="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color"
                            aria-hidden="true"
                            data-mat-icon-type="font"
                          >
                            close
                          </span>
                          <span className="mdc-button__label"></span>
                          <span className="mat-mdc-focus-indicator"></span>
                          <span className="mat-mdc-button-touch-target"></span>
                        </button>
                      </div>
                      <div
                        _ngcontent-ng-c1411651695=""
                        className="body-section ng-star-inserted"
                      >
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          _ngcontent-ng-c1411651695=""
                          className="ng-untouched ng-pristine ng-valid"
                        >
                          <div
                            _ngcontent-ng-c1411651695=""
                            className="login-form"
                          >
                            {Settings.otp && (
                              <>
                                <p
                                  _ngcontent-ng-c1411651695=""
                                  className="form-title ng-star-inserted"
                                >
                                  We have sent code to +91-{mobileNo}
                                </p>
                                <div
                                  _ngcontent-ng-c1411651695=""
                                  className="form-list ng-star-inserted"
                                >
                                  <mat-form-field
                                    _ngcontent-ng-c1411651695=""
                                    appearance="fill"
                                    className="mat-mdc-form-field ng-tns-c1205077789-4 mat-mdc-form-field-type-mat-input mat-form-field-appearance-fill mat-primary ng-untouched ng-pristine ng-valid ng-star-inserted"
                                  >
                                    <div className="mat-mdc-text-field-wrapper mdc-text-field ng-tns-c1205077789-4 mdc-text-field--filled mdc-text-field--no-label">
                                      <div className="mat-mdc-form-field-focus-overlay ng-tns-c1205077789-4 ng-star-inserted"></div>
                                      <div className="mat-mdc-form-field-flex ng-tns-c1205077789-4">
                                        <div className="mat-mdc-form-field-infix ng-tns-c1205077789-4">
                                          <input
                                            onChange={(e) =>
                                              setUser({
                                                ...user,
                                                otp: e.target.value,
                                              })
                                            }
                                            _ngcontent-ng-c1411651695=""
                                            type="tel"
                                            matinput=""
                                            maxLength={4}
                                            appnumericonly=""
                                            formcontrolname="otp"
                                            placeholder="****"
                                            className="mat-mdc-input-element ng-tns-c1205077789-4 ng-untouched ng-pristine ng-valid mat-mdc-form-field-input-control mdc-text-field__input cdk-text-field-autofill-monitored"
                                            id="mat-input-1"
                                            aria-invalid="false"
                                            aria-required="false"
                                          />
                                        </div>
                                      </div>
                                      <div
                                        matformfieldlineripple=""
                                        className="mdc-line-ripple ng-tns-c1205077789-4 mdc-line-ripple--deactivating ng-star-inserted"
                                      ></div>
                                    </div>
                                    <div className="mat-mdc-form-field-subscript-wrapper mat-mdc-form-field-bottom-align ng-tns-c1205077789-4">
                                      <div
                                        className="mat-mdc-form-field-hint-wrapper ng-tns-c1205077789-4 ng-trigger ng-trigger-transitionMessages ng-star-inserted"
                                        style={{
                                          opacity: 1,
                                          transform: "translateY(0%)",
                                        }}
                                      >
                                        <div className="mat-mdc-form-field-hint-spacer ng-tns-c1205077789-4"></div>
                                      </div>
                                    </div>
                                  </mat-form-field>
                                </div>
                              </>
                            )}

                            {/* <p
                              _ngcontent-ng-c1411651695=""
                              className="form-title ng-star-inserted"
                            >
                              Username
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
                                        onChange={(e) => {
                                          setUser({
                                            ...user,
                                            userName: e.target.value,
                                          });
                                        }}
                                        _ngcontent-ng-c2806737617=""
                                        type="text"
                                        appnumericonly=""
                                        matinput=""
                                        placeholder="Username"
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
                            </div> */}

                            <p
                              _ngcontent-ng-c1411651695=""
                              className="form-title ng-star-inserted"
                            >
                              Password
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
                                        onChange={(e) => {
                                          setUser({
                                            ...user,
                                            password: e.target.value,
                                          });
                                        }}
                                        _ngcontent-ng-c2806737617=""
                                        type="text"
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
                            <p
                              _ngcontent-ng-c1411651695=""
                              className="form-title ng-star-inserted"
                            >
                              Referral Code
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
                                        onChange={(e) => {
                                          setUser({
                                            ...user,
                                            referralCode: e.target.value,
                                          });
                                        }}
                                        readOnly={referralCode}
                                        _ngcontent-ng-c2806737617=""
                                        type="text"
                                        appnumericonly=""
                                        matinput=""
                                        placeholder="Referral"
                                        formcontrolname="phone"
                                        className="mat-mdc-input-element ng-tns-c1205077789-3 ng-untouched ng-pristine ng-invalid mat-mdc-form-field-input-control mdc-text-field__input cdk-text-field-autofill-monitored"
                                        id="mat-input-0"
                                        aria-required="true"
                                        defaultValue={referralCode}
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
                            <div
                              _ngcontent-ng-c1411651695=""
                              className="form-btn"
                            >
                              <button
                                _ngcontent-ng-c1411651695=""
                                type="submit"
                                className="btn secondary-btn"
                              >
                                Register
                              </button>
                            </div>
                            <div
                              _ngcontent-ng-c1411651695=""
                              className="form-links"
                            ></div>
                          </div>
                          <div
                            _ngcontent-ng-c1411651695=""
                            className="footer-section"
                          >
                            <div
                              _ngcontent-ng-c1411651695=""
                              className="footer-btn full-btn"
                            ></div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
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
  );
};

export default Registration;
