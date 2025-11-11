/* eslint-disable react/no-unknown-property */
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";
import { API, Settings } from "../../api";
import { jwtDecode } from "jwt-decode";
import { AxiosSecure } from "../../lib/AxiosSecure";
import useContextState from "../../hooks/useContextState";
import toast from "react-hot-toast";
const AddUSDTAccount = ({
  setShowUSDTModal,
  setSuccessCrudMsg,
  refetchBankData,
  setErrCrudMsg,
  refetchWithdrawData,
}) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [mobile, setMobile] = useState(null);
  const { token } = useContextState();
  const [orderId, setOrderId] = useState(null);
  const [timer, setTimer] = useState(null);
  const [usdtDetails, setUsdtDetails] = useState({
    otp: "",
    usdt_type: "",
    wallet_address: "",
  });
  const addUSDTRef = useRef();
  useCloseModalClickOutside(addUSDTRef, () => {
    setShowUSDTModal(false);
  });

  const handleAddUSDTAccount = async (e) => {
    e.preventDefault();

    if (mobile && !usdtDetails.otp && Settings.otp) {
      return toast.error("Please enter otp to add new account");
    }
    let payload = {
      wallet_address: usdtDetails.wallet_address,
      usdt_type: usdtDetails.usdt_type,
      type: "addUSDTAccount",
    };
    if (mobile) {
      payload.mobile = mobile;
      payload.otp = usdtDetails.otp;
      payload.orderId = orderId;
    }

    const res = await AxiosSecure.post(API.bankAccount, payload);
    const data = res?.data;
    if (data?.success) {
      setSuccessCrudMsg(data?.result?.message);
      if (refetchBankData) {
        refetchBankData();
      }
      if (refetchWithdrawData) {
        refetchWithdrawData();
      }
      setShowUSDTModal(false);
    } else {
      setErrCrudMsg(data?.result?.message);
    }
  };

  const validateForm = (usdtDetails) => {
    const isUSDTTypeFilled = usdtDetails.usdt_type.trim() !== "";
    const isWalletAddressFilled = usdtDetails.wallet_address.trim() !== "";
    const isOTPFilled = mobile ? usdtDetails.otp.trim() !== "" : true;
    const isFormValid =
      isUSDTTypeFilled && isWalletAddressFilled && isOTPFilled;
    setIsFormValid(isFormValid);
  };

  useEffect(() => {
    validateForm(usdtDetails);
  }, [usdtDetails]);

  const getOtp = async () => {
    const otpData = {
      mobile,
    };

    const res = await AxiosSecure.post(API.otp, otpData);
    const data = res.data;
    if (data?.success) {
      setTimer(60);
      setOrderId(data?.result?.orderId);
      toast.success(data?.result?.message);
    } else {
      toast.error(data?.error?.errorMessage);
    }
  };

  useEffect(() => {
    const getMobile = () => {
      const decode = jwtDecode(token);
      if (decode?.mobile) {
        setMobile(decode?.mobile);
      }
    };
    getMobile();
  }, [token]);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setTimer(null);
    }
  }, [timer]);

  const getOtpOnWhatsapp = async () => {
    const otpData = {
      mobile: mobile,
      type: "otpsend",
    };

    const res = await AxiosSecure.post(API.otpless, otpData);
    const data = res.data;

    if (data?.success) {
      toast.success(data?.result?.message);
    } else {
      toast.error(data?.error?.errorMessage);
    }
  };

  return (
    <div className="cdk-overlay-container">
      <div className="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>
      <div
        className="cdk-global-overlay-wrapper"
        dir="ltr"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <motion.div
          ref={addUSDTRef}
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
                      <h2 _ngcontent-ng-c1372444345="">Add USDT Account</h2>
                      <button
                        onClick={() => setShowUSDTModal(false)}
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
                      onSubmit={handleAddUSDTAccount}
                      _ngcontent-ng-c1372444345=""
                      className="ng-untouched ng-pristine ng-invalid"
                    >
                      <div _ngcontent-ng-c1372444345="" className="modal-body">
                        <div _ngcontent-ng-c1372444345="" className="form-wrap">
                          <div
                            _ngcontent-ng-c1372444345=""
                            className="input-wrap"
                          >
                            <label _ngcontent-ng-c1372444345="">
                              USDT Type*
                            </label>{" "}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                backgroundColor: "var(--grey-00)",
                                borderRadius: "10px",
                                paddingLeft: "8px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "5px",
                                }}
                              >
                                <p style={{ margin: "0px" }}>BEP20</p>
                                <input
                                  onChange={(e) => {
                                    setUsdtDetails({
                                      ...usdtDetails,
                                      usdt_type: e.target.value,
                                    });
                                  }}
                                  _ngcontent-ng-c1372444345=""
                                  type="radio"
                                  name="usdt-type"
                                  className="ifsc-input ng-untouched ng-pristine ng-invalid"
                                  value="BEP20"
                                />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "5px",
                                }}
                              >
                                <p style={{ margin: "0px" }}>TRC20</p>
                                <input
                                  onChange={(e) => {
                                    setUsdtDetails({
                                      ...usdtDetails,
                                      usdt_type: e.target.value,
                                    });
                                  }}
                                  _ngcontent-ng-c1372444345=""
                                  type="radio"
                                  name="usdt-type"
                                  className="ifsc-input ng-untouched ng-pristine ng-invalid"
                                  value="TRC20"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            _ngcontent-ng-c1372444345=""
                            className="input-wrap"
                          >
                            <label _ngcontent-ng-c1372444345="">
                              Wallet Address*
                            </label>{" "}
                            <input
                              onChange={(e) => {
                                setUsdtDetails({
                                  ...usdtDetails,
                                  wallet_address: e.target.value,
                                });
                              }}
                              _ngcontent-ng-c1372444345=""
                              placeholder="Enter Wallet Address"
                              type="text"
                              formcontrolname="ifscCode"
                              className="ifsc-input ng-untouched ng-pristine ng-invalid"
                            />
                          </div>
                          {mobile && Settings.otp && (
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
                                readOnly
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
                                  {Settings.otpWhatsapp && (
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
                                  )}

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
                          {mobile && Settings.otp && (
                            <div
                              style={{ position: "relative" }}
                              _ngcontent-ng-c1372444345=""
                              className="input-wrap"
                            >
                              <label _ngcontent-ng-c1372444345="">OTP*</label>{" "}
                              <input
                                onChange={(e) => {
                                  setUsdtDetails({
                                    ...usdtDetails,
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

export default AddUSDTAccount;
