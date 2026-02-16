/* eslint-disable react/no-unknown-property */
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useIndex } from "../../../hooks";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";
import { API, Settings } from "../../../api";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const AddNewUser = ({ setShowAddNewUserModal }) => {
  const { mutate: addNewUser } = useIndex();
  const [mobile, setMobile] = useState(null);
  const [timer, setTimer] = useState(null);

  const ref = useRef();
  useCloseModalClickOutside(ref, () => {
    setShowAddNewUserModal(false);
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [userDetails, setUserDetails] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    selfPassword: "",
    otp: "",
  });

  /* Handle add bank function */
  const handleAddUser = async (e) => {
    e.preventDefault();

    if (mobile && !userDetails.otp && Settings.otp) {
      return toast.error("Please enter otp to add new account");
    }

    let payload = {
      username: userDetails.userId,
      password: userDetails.password,
      self_password: userDetails.selfPassword,
      mobile: mobile,
      otp: userDetails.otp,
      type: "add_affiliate",
    };

    addNewUser(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data?.result?.message);
          setShowAddNewUserModal(false);
        } else {
          toast.error(data?.result?.message);
        }
      },
      onError: (data) => {
        toast.error(data?.result?.message);
      },
    });
  };

  const validateForm = (userDetails) => {
    const isMobileFilled = mobile && mobile?.trim() !== "";
    const isOTPFilled = userDetails.otp.trim() !== "";
    const isUserIdFilled = userDetails.userId.trim() !== "";
    const isPasswordFilled = userDetails.password.trim() !== "";
    const isConfirmPasswordFilled = userDetails.confirmPassword.trim() !== "";
    const isSelfPasswordFilled = userDetails.selfPassword.trim() !== "";

    const isFormValid =
      (isPasswordFilled &&
        isConfirmPasswordFilled &&
        isSelfPasswordFilled &&
        isMobileFilled &&
        isOTPFilled) ||
      (isPasswordFilled &&
        isConfirmPasswordFilled &&
        isSelfPasswordFilled &&
        isUserIdFilled) ||
      (isPasswordFilled &&
        isConfirmPasswordFilled &&
        isSelfPasswordFilled &&
        isUserIdFilled &&
        isMobileFilled &&
        isOTPFilled);

    setIsFormValid(isFormValid);
  };

  useEffect(() => {
    validateForm(userDetails);
  }, [userDetails]);

  const getOtp = async () => {
    const otpData = {
      mobile,
    };

    const res = await AxiosSecure.post(API.otp, otpData);
    const data = res.data;
    if (data?.success) {
      setTimer(60);
      toast.success(data?.result?.message);
    } else {
      toast.error(data?.error?.errorMessage);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setTimer(null);
    }
  }, [timer]);

  // const getOtpOnWhatsapp = async () => {
  //   const otpData = {
  //     mobile: mobile,
  //     type: "otpsend",
  //   };

  //   const res = await AxiosSecure.post(API.otpless, otpData);
  //   const data = res.data;

  //   if (data?.success) {
  //     toast.success(data?.result?.message);
  //   } else {
  //     toast.error(data?.error?.errorMessage);
  //   }
  // };

  return (
    <div className="cdk-overlay-container">
      <div className="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>
      <div
        className="cdk-global-overlay-wrapper"
        dir="ltr"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <motion.div
          ref={ref}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1 }}
          id="cdk-overlay-1"
          className="cdk-overlay-pane add-bank-dialog"
          style={{
            width: "calc(100% - 30px)",
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
            id="mat-mdc-dialog-1"
            role="dialog"
            aria-modal="true"
            // style="--mat-dialog-transition-duration: 150ms;"
          >
            <div className="mdc-dialog__container">
              <div className="mat-mdc-dialog-surface mdc-dialog__surface">
                <div _nghost-ng-c1372444345="" className="ng-star-inserted">
                  <div _ngcontent-ng-c1372444345="" className="add-bank-modal">
                    <div _ngcontent-ng-c1372444345="" className="modal-header">
                      <h2 _ngcontent-ng-c1372444345="">Add New User</h2>
                      <button
                        onClick={() => setShowAddNewUserModal(false)}
                        _ngcontent-ng-c1372444345=""
                        mat-button=""
                        mat-dialog-close=""
                        className="modal-close-btn mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base"
                        mat-ripple-loader-class-name="mat-mdc-button-ripple"
                        type="button"
                      >
                        <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                        <span
                          _ngcontent-ng-c1372444345=""
                          role="img"
                          className="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color"
                          aria-hidden="true"
                          data-mat-icon-type="font"
                          style={{
                            marginLeft: "4.5px",
                            color: "white",
                            fontWeight: "600",
                          }}
                        >
                          {" "}
                          close{" "}
                        </span>
                        <span className="mdc-button__label"></span>
                        <span className="mat-mdc-focus-indicator"></span>
                        <span className="mat-mdc-button-touch-target"></span>
                        <span className="mat-ripple mat-mdc-button-ripple"></span>
                      </button>
                    </div>
                    <form
                      onSubmit={handleAddUser}
                      _ngcontent-ng-c1372444345=""
                      className="ng-untouched ng-pristine ng-invalid"
                    >
                      <div _ngcontent-ng-c1372444345="" className="modal-body">
                        <div _ngcontent-ng-c1372444345="" className="form-wrap">
                          {Settings.otp && (
                            <div
                              style={{ position: "relative" }}
                              _ngcontent-ng-c1372444345=""
                              className="input-wrap"
                            >
                              <label _ngcontent-ng-c1372444345="">
                                Mobile*
                              </label>{" "}
                              <input
                                value={mobile}
                                onChange={(e) => {
                                  if (e.target.value.length <= 10) {
                                    setMobile(e.target.value);
                                  }
                                }}
                                _ngcontent-ng-c1372444345=""
                                placeholder="Enter bank iFSC"
                                type="text"
                                formcontrolname="ifscCode"
                                className="ifsc-input ng-untouched ng-pristine ng-invalid"
                              />
                              {timer ? (
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "27px",
                                    right: "10px",
                                    border: "none",
                                    backgroundColor: "var(--primary-color)",
                                    borderRadius: "4px",
                                    padding: "6px 0px",
                                    width: "80px",
                                    color: "white",
                                    fontSize: "11px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  Retry in {timer}
                                </div>
                              ) : (
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "27px",
                                    right: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "3px",
                                  }}
                                >
                                  {/* {Settings.otpWhatsapp && (
                                    <button
                                      onClick={getOtpOnWhatsapp}
                                      style={{
                                        border: "none",
                                        backgroundColor: "var(--primary-color)",
                                        borderRadius: "4px",
                                        padding: "6px 0px",
                                        width: "110px",
                                        color: "white",
                                        fontSize: "11px",
                                      }}
                                      type="button"
                                    >
                                      Get OTP Whatsapp
                                    </button>
                                  )} */}

                                  <button
                                    onClick={getOtp}
                                    style={{
                                      border: "none",
                                      backgroundColor: "var(--primary-color)",
                                      borderRadius: "4px",
                                      padding: "6px 0px",
                                      width: "110px",
                                      color: "white",
                                      fontSize: "11px",
                                    }}
                                    type="button"
                                  >
                                    Get OTP Message
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                          {Settings.otp && (
                            <div
                              style={{ position: "relative" }}
                              _ngcontent-ng-c1372444345=""
                              className="input-wrap"
                            >
                              <label _ngcontent-ng-c1372444345="">OTP*</label>{" "}
                              <input
                                onChange={(e) => {
                                  setUserDetails({
                                    ...userDetails,
                                    otp: e.target.value,
                                  });
                                }}
                                _ngcontent-ng-c1372444345=""
                                placeholder="Enter OTP"
                                type="text"
                                formcontrolname="ifscCode"
                                className="ifsc-input ng-untouched ng-pristine ng-invalid"
                                maxLength={6}
                              />
                            </div>
                          )}

                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              justifyContent: "center",
                              alignItems: "center",
                              margin: "10px 0px",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                alignItems: "center",
                                display: "flex",
                                height: "1px",
                                background: "rgba(158, 158, 158, 0.2)",
                              }}
                            ></div>
                            <span
                              style={{
                                width: "100%",
                                color: "#000",
                                textAlign: "center",
                                fontFamily: "Inter",
                                fontSize: "0.75rem",
                                fontStyle: "normal",
                                fontWeight: 400,
                                lineHeight: "150%",
                                letterSpacing: "0.01875rem",
                              }}
                            >
                              OR{" "}
                            </span>
                            <div
                              style={{
                                width: "100%",
                                alignItems: "center",
                                display: "flex",
                                height: "1px",
                                background: "rgba(158, 158, 158, 0.2)",
                              }}
                            ></div>
                          </div>
                          <div
                            _ngcontent-ng-c1372444345=""
                            className="input-wrap"
                          >
                            <label _ngcontent-ng-c1372444345="">User Id*</label>{" "}
                            <input
                              onChange={(e) => {
                                setUserDetails({
                                  ...userDetails,
                                  userId: e.target.value,
                                });
                              }}
                              _ngcontent-ng-c1372444345=""
                              placeholder="Enter User Id"
                              type="text"
                              formcontrolname="ifscCode"
                              className="ifsc-input ng-untouched ng-pristine ng-invalid"
                            />
                          </div>
                          <div
                            _ngcontent-ng-c1372444345=""
                            className="input-wrap"
                          >
                            <label _ngcontent-ng-c1372444345="">
                              Password*
                            </label>{" "}
                            <input
                              onChange={(e) => {
                                setUserDetails({
                                  ...userDetails,
                                  password: e.target.value,
                                });
                              }}
                              _ngcontent-ng-c1372444345=""
                              placeholder="Enter Password"
                              type="password"
                              formcontrolname="ifscCode"
                              className="ifsc-input ng-untouched ng-pristine ng-invalid"
                            />
                          </div>
                          <div
                            _ngcontent-ng-c1372444345=""
                            className="input-wrap"
                          >
                            <label _ngcontent-ng-c1372444345="">
                              Confirm Password*
                            </label>{" "}
                            <input
                              onChange={(e) => {
                                setUserDetails({
                                  ...userDetails,
                                  confirmPassword: e.target.value,
                                });
                              }}
                              _ngcontent-ng-c1372444345=""
                              placeholder="Enter Confirm Password"
                              type="password"
                              formcontrolname="ifscCode"
                              className="ifsc-input ng-untouched ng-pristine ng-invalid"
                            />
                          </div>
                          <div
                            _ngcontent-ng-c1372444345=""
                            className="input-wrap"
                          >
                            <label _ngcontent-ng-c1372444345="">
                              Self Password*
                            </label>{" "}
                            <input
                              onChange={(e) => {
                                setUserDetails({
                                  ...userDetails,
                                  selfPassword: e.target.value,
                                });
                              }}
                              _ngcontent-ng-c1372444345=""
                              placeholder="Enter Self Password"
                              type="password"
                              formcontrolname="ifscCode"
                              className="ifsc-input ng-untouched ng-pristine ng-invalid"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        _ngcontent-ng-c1372444345=""
                        className="modal-footer"
                      >
                        <button
                          disabled={!isFormValid}
                          _ngcontent-ng-c1372444345=""
                          mat-button=""
                          type="submit"
                          className="btn secondary-btn mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base"
                          mat-ripple-loader-uninitialized=""
                          mat-ripple-loader-class-name="mat-mdc-button-ripple"
                        >
                          <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                          <span className="mdc-button__label">
                            {" "}
                            Add USDT Wallet{" "}
                          </span>
                          <span className="mat-mdc-focus-indicator"></span>
                          <span className="mat-mdc-button-touch-target"></span>
                        </button>
                      </div>
                    </form>
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

export default AddNewUser;
