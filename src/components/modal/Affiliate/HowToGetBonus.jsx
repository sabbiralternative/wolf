/* eslint-disable react/no-unknown-property */
import { motion } from "framer-motion";
import { useRef } from "react";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";

const HowToGetBonus = ({ setOpenGetBonusModal }) => {
  const ref = useRef();
  useCloseModalClickOutside(ref, () => {
    setOpenGetBonusModal(false);
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
                      <h2 _ngcontent-ng-c1372444345="">How to get bonus?</h2>
                      <button
                        onClick={() => setOpenGetBonusModal(false)}
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
                          <ul
                            className="affi-how-bonus-list affi-how-to-get-bonus"
                            data-v-4c49d924
                          >
                            <h5 data-v-4c49d924>
                              🧾 Affiliate Program – How It Works
                            </h5>
                            <li data-v-4c49d924>
                              Earn daily bonus by inviting users to play!
                            </li>
                            <h5 data-v-4c49d924>🎯 How to Add Users</h5>
                            <p data-v-4c49d924>
                              You can add users in two easy ways:
                            </p>
                            <h6 data-v-4c49d924> 1️⃣ Referral Link</h6>
                            <li data-v-4c49d924>
                              Your unique invitation link is shown on your
                              dashboard.
                            </li>
                            <li data-v-4c49d924>
                              Anyone who signs up using this link will be
                              automatically added to your team.
                            </li>
                            <li data-v-4c49d924>
                              You can copy, share, or download a QR code.
                            </li>
                            <h6 data-v-4c49d924> 2️⃣ Add New User (Manual)</h6>
                            <li data-v-4c49d924>
                              Tap on Add New User and fill in the user&apos;s
                              info.
                            </li>
                            <li data-v-4c49d924>
                              The user will instantly be created under your
                              downline.
                            </li>
                            <h5 data-v-4c49d924>
                              📊 Your Affiliate Panel Features
                            </h5>
                            <h6 data-v-4c49d924>🔹Dashboard</h6>
                            <li data-v-4c49d924>Total users added</li>
                            <li data-v-4c49d924>Total users who deposited</li>
                            <li data-v-4c49d924>Total commission earned</li>
                            <li data-v-4c49d924>Today’s top 5 losing users</li>
                            <li data-v-4c49d924>Referral link &amp; QR code</li>
                            <li data-v-4c49d924>Add user button</li>
                            <h6 data-v-4c49d924>🔹User List</h6>
                            <li data-v-4c49d924>See all your downline users</li>
                            <li data-v-4c49d924>
                              View their balance and registration date
                            </li>
                            <li data-v-4c49d924>
                              Tap Add New User to add more
                            </li>
                            <li data-v-4c49d924>
                              Filter users by registration date
                            </li>
                            <h6 data-v-4c49d924>🔹Profit &amp; Loss</h6>
                            <li data-v-4c49d924>
                              See user profit/loss by date range
                            </li>
                            <li data-v-4c49d924>
                              Breakdown by event (casino, sports, etc.)
                            </li>
                            <li data-v-4c49d924>
                              Total profit, total loss, and net P&amp;L
                            </li>
                            <li data-v-4c49d924>
                              This is used to calculate your daily bonus
                            </li>
                            <h6 data-v-4c49d924>🔹Reports</h6>
                            <li data-v-4c49d924>
                              View daily commission report
                            </li>
                            <li data-v-4c49d924>
                              Check how much bonus you earned each day
                            </li>
                            <li data-v-4c49d924>Filter by date range</li>
                            <h6 data-v-4c49d924>📌 Important Rules</h6>
                            <p data-v-4c49d924>
                              ✅ You earn commission only if your users lost
                              money overall for that day.
                            </p>
                            <p data-v-4c49d924>
                              ✅ Bonus is added daily after 2:00 AM
                              automatically.
                            </p>
                            <p data-v-4c49d924>
                              ✅ No commission if user total P&amp;L is positive
                              (i.e., users made profit).
                            </p>
                            <p data-v-4c49d924>
                              ✅ You can use both link and manual user addition
                              — both work the same.
                            </p>
                            <p data-v-4c49d924>
                              🚫 Don&apos;t misuse the system or create fake
                              users — this may result in suspension.
                            </p>
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

export default HowToGetBonus;
