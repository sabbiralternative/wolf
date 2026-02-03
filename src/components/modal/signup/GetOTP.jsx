/* eslint-disable react/no-unknown-property */
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";
import { API, Settings } from "../../../api";
import useContextState from "../../../hooks/useContextState";
import Success from "../../ui/Notification/Success";
// import getOtpOnWhatsapp from "../../../utils/getOtpOnWhatsapp";
import toast from "react-hot-toast";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const GetOTP = ({
  setShowOTP,
  setShowRegister,
  mobileNo,
  setMobileNo,
  setOrderId,
}) => {
  const { logo, token } = useContextState();
  const [err, setErr] = useState("");
  /* Close otp modal click outside */
  const OTPRef = useRef();
  useCloseModalClickOutside(OTPRef, () => {
    setShowOTP(false);
  });

  const getOtp = async (e) => {
    e.preventDefault();
    /* Get Otp based on settings*/
    if (Settings.otp) {
      const res = await AxiosSecure.post(API.otp, { mobile: mobileNo });
      const data = res.data;

      if (data?.success) {
        /* Close opt modal */
        setOrderId({
          orderId: data?.result?.orderId,
          otpMethod: "sms",
        });
        toast.success(data?.result?.message);
        setShowOTP(false);
        /* Show register modal after success */
        setShowRegister(true);
      } else {
        setErr(data?.error?.errorMessage);
      }
    } else {
      /* Close otp modal */
      setShowOTP(false);
      /* show register modal */
      setShowRegister(true);
    }
  };

  // const handleGetOtpOnWhatsapp = async () => {
  //   await getOtpOnWhatsapp(mobileNo, setOrderId, setShowRegister);
  // };

  const handleMobileNo = (e) => {
    if (e.target.value.length <= 10) {
      setMobileNo(e.target.value);
    }
  };
  const getWhatsappOTP = (link) => {
    window.open(link, "_blank");
  };
  return (
    <div className="cdk-overlay-container">
      {err && <Success message={err} setMessage={setErr} success={false} />}
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
          ref={OTPRef}
        >
          <div
            className="cdk-visually-hidden cdk-focus-trap-anchor"
            aria-hidden="true"
          ></div>
          <div
            className="mat-mdc-dialog-container mat-dialog-container mdc-dialog cdk-dialog-container mdc-dialog--open"
            id="LoginComponent"
            role="dialog"
            aria-modal="true"
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
                          <img
                            _ngcontent-ng-c2806737617=""
                            alt="logo"
                            src={logo}
                            className="ng-star-inserted"
                          />
                        </div>
                        {/* <div
                          _ngcontent-ng-c2806737617=""
                          className="welcome-text"
                        >
                          <h2
                            _ngcontent-ng-c2806737617=""
                            className="notranslate"
                          >
                            Signup
                          </h2>
                        </div> */}
                        <button
                          onClick={() => setShowOTP(false)}
                          _ngcontent-ng-c2806737617=""
                          mat-mini-fab=""
                          color="primary"
                          mat-dialog-close=""
                          aria-label="Login Dialog Close Button"
                          className="close-btn mdc-fab mdc-fab--mini mat-mdc-mini-fab mat-primary mat-mdc-button-base"
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
                            _ngcontent-ng-c2806737617=""
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
                          <span className="mat-ripple mat-mdc-button-ripple"></span>
                        </button>
                      </div>
                      <div
                        _ngcontent-ng-c2806737617=""
                        className="body-section ng-star-inserted"
                        style={{ paddingBottom: "20px" }}
                      >
                        <form
                          onSubmit={getOtp}
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
                              Mobile Number
                            </p>
                            <div
                              _ngcontent-ng-c2806737617=""
                              className="form-list"
                            >
                              <div
                                _ngcontent-ng-c2806737617=""
                                className="mat-mdc-form-field mat-form-field  select-menu  mat-mdc-form-field-type-mat-select mat-form-field-appearance-fill mat-primary ng-untouched ng-pristine ng-valid ng-star-inserted"
                              >
                                <div className="mat-mdc-text-field-wrapper mdc-text-field  mdc-text-field--filled mdc-text-field--no-label">
                                  <div className="mat-mdc-form-field-focus-overlay  ng-star-inserted"></div>
                                  <div className="mat-mdc-form-field-flex ">
                                    <div className="mat-mdc-form-field-infix ">
                                      <img
                                        _ngcontent-ng-c2806737617=""
                                        alt=""
                                        className=""
                                        src="/assets/img/India.svg"
                                      />
                                      <p
                                        _ngcontent-ng-c2806737617=""
                                        className=""
                                      >
                                        +91
                                      </p>
                                      <div
                                        _ngcontent-ng-c2806737617=""
                                        role="combobox"
                                        aria-autocomplete="none"
                                        aria-haspopup="listbox"
                                        ngskiphydration=""
                                        formcontrolname="dialCode"
                                        className="mat-mdc-select ng-tns-c3393473648-2 mat-select  mat-mdc-select-required ng-untouched ng-pristine ng-valid ng-star-inserted"
                                        aria-labelledby="mat-select-value-1"
                                        id="mat-select-0"
                                        aria-expanded="false"
                                        aria-required="true"
                                        aria-disabled="false"
                                        aria-invalid="false"
                                      >
                                        <div
                                          cdk-overlay-origin=""
                                          className="mat-mdc-select-trigger ng-tns-c3393473648-2"
                                        >
                                          <div
                                            className="mat-mdc-select-value ng-tns-c3393473648-2"
                                            id="mat-select-value-1"
                                          >
                                            <span className="mat-mdc-select-value-text ng-tns-c3393473648-2 ng-star-inserted">
                                              <span className="mat-mdc-select-min-line ng-tns-c3393473648-2 ng-star-inserted">
                                                +91 India
                                              </span>
                                            </span>
                                          </div>
                                          <div className="mat-mdc-select-arrow-wrapper ng-tns-c3393473648-2"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="mat-mdc-form-field-subscript-wrapper mat-mdc-form-field-bottom-align ">
                                  <div
                                    className="mat-mdc-form-field-hint-wrapper  ng-trigger ng-trigger-transitionMessages ng-star-inserted"
                                    style={{
                                      opacity: 1,
                                      transform: "translateY(0%)",
                                    }}
                                  >
                                    <div className="mat-mdc-form-field-hint-spacer "></div>
                                  </div>
                                </div>
                              </div>
                              <div
                                _ngcontent-ng-c2806737617=""
                                appearance="fill"
                                className="mat-mdc-form-field mat-form-field  example-full-width ng-tns-c1205077789-3 mat-mdc-form-field-type-mat-input mat-form-field-appearance-fill mat-primary ng-untouched ng-pristine ng-invalid ng-star-inserted"
                              >
                                <div className="mat-mdc-text-field-wrapper mdc-text-field ng-tns-c1205077789-3 mdc-text-field--filled mdc-text-field--no-label">
                                  <div className="mat-mdc-form-field-focus-overlay ng-tns-c1205077789-3 ng-star-inserted"></div>
                                  <div className="mat-mdc-form-field-flex ng-tns-c1205077789-3">
                                    <div className="mat-mdc-form-field-infix ng-tns-c1205077789-3">
                                      <input
                                        onChange={(e) => handleMobileNo(e)}
                                        value={mobileNo}
                                        _ngcontent-ng-c2806737617=""
                                        type="number"
                                        appnumericonly=""
                                        matinput=""
                                        placeholder="Enter Mobile number"
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
                                <div className="mat-mdc-form-field-subscript-wrapper mat-mdc-form-field-bottom-align ng-tns-c1205077789-3">
                                  <div
                                    className="mat-mdc-form-field-hint-wrapper ng-tns-c1205077789-3 ng-trigger ng-trigger-transitionMessages ng-star-inserted"
                                    style={{
                                      opacity: 1,
                                      transform: "translateY(0%)",
                                    }}
                                  >
                                    <div className="mat-mdc-form-field-hint-spacer ng-tns-c1205077789-3"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              _ngcontent-ng-c2806737617=""
                              className="form-btn"
                            >
                              <button
                                disabled={Settings.otp && mobileNo?.length < 10}
                                _ngcontent-ng-c2806737617=""
                                type="submit"
                                className="btn secondary-btn"
                              >
                                {Settings.otp
                                  ? " Get OTP On Message"
                                  : "Proceed"}
                              </button>
                              {Settings?.registrationWhatsapp &&
                                Settings?.whatsapplink &&
                                !token && (
                                  <>
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
                                      <button
                                        onClick={() =>
                                          getWhatsappOTP(Settings?.whatsapplink)
                                        }
                                        _ngcontent-ng-c2806737617=""
                                        type="button"
                                        className="btn secondary-btn ng-star-inserted"
                                      >
                                        Get OTP on WhatsApp
                                      </button>
                                    </div>
                                  </>
                                )}
                            </div>
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

export default GetOTP;
