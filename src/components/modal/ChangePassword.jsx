/* eslint-disable react/no-unknown-property */
import { useRef, useState } from "react";
import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";
import { API } from "../../api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useContextState from "../../hooks/useContextState";
import { motion } from "framer-motion";
import useLanguage from "../../hooks/useLanguage";
import { languageValue } from "../../utils/language";
import { LanguageKey } from "../../constant/constant";
import { AxiosSecure } from "../../lib/AxiosSecure";

const ChangePassword = ({
  setShowChangePassModal,
  setErrorMessage,
  setSuccessMessage,
  warningRef,
}) => {
  const { valueByLanguage } = useLanguage();
  const { setGetToken } = useContextState();
  /* Close modal click outside */
  const changePassRef = useRef();
  useCloseModalClickOutside(changePassRef, () => {
    if (!warningRef.current) {
      setShowChangePassModal(false);
    }
  });
  const [passwordType, setPasswordType] = useState(true);
  const [newPasswordType, setNewPasswordType] = useState(true);
  const [newConfirmPasswordType, setNewConfirmPasswordType] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  /* Change password function */
  const onSubmit = async ({ password, newPassword, newPasswordConfirm }) => {
    const payload = {
      oldPassword: password,
      password: newPassword,
      passVerify: newPasswordConfirm,
    };
    const { data } = await AxiosSecure.post(API.changePassword, payload);

    if (data.success) {
      /* After success showing success message */
      setSuccessMessage(data?.result?.message);
      /* CLose modal */
      setShowChangePassModal(false);
      /* Logout and navigate home */
      setTimeout(() => {
        // handleLogOut();
        setGetToken((prev) => !prev);
        localStorage.removeItem("changePassword");
        navigate("/");
      }, 1000);
    } else {
      /* Showing error message during change password */
      setErrorMessage(data?.error?.errorMessage);
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
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1 }}
          id="cdk-overlay-4"
          className="cdk-overlay-pane change-password-dialog"
          style={{
            width: "calc(100% - 30px)",
            minHeight: "395px",
            maxWidth: "500px",
            position: "static",
            marginBottom: "10px",
          }}
          ref={changePassRef}
        >
          <div
            className="cdk-visually-hidden cdk-focus-trap-anchor"
            aria-hidden="true"
          ></div>
          <div
            className="mat-mdc-dialog-container mat-dialog-container mdc-dialog cdk-dialog-container mdc-dialog--open"
            id="mat-mdc-dialog-1"
            role="dialog"
            aria-modal="true"
          >
            <div className="mdc-dialog__container">
              <div className="mat-mdc-dialog-surface mdc-dialog__surface">
                <div _nghost-ng-c2641381007="" className="ng-star-inserted">
                  <div
                    _ngcontent-ng-c2641381007=""
                    className="change-password-modal"
                  >
                    <div _ngcontent-ng-c2641381007="" className="modal-header">
                      <h2 _ngcontent-ng-c2641381007="">
                        {" "}
                        {languageValue(
                          valueByLanguage,
                          LanguageKey.CHANGE_PASSWORD
                        )}
                      </h2>
                      <button
                        onClick={() => setShowChangePassModal(false)}
                        _ngcontent-ng-c2641381007=""
                        mat-button=""
                        mat-dialog-close=""
                        className="modal-close-btn mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base"
                        mat-ripple-loader-class-name="mat-mdc-button-ripple"
                        type="button"
                      >
                        <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                        <span
                          _ngcontent-ng-c2641381007=""
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
                      onSubmit={handleSubmit(onSubmit)}
                      _ngcontent-ng-c2641381007=""
                      className="ng-untouched ng-pristine ng-invalid"
                    >
                      <div _ngcontent-ng-c2641381007="" className="modal-body">
                        <div _ngcontent-ng-c2641381007="" className="form-wrap">
                          <div
                            _ngcontent-ng-c2641381007=""
                            className="input-wrap"
                          >
                            <label _ngcontent-ng-c2641381007="">
                              Old Password*
                            </label>
                            <input
                              {...register("password", { required: true })}
                              _ngcontent-ng-c2641381007=""
                              placeholder="Enter Old Password"
                              formcontrolname="password"
                              name="password"
                              type={passwordType ? "password" : "text"}
                              className="ng-untouched ng-pristine ng-invalid"
                            />
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => setPasswordType((prev) => !prev)}
                              _ngcontent-ng-c2641381007=""
                              role="img"
                              className="mat-icon notranslate material-icons pass-eye-icon mat-ligature-font mat-icon-no-color"
                              aria-hidden="true"
                              data-mat-icon-type="font"
                            >
                              visibility
                            </span>
                          </div>
                          <div
                            _ngcontent-ng-c2641381007=""
                            className="input-wrap"
                          >
                            <label _ngcontent-ng-c2641381007="">
                              New Password*
                            </label>
                            <input
                              {...register("newPassword", {
                                required: true,
                                minLength: 5,
                              })}
                              _ngcontent-ng-c2641381007=""
                              placeholder="Confirm password"
                              formcontrolname="confirmPassword"
                              type={newPasswordType ? "password" : "text"}
                              name="newPassword"
                              className="ng-untouched ng-pristine ng-invalid"
                            />
                            <span
                              onClick={() =>
                                setNewPasswordType((prev) => !prev)
                              }
                              style={{ cursor: "pointer" }}
                              _ngcontent-ng-c2641381007=""
                              role="img"
                              className="mat-icon notranslate material-icons pass-eye-icon mat-ligature-font mat-icon-no-color"
                              aria-hidden="true"
                              data-mat-icon-type="font"
                            >
                              visibility
                            </span>
                            {errors.newPassword?.type === "minLength" && (
                              <p
                                _ngcontent-ng-c2641381007=""
                                className="error ng-star-inserted"
                              >
                                {" "}
                                Password must be 5 character long.{" "}
                              </p>
                            )}
                          </div>
                          <div
                            _ngcontent-ng-c2641381007=""
                            className="input-wrap"
                          >
                            <label _ngcontent-ng-c2641381007="">
                              Confirm New Password*
                            </label>
                            <input
                              {...register("newPasswordConfirm", {
                                required: true,
                                minLength: 5,
                              })}
                              _ngcontent-ng-c2641381007=""
                              placeholder="Enter confirm password"
                              formcontrolname="confirmPassword"
                              type={
                                newConfirmPasswordType ? "password" : "text"
                              }
                              name="newPasswordConfirm"
                              className="ng-untouched ng-pristine ng-invalid"
                            />
                            <span
                              onClick={() =>
                                setNewConfirmPasswordType((prev) => !prev)
                              }
                              style={{ cursor: "pointer" }}
                              _ngcontent-ng-c2641381007=""
                              role="img"
                              className="mat-icon notranslate material-icons pass-eye-icon mat-ligature-font mat-icon-no-color"
                              aria-hidden="true"
                              data-mat-icon-type="font"
                            >
                              visibility
                            </span>
                            {errors.newPasswordConfirm?.type ===
                              "minLength" && (
                              <p
                                _ngcontent-ng-c2641381007=""
                                className="error ng-star-inserted"
                              >
                                {" "}
                                Password must be 5 character long.{" "}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        _ngcontent-ng-c2641381007=""
                        className="modal-footer"
                      >
                        <button
                          type="submit"
                          _ngcontent-ng-c2641381007=""
                          mat-button=""
                          className="btn secondary-btn mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base"
                          mat-ripple-loader-uninitialized=""
                          mat-ripple-loader-class-name="mat-mdc-button-ripple"
                        >
                          <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                          <span className="mdc-button__label"> Verify </span>
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

export default ChangePassword;
