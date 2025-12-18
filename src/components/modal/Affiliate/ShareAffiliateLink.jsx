/* eslint-disable react/no-unknown-property */
import { motion } from "framer-motion";
import { useRef } from "react";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";
import assets from "../../../assets";
import { handleCopyToClipBoard } from "../../../utils/handleCopyToClipBoard";
import { useGetIndex } from "../../../hooks";
import useGetSocialLink from "../../../hooks/useGetSocialLink";

const ShareAffiliateLink = ({ setShowShareAffiliateLink }) => {
  const { socialLink } = useGetSocialLink();
  const { data } = useGetIndex({
    type: "get_referral_code",
  });
  const ref = useRef();
  useCloseModalClickOutside(ref, () => {
    setShowShareAffiliateLink(false);
  });

  const handleNavigateToSocialLink = (link) => {
    window.open(link, "_blank");
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
              <div className="mat-mdc-dialog-surface mdc-dialog__surface">
                <div _nghost-ng-c1372444345="" className="ng-star-inserted">
                  <div _ngcontent-ng-c1372444345="" className="add-bank-modal">
                    <div _ngcontent-ng-c1372444345="" className="modal-header">
                      <h2 _ngcontent-ng-c1372444345="">
                        {" "}
                        Share Affiliate link or Code
                      </h2>
                      <button
                        onClick={() => setShowShareAffiliateLink(false)}
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
                      _ngcontent-ng-c1372444345=""
                      className="ng-untouched ng-pristine ng-invalid"
                    >
                      <div
                        _ngcontent-ng-c1372444345=""
                        className="modal-body"
                        style={{
                          padding: "0px 10px 10px 10px",
                        }}
                      >
                        <div
                          _ngcontent-ng-c1372444345=""
                          className="form-wrap"
                          style={{ marginTop: "0px" }}
                        >
                          <div className="modal-body" style={{ width: "100%" }}>
                            <div className="share-link-img-sec">
                              <img src={assets.share} alt="af-share-img" />
                            </div>
                            <div className="af-share-link-wrapper">
                              <p>Share Link</p>
                              <div className="af-share-link-sec">
                                <span>{data?.result?.link}</span>
                                <button
                                  onClick={() =>
                                    handleCopyToClipBoard(data?.result?.text)
                                  }
                                  className="thm-but btn-gradient"
                                >
                                  Copy
                                </button>
                              </div>
                            </div>
                            {(socialLink?.branchWhatsapplink ||
                              socialLink?.whatsapplink ||
                              socialLink?.instagramLink ||
                              socialLink?.telegramLink) && (
                              <div className="af-share-link-wrapper">
                                <div className="affilate-cmn-footer">
                                  <div className="shre-text-title">
                                    <p>Share this link via</p>
                                  </div>
                                  <div className="af-share-social-link-sec">
                                    {(socialLink?.branchWhatsapplink ||
                                      socialLink?.whatsapplink) && (
                                      <a
                                        onClick={() =>
                                          handleNavigateToSocialLink(
                                            socialLink?.branchWhatsapplink ||
                                              socialLink?.whatsapplink
                                          )
                                        }
                                      >
                                        <img
                                          src="data:image/webp;base64,UklGRmIEAABXRUJQVlA4WAoAAAAwAAAAIwAAIwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBIpwAAAAFnoKhtIzbXA7Dvtwg0IgJjVBfa6zac2NbmJh8dXHR8XHZAtbFoFLrNQuiwgfhxsVG9/buamf9X+Ij+TwCsx4boFoD7I2vESMi5dChizixex9EDIya2b3Q8DUCRcAbkkhXQS1LsSDx+yRaZLCxlp0Z2o7/ayG6V7JDJwpdssZON0UtSIJesACWZAeh4GgBinm94HUcPDCjODPbEtYT7Z4vA3TdEtwBWAFZQOCDEAQAAEAoAnQEqJAAkAD5tMJRHJCMiIScraIANiWwAsR/HeE+q/kBxAPc3e0TN14/U1tgPMB+yXrK+gDeAPQA6Ub++kU2BcTpZNHBVP8YGpxszvIw9qSCQHg6HuVAA5sw9WcUPSGl2av9kvX7vR3WwzsZcjp6Sq8zQ+au5ZAeyGUb1Qx+oEPx6OGWDhlJnPY5fzkiX/PTiqcmwW53p8FWbETKF17blSslQWFlpLzVqYZqPldlLLS/dZV/uzRw+CPLmXOBGJU9fnLr/8itDfVB7qnNI3GpWHiLrvk5lLMr8PWg7tBlh4QP34PJga49+/8XqiNlPnvCGFoXE62ek7kjZQV4yNtxXo7Gaa8YXZzhrOtAHe4Flnc26qUNh02x/lTUIG19BrUeTe5ph4IUiUKXCapze0VWusl3qf84jRJdGvW7ogPRthHX1rbIRgRuAIK9eD6ZB5BrXr/JmxU8sVPZaNPiWBTryT3bPZMHivakNj0C/nP67oxO2GpWvsl+55RnQPLUpwWhXGL+ruloMas4k11eCi4AzfNF+PNrVtZwmDW4w5GqL+JH6XLgBD15T4JSEADvNu6Y+xivU2XlsEs7N/+9CgPAAAAA="
                                          alt="whatsapp"
                                        />
                                      </a>
                                    )}
                                    {socialLink?.instagramLink && (
                                      <a
                                        onClick={() =>
                                          handleNavigateToSocialLink(
                                            socialLink?.instagramLink
                                          )
                                        }
                                      >
                                        <img
                                          src={"/assets/img/instagram.png"}
                                          alt="instagram-share"
                                        />
                                      </a>
                                    )}
                                    {socialLink?.telegramLink && (
                                      <a
                                        onClick={() =>
                                          handleNavigateToSocialLink(
                                            socialLink?.telegramLink
                                          )
                                        }
                                      >
                                        <img
                                          src="data:image/webp;base64,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"
                                          alt="telegram-share"
                                        />
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
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

export default ShareAffiliateLink;
