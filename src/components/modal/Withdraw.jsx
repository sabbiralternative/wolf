/* eslint-disable react/no-unknown-property */
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";
import { API } from "../../api";
import { TbRuler3 } from "react-icons/tb";
import { AxiosSecure } from "../../lib/AxiosSecure";
import useWithdrawBreakdown from "../../hooks/withdrawBreakdown";

const Withdraw = ({
  setSHowWithdraw,
  setWithdrawCoinErr,
  setWithdrawCoinSuccess,
  bankId,
  // refetchWithdrawData,
  withdrawData,
  setBankId,
}) => {
  const { data } = useWithdrawBreakdown();
  const [disable, setDisable] = useState(false);
  const [amount, setAmount] = useState("");
  const withdrawRef = useRef();
  useCloseModalClickOutside(withdrawRef, () => {
    setSHowWithdraw(false);
  });

  // useEffect(() => {
  //   refetchWithdrawData();
  // }, [refetchWithdrawData, bankId]);

  const handleCoinSubmit = async (e) => {
    e.preventDefault();
    setDisable(TbRuler3);
    if (amount?.length > 0 && bankId) {
      const bankData = {
        type: "withdrawCoins",
        amount: amount,
        bankId,
      };

      const { data } = await AxiosSecure.post(API.bankAccount, bankData);

      if (data?.success) {
        setWithdrawCoinSuccess(data?.result?.message);
        setSHowWithdraw(false);
      } else {
        setWithdrawCoinErr(data?.error?.errorMessage);
      }
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
          id="cdk-overlay-13"
          className="cdk-overlay-pane dw-dialog"
          style={{
            width: "calc(100% - 30px)",
            maxWidth: "500px",
            position: "static",
            marginBottom: "10px",
          }}
          ref={withdrawRef}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1 }}
        >
          <div
            className="cdk-visually-hidden cdk-focus-trap-anchor"
            aria-hidden="true"
          ></div>
          <div
            className="mat-mdc-dialog-container mdc-dialog cdk-dialog-container mdc-dialog--open"
            id="mat-mdc-dialog-4"
            role="dialog"
            aria-modal="true"
            //   style="--mat-dialog-transition-duration: 150ms;"
            aria-owns="mat-select-2-panel"
          >
            <div className="mdc-dialog__container">
              <div className="mat-mdc-dialog-surface mdc-dialog__surface">
                <div _nghost-ng-c2000663781="" className="ng-star-inserted">
                  <div
                    _ngcontent-ng-c2000663781=""
                    className="transaction-modal ng-star-inserted"
                  >
                    <div _ngcontent-ng-c2000663781="" className="modal-header">
                      <h2 _ngcontent-ng-c2000663781="">Withdraw</h2>
                      <button
                        onClick={() => setSHowWithdraw(false)}
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
                      onSubmit={handleCoinSubmit}
                      _ngcontent-ng-c2000663781=""
                      className="ng-invalid ng-touched ng-dirty"
                    >
                      <div _ngcontent-ng-c2000663781="" className="modal-body">
                        <div _ngcontent-ng-c2000663781="" className="card-wrap">
                          <div
                            _ngcontent-ng-c2000663781=""
                            className="avl-bal show-bal"
                          >
                            <span _ngcontent-ng-c2000663781="">
                              Available Balance
                            </span>
                            <p _ngcontent-ng-c2000663781="">
                              {withdrawData?.availableBalance}
                            </p>
                          </div>
                        </div>
                        <div
                          _ngcontent-ng-c2000663781=""
                          className="card-wrap ww-card-wrap"
                        >
                          <div
                            _ngcontent-ng-c2000663781=""
                            className="withdrawal-coins"
                          >
                            <p _ngcontent-ng-c2000663781="">
                              Withdrawable Coins:{" "}
                              {withdrawData?.withdrawableCoins}
                            </p>
                          </div>
                        </div>
                        <div _ngcontent-ng-c2000663781="" className="form-wrap">
                          <label _ngcontent-ng-c2000663781="">
                            Withdraw Coins
                          </label>
                          <input
                            onChange={(e) => setAmount(e.target.value)}
                            _ngcontent-ng-c2000663781=""
                            placeholder="Enter Coins"
                            appnumericonly=""
                            type="number"
                            formcontrolname="coins"
                            className="ng-pristine ng-invalid ng-touched"
                          />
                          <p
                            _ngcontent-ng-c2000663781=""
                            className="note-message ng-star-inserted"
                          >
                            Minimum withdrawal amount is{" "}
                            {data?.result?.minimumWithdraw} coins
                          </p>
                        </div>
                        <div
                          _ngcontent-ng-c2000663781=""
                          className="withdraw-bankDetails ng-star-inserted"
                        >
                          <div
                            _ngcontent-ng-c2000663781=""
                            className="bankDetails-list"
                          >
                            <div
                              _ngcontent-ng-c2000663781=""
                              className="pref-head"
                              style={{ display: "flex" }}
                            >
                              {" "}
                              <span style={{ width: "50%" }}>
                                {" "}
                                Default Bank
                              </span>
                              {/* <div
                                _ngcontent-ng-c2000663781=""
                                className="mat-mdc-form-field ng-tns-c1205077789-46 mat-mdc-form-field-type-mat-select mat-form-field-appearance-fill mat-primary ng-valid ng-star-inserted ng-touched ng-dirty"
                              >
                                <div className="mat-mdc-text-field-wrapper mdc-text-field ng-tns-c1205077789-46 mdc-text-field--filled mdc-text-field--no-label">
                                  <div className="mat-mdc-form-field-focus-overlay ng-tns-c1205077789-46 ng-star-inserted"></div>
                                  <div className="mat-mdc-form-field-flex ng-tns-c1205077789-46">
                                    <div className="mat-mdc-form-field-infix ng-tns-c1205077789-46">
                                      <div
                                        _ngcontent-ng-c2000663781=""
                                        role="combobox"
                                        aria-autocomplete="none"
                                        aria-haspopup="listbox"
                                        ngskiphydration=""
                                        panelclassName="select-preffered-bank"
                                        placeholder="Change Bank"
                                        formcontrolname="preferred_bank"
                                        className="mat-mdc-select ng-tns-c3393473648-47 ng-tns-c1205077789-46 ng-valid ng-star-inserted ng-touched ng-dirty mat-mdc-select-empty"
                                        aria-labelledby="mat-select-value-3"
                                        id="mat-select-2"
                                     
                                        aria-expanded="false"
                                        aria-required="false"
                                        aria-disabled="false"
                                        aria-invalid="false"
                                      >
                                        <div
                                          cdk-overlay-origin=""
                                          className="mat-mdc-select-trigger ng-tns-c3393473648-47"
                                        >
                                          <div
                                            className="mat-mdc-select-value ng-tns-c3393473648-47"
                                            id="mat-select-value-3"
                                          >
                                            <span className="mat-mdc-select-placeholder mat-mdc-select-min-line ng-tns-c3393473648-47 ng-star-inserted">
                                          
                                            </span>
                                          </div>
                                          <div className="mat-mdc-select-arrow-wrapper ng-tns-c3393473648-47">
                                            <div className="mat-mdc-select-arrow ng-tns-c3393473648-47">
                                              <svg
                                                viewBox="0 0 24 24"
                                                width="24px"
                                                height="24px"
                                                focusable="false"
                                                aria-hidden="true"
                                                className="ng-tns-c3393473648-47"
                                              ></svg>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    matformfieldlineripple=""
                                    className="mdc-line-ripple ng-tns-c1205077789-46 ng-star-inserted mdc-line-ripple--active mdc-line-ripple--deactivating"
                                  ></div>
                                </div>

                                <div className="mat-mdc-form-field-subscript-wrapper mat-mdc-form-field-bottom-align ng-tns-c1205077789-46">
                                  <div
                                    className="mat-mdc-form-field-hint-wrapper ng-tns-c1205077789-46 ng-trigger ng-trigger-transitionMessages ng-star-inserted"
                                    style={{
                                      opacity: "1",
                                      transform: "translateY(0%)",
                                    }}
                                  >
                                    <div className="mat-mdc-form-field-hint-spacer ng-tns-c1205077789-46"></div>
                                  </div>
                                </div>
                              </div> */}
                              <select
                                onChange={(e) => setBankId(e.target.value)}
                                style={{
                                  width: "50%",
                                  padding: "5px",
                                  borderRadius: "20px",
                                  fontSize: "10px",
                                }}
                                name=""
                                id=""
                              >
                                <option selected value="">
                                  Change Bank
                                </option>
                                {withdrawData?.allBanks?.map((item) => {
                                  return (
                                    <option
                                      key={item?.bankId}
                                      value={item?.bankId}
                                    >
                                      {item?.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <ul
                              _ngcontent-ng-c2000663781=""
                              className="bankinfo-list"
                            >
                              <li _ngcontent-ng-c2000663781="">
                                <label _ngcontent-ng-c2000663781="">
                                  {" "}
                                  Account Name
                                </label>
                                <p _ngcontent-ng-c2000663781="">
                                  {withdrawData?.defaultBank?.accountName}
                                </p>
                              </li>
                              <li _ngcontent-ng-c2000663781="">
                                <label _ngcontent-ng-c2000663781="">
                                  {" "}
                                  Account number
                                </label>
                                <p _ngcontent-ng-c2000663781="">
                                  {withdrawData?.defaultBank?.accountNumber}
                                </p>
                              </li>
                              <li _ngcontent-ng-c2000663781="">
                                <label _ngcontent-ng-c2000663781="">IFSC</label>
                                <p _ngcontent-ng-c2000663781="">
                                  {" "}
                                  {withdrawData?.defaultBank?.ifsc}
                                </p>
                              </li>
                              <li _ngcontent-ng-c2000663781="">
                                <label _ngcontent-ng-c2000663781="">
                                  Bank Name
                                </label>
                                <p _ngcontent-ng-c2000663781="">
                                  {" "}
                                  {withdrawData?.defaultBank?.bankName}
                                </p>
                              </li>
                              <li _ngcontent-ng-c2000663781="">
                                <label _ngcontent-ng-c2000663781="">
                                  Branch
                                </label>
                                <p _ngcontent-ng-c2000663781="">
                                  {withdrawData?.defaultBank?.bankBranch}
                                </p>
                              </li>
                              <li _ngcontent-ng-c2000663781="">
                                <label _ngcontent-ng-c2000663781="">
                                  UPI ID
                                </label>
                                <p _ngcontent-ng-c2000663781="">
                                  {withdrawData?.defaultBank?.upiId}
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div
                        _ngcontent-ng-c2000663781=""
                        className="modal-footer"
                      >
                        <button
                          disabled={
                            !amount ||
                            amount < data?.result?.minimumWithdraw ||
                            amount > data?.result?.mainWallet
                              ? true
                              : false
                          }
                          style={{
                            cursor: disable ? "not-allowed" : "pointer",
                          }}
                          _ngcontent-ng-c2000663781=""
                          mat-button=""
                          className="btn secondary-btn mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base"
                          mat-ripple-loader-class-name="mat-mdc-button-ripple"
                        >
                          <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                          <span className="mdc-button__label">
                            {" "}
                            Withdraw Coins
                          </span>
                          <span className="mat-mdc-focus-indicator"></span>
                          <span className="mat-mdc-button-touch-target"></span>
                          <span className="mat-ripple mat-mdc-button-ripple"></span>
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

export default Withdraw;
