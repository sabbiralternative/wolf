/* eslint-disable react/no-unknown-property */
import { motion } from "framer-motion";
import { useRef } from "react";
import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";
import useContextState from "../../hooks/useContextState";
import { useNavigate } from "react-router-dom";
import useGetCoin from "../../hooks/BankAccount/useGetCoin";
import useLanguage from "../../hooks/useLanguage";
import { languageValue } from "../../utils/language";
import { LanguageKey } from "../../constant/constant";
import toast from "react-hot-toast";
import useDepositBreakdown from "../../hooks/depositBreakdown";

const Deposit = ({ setSHowDeposit }) => {
  const { data } = useDepositBreakdown({ amount: 100 });
  const { valueByLanguage } = useLanguage();
  const { paymentAmount, setPaymentAmount } = useContextState();
  const withdrawRef = useRef();
  const navigate = useNavigate();
  useCloseModalClickOutside(withdrawRef, () => {
    setSHowDeposit(false);
  });

  const { depositData } = useGetCoin({
    type: "availableCoins",
  });

  const handleNavigateDeposit = (e) => {
    e.preventDefault();

    const floatAmount = parseFloat(paymentAmount);

    if (typeof floatAmount !== "number") {
      return toast.error("Please enter a valid number");
    }
    if (floatAmount) {
      if (data?.minimumDeposit && floatAmount < data?.minimumDeposit) {
        toast.error(`Minimum deposit amount is ${data?.minimumDeposit}`);
      } else {
        localStorage.setItem("paymentAmount", floatAmount);
        navigate("/profile/deposit");
        setSHowDeposit(false);
      }
    } else {
      return toast.error("Amount is required");
    }
  };

  return (
    <div className="cdk-overlay-container">
      <div className="cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing"></div>
      <div
        className="cdk-global-overlay-wrapper"
        dir="ltr"
        style={{ justifyContent: "center", alignItems: "flex-end" }}
      >
        <motion.div
          ref={withdrawRef}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1 }}
          id="cdk-overlay-2"
          className="cdk-overlay-pane dw-dialog"
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
            id="mat-mdc-dialog-0"
            role="dialog"
            aria-modal="true"
            // style="--mat-dialog-transition-duration: 150ms;"
          >
            <div className="mdc-dialog__container">
              <div className="mat-mdc-dialog-surface mdc-dialog__surface">
                <div _nghost-ng-c2000663781="" className="ng-star-inserted">
                  <div
                    _ngcontent-ng-c2000663781=""
                    className="transaction-modal ng-star-inserted"
                  >
                    <div _ngcontent-ng-c2000663781="" className="modal-header">
                      <h2 _ngcontent-ng-c2000663781="">
                        {" "}
                        {languageValue(valueByLanguage, LanguageKey.DEPOSIT)}
                      </h2>
                      <button
                        onClick={() => setSHowDeposit(false)}
                        _ngcontent-ng-c2000663781=""
                        mat-button=""
                        mat-dialog-close=""
                        className="modal-close-btn mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base"
                        mat-ripple-loader-class-name="mat-mdc-button-ripple"
                        type="button"
                      >
                        <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                        <span
                          style={{
                            marginLeft: "4.5px",
                            color: "white",
                            fontWeight: "600",
                          }}
                          _ngcontent-ng-c2000663781=""
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
                    <form
                      onSubmit={handleNavigateDeposit}
                      _ngcontent-ng-c2000663781=""
                      className="ng-untouched ng-pristine ng-invalid"
                    >
                      <div _ngcontent-ng-c2000663781="" className="modal-body">
                        <div _ngcontent-ng-c2000663781="" className="card-wrap">
                          <div
                            _ngcontent-ng-c2000663781=""
                            className="avl-bal show-bal"
                          >
                            <mat-label _ngcontent-ng-c2000663781="">
                              Available Balance
                            </mat-label>
                            <p
                              _ngcontent-ng-c2000663781=""
                              className="ng-star-inserted"
                            >
                              {depositData?.availableBalance}
                            </p>
                          </div>
                        </div>
                        <div _ngcontent-ng-c2000663781="" className="form-wrap">
                          <label _ngcontent-ng-c2000663781="">
                            Deposit Coins (Minimum deposit amount is{" "}
                            {data?.minimumDeposit})
                          </label>
                          <input
                            onChange={(e) => setPaymentAmount(e.target.value)}
                            _ngcontent-ng-c2000663781=""
                            placeholder="Enter Coins"
                            appnumericonly=""
                            type="number"
                            formcontrolname="coins"
                            className="ng-untouched ng-pristine ng-invalid"
                          />
                          {/* <p
                            _ngcontent-ng-c2000663781=""
                            className="note-message ng-star-inserted"
                          >
                            Minimum deposit amount is 100 coins
                          </p> */}
                        </div>
                      </div>
                      <div
                        _ngcontent-ng-c2000663781=""
                        className="modal-footer"
                      >
                        <button
                          disabled={
                            Number(paymentAmount) < Number(data?.minimumDeposit)
                          }
                          _ngcontent-ng-c2000663781=""
                          type="submit"
                          mat-button=""
                          className="btn secondary-btn mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base"
                          mat-ripple-loader-uninitialized=""
                          mat-ripple-loader-class-name="mat-mdc-button-ripple"
                        >
                          <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                          <span className="mdc-button__label">
                            Make Payment
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

export default Deposit;
