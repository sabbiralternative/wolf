/* eslint-disable react/no-unknown-property */
import { motion } from "framer-motion";
import { useRef } from "react";
import { Settings } from "../../../api";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";
import { GrAndroid } from "react-icons/gr";
import assets from "../../../assets";

const DownloadAPK = ({ setShowAPKModal }) => {
  const modalRef = useRef();
  useCloseModalClickOutside(modalRef, () => {
    closeModal();
  });

  const closeModal = () => {
    sessionStorage.setItem("apk_modal_shown", true);
    setShowAPKModal(false);
  };

  const handleDownload = (e) => {
    e.preventDefault();
    const fileUrl = Settings.apkLink;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "site.apk");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    closeModal();
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
          ref={modalRef}
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
            maxHeight: "500px",
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
              <div
                className="mat-mdc-dialog-surface mdc-dialog__surface"
                style={{ borderRadius: "30px" }}
              >
                <div _nghost-ng-c1372444345="" className="ng-star-inserted">
                  <div
                    _ngcontent-ng-c1372444345=""
                    className="add-bank-modal"
                    style={{ position: "relative" }}
                  >
                    <button
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "-5px",
                        zIndex: 99999,
                      }}
                      onClick={closeModal}
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
                          color: "black",
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
                    <form
                      _ngcontent-ng-c1372444345=""
                      className="ng-untouched ng-pristine ng-invalid"
                    >
                      <div
                        _ngcontent-ng-c1372444345=""
                        className="modal-body"
                        style={{
                          padding: "0px",
                        }}
                      >
                        <div
                          _ngcontent-ng-c1372444345=""
                          className="form-wrap"
                          style={{ marginTop: "0px" }}
                        >
                          <div
                            className="modal-body"
                            style={{ width: "100%", padding: "0px" }}
                          >
                            <div className="promo-card">
                              <header className="promo-header">
                                <div className="header-content">
                                  <img
                                    src={assets.install_android}
                                    alt="install_android"
                                  />
                                  <h1 className="main-title">
                                    Download APK for Premium Gaming Experience
                                  </h1>
                                </div>
                              </header>

                              <main className="promo-body">
                                <p className="intro-text">
                                  Kabhi-kabhi website slow ho sakti hai ya link
                                  update ho jata hai, lekin hamara Official App
                                  aapko hamesha connected rakhega 🚀
                                </p>

                                <h2 className="benefits-title">
                                  App ke saath aapko milega:
                                </h2>

                                <ul className="benefits-list">
                                  <li>
                                    <strong>24×7 Instant Access</strong> – Har
                                    waqt khelo bina rukawat
                                  </li>
                                  <li>
                                    <strong>2X Faster Speed</strong> – Website
                                    se bhi double fast loading
                                  </li>
                                  <li>
                                    <strong>Secure Login</strong> – Aapka data
                                    hamesha safe & protected
                                  </li>
                                  <li>
                                    <strong>Non-Stop Gaming</strong> – No
                                    waiting, no interruptions
                                  </li>
                                </ul>

                                <p className="closing-text">
                                  Yehi wajah hai ki sabse zyada serious players
                                  App prefer karte hain. Aap bhi join karo unme
                                  aur pao ek premium lifestyle experience 💎
                                </p>

                                <a
                                  onClick={handleDownload}
                                  className="download-button"
                                >
                                  <GrAndroid className="android-icon" />
                                  <span>Download Official App Now ↓</span>
                                </a>
                              </main>
                            </div>
                          </div>
                        </div>
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

export default DownloadAPK;
