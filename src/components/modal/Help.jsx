/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";
import useContextState from "../../hooks/useContextState";
import { motion } from "framer-motion";
import { Settings } from "../../api";
const Help = () => {
  const { setShowHelpModal } = useContextState();
  const helpModalRef = useRef();
  useCloseModalClickOutside(helpModalRef, () => {
    setShowHelpModal(false);
  });

  const handleNavigateSocialLink = (link) => {
    window.open(link, "_blank");
    setShowHelpModal(false);
  };

  return (
    <div className="cdk-overlay-container" style={{ zIndex: "2000" }}>
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
          className="cdk-overlay-pane help-dialog"
          style={{
            width: "calc(100% - 20px)",
            maxWidth: "500px",
            position: "static",
            marginBottom: "10px",
          }}
          ref={helpModalRef}
        >
          <div
            className="cdk-visually-hidden cdk-focus-trap-anchor"
            aria-hidden="true"
          ></div>
          <div
            className="mat-mdc-dialog-container mdc-dialog cdk-dialog-container mdc-dialog--open"
            // style="--mat-dialog-transition-duration: 150ms;"
            id="mat-mdc-dialog-0"
            role="dialog"
            aria-modal="true"
          >
            <div className="mdc-dialog__container">
              <div className="mat-mdc-dialog-surface mdc-dialog__surface">
                <div _nghost-ng-c1325205117="" className="ng-star-inserted">
                  <div _ngcontent-ng-c1325205117="" className="help-modal">
                    <div _ngcontent-ng-c1325205117="" className="modal-header">
                      <div>
                        <h2 _ngcontent-ng-c1325205117="">Help</h2>
                        <p _ngcontent-ng-c1325205117="">
                          Need Help! Feel free to contact.
                        </p>
                      </div>
                      <button
                        onClick={() => setShowHelpModal(false)}
                        _ngcontent-ng-c1325205117=""
                        mat-button=""
                        mat-dialog-close=""
                        className="modal-close-btn mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base"
                        mat-ripple-loader-class-name="mat-mdc-button-ripple"
                        type="button"
                      >
                        <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                        <span
                          style={{
                            marginTop: "2px",
                            marginLeft: "4.5px",
                            color: "white",
                            fontWeight: "600",
                          }}
                          _ngcontent-ng-c1325205117=""
                          role="img"
                          className="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color"
                          aria-hidden="true"
                          data-mat-icon-type="font"
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
                    <div _ngcontent-ng-c1325205117="" className="modal-body">
                      <div
                        _ngcontent-ng-c1325205117=""
                        className="help-page-wrap"
                      >
                        <button
                          _ngcontent-ng-c1325205117=""
                          type="button"
                          className="btn secondary-btn"
                          style={{ display: "none" }}
                        >
                          {" "}
                          Chat with us now{" "}
                          <span
                            _ngcontent-ng-c1325205117=""
                            role="img"
                            className="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color"
                            aria-hidden="true"
                            data-mat-icon-type="font"
                          >
                            {" "}
                            forum{" "}
                          </span>
                        </button>
                        <button
                          onClick={() =>
                            handleNavigateSocialLink(Settings?.link)
                          }
                          _ngcontent-ng-c1325205117=""
                          type="button"
                          className="btn secondary-btn ng-star-inserted"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "20px",
                          }}
                        >
                          <span> Chat with us on </span>
                          <img
                            style={{ height: "30px", objectFit: "contain" }}
                            _ngcontent-ng-c1325205117=""
                            alt="WhatsApp Icon"
                            src="/assets/img/wp_support.webp"
                          />
                        </button>
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

export default Help;
