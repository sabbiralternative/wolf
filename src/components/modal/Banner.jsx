/* eslint-disable react/no-unknown-property */
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { useRef } from "react";
import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";

const Banner = ({ banner, setShowModal }) => {
  const modalRef = useRef();

  const closeModal = () => {
    setShowModal(false);
    localStorage.setItem("hasModalBeenShown", "true");
  };

  useCloseModalClickOutside(modalRef, () => {
    closeModal();
  });

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
              maxHeight: "320px",
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
              //   ref={modalRef}
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
                          className="body-section ng-star-inserted"
                          style={{ position: "relative" }}
                        >
                          <button
                            onClick={closeModal}
                            _ngcontent-ng-c2806737617=""
                            mat-mini-fab=""
                            color="primary"
                            mat-dialog-close=""
                            aria-label="Login Dialog Close Button"
                            className="close-btn mdc-fab mdc-fab--mini mat-mdc-mini-fab mat-primary mat-mdc-button-base"
                            mat-ripple-loader-class-name="mat-mdc-button-ripple"
                            type="button"
                            style={{
                              position: "absolute",
                              top: "5px",
                              right: "5px",
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
                              color="white"
                            />
                          </button>
                          <img
                            style={{ width: "100%", height: "100%" }}
                            src={banner}
                            alt=""
                          />
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
    </>
  );
};

export default Banner;
