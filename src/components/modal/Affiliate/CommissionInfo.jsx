/* eslint-disable react/no-unknown-property */
import { motion } from "framer-motion";
import { useRef } from "react";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";

const CommissionInfo = ({ setOpenCommissionModal }) => {
  const ref = useRef();
  useCloseModalClickOutside(ref, () => {
    setOpenCommissionModal(false);
  });

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
                      <h2 _ngcontent-ng-c1372444345="">
                        How to get commission?
                      </h2>
                      <button
                        onClick={() => setOpenCommissionModal(false)}
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
                        style={{ padding: "0px 10px 10px 10px" }}
                      >
                        <div
                          _ngcontent-ng-c1372444345=""
                          className="form-wrap"
                          style={{ marginTop: "0px" }}
                        >
                          <ul
                            data-v-4c49d924
                            className="affi-how-bonus-list affi-how-to-get-bonus"
                          >
                            <h5 data-v-4c49d924>💸 How You Earn Commission</h5>
                            <li data-v-4c49d924>
                              You get bonus of the total amount your users lose
                              every day based on below slabs.
                            </li>
                            <li data-v-4c49d924>
                              The system checks daily at 2:00 AM.
                            </li>
                            <li data-v-4c49d924>
                              If your users lost money overall, you get paid.
                            </li>
                            <li data-v-4c49d924>
                              If your users made profit, no bonus is given for
                              that day.
                            </li>
                            <li data-v-4c49d924>✅ Example:</li>
                            <div data-v-4c49d924 className="table-responsive">
                              <table data-v-4c49d924 className="tablecontant">
                                <thead
                                  data-v-4c49d924
                                  className="cmn-head thead-mainn"
                                >
                                  <tr data-v-4c49d924>
                                    <th data-v-4c49d924>User Range</th>
                                    <th data-v-4c49d924>Bonus (%)</th>
                                  </tr>
                                </thead>
                                <tbody data-v-4c49d924 className="datastabl">
                                  <tr data-v-4c49d924>
                                    <td data-v-4c49d924>1 - 10</td>
                                    <td data-v-4c49d924>1</td>
                                  </tr>
                                  <tr data-v-4c49d924>
                                    <td data-v-4c49d924>11 - 50</td>
                                    <td data-v-4c49d924>1</td>
                                  </tr>
                                  <tr data-v-4c49d924>
                                    <td data-v-4c49d924>51 - 100</td>
                                    <td data-v-4c49d924>1</td>
                                  </tr>
                                  <tr data-v-4c49d924>
                                    <td data-v-4c49d924>101 - 500</td>
                                    <td data-v-4c49d924>1</td>
                                  </tr>
                                  <tr data-v-4c49d924>
                                    <td data-v-4c49d924>501 - 100000</td>
                                    <td data-v-4c49d924>1</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </ul>
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

export default CommissionInfo;
