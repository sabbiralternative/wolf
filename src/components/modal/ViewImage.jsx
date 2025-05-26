/* eslint-disable react/no-unknown-property */
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { useRef } from "react";
import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";

const ViewImage = ({ setImage, image }) => {
  const ref = useRef();
  useCloseModalClickOutside(ref, () => {
    setImage(null);
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
            ref={ref}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.1 }}
            id="cdk-overlay-0"
            className="cdk-overlay-pane login-dialog"
            style={{
              width: "calc(100% - 30px)",
              //   minHeight: "320px",
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
                        style={{
                          background: "transparent",
                          backgroundColor: "transparent",
                        }}
                      >
                        <div
                          style={{
                            height: "0px",
                            minHeight: "0px",
                            padding: "0px",
                          }}
                          _ngcontent-ng-c2806737617=""
                          className="login-header-section"
                        ></div>
                        <div
                          _ngcontent-ng-c2806737617=""
                          className="body-section ng-star-inserted"
                          style={{
                            background: "transparent",
                            backgroundColor: "transparent",
                            position: "relative",
                          }}
                        >
                          <button
                            onClick={() => setImage(null)}
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
                              position: "absolute",
                              right: "10px",
                              top: "10px",
                              background: "white",
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
                          <img
                            style={{ width: "100%", height: "100%" }}
                            src={image}
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

export default ViewImage;
