import { Link, useNavigate } from "react-router-dom";
import useContextState from "../../hooks/useContextState";
import { API, Settings } from "../../api";
import { useEffect, useState } from "react";
import Withdraw from "../../components/modal/Withdraw";
import Success from "../../components/ui/Notification/Success";
import AddBank from "../../components/modal/AddBank";
import { handleLogOut } from "../../utils/handleLogOut";
import useLanguage from "../../hooks/useLanguage";
import { LanguageKey } from "../../constant/constant";
import { languageValue } from "../../utils/language";
import { AxiosSecure } from "../../lib/AxiosSecure";

/* eslint-disable react/no-unknown-property */
const LoggedInProfile = ({
  loginName,
  setShowChangePassModal,
  balanceData,
}) => {
  const { valueByLanguage } = useLanguage();
  const {
    isCheckedBonusToken,
    setSHowDeposit,
    setShowBonusRule,
    token,
    setTokenLoading,
    setGetToken,
    closePopupForForever,
  } = useContextState();
  const memberId = localStorage.getItem("memberId");
  const navigate = useNavigate();
  const [showWithdraw, setSHowWithdraw] = useState(false);
  const [withdrawCoinSuccess, setWithdrawCoinSuccess] = useState("");
  const [withdrawCoinErr, setWithdrawCoinErr] = useState("");
  const [withdrawData, setWithdrawData] = useState([]);
  /* Handle navigate in new tab */
  const handleNavigateSocialLink = (link) => {
    window.open(link, "_blank");
  };
  const [bankId, setBankId] = useState(null);

  /* Set default bank account id */
  useEffect(() => {
    setBankId(withdrawData?.defaultBank?.bankId);
  }, [withdrawData]);

  /* Handle Withdraw data */
  const handleWithdrawData = async () => {
    const bankData = {
      bankId,
      type: "withdrawForm",
    };
    const res = await AxiosSecure.post(API.bankAccount, bankData);
    const data = res?.data;
    if (data?.success) {
      setWithdrawData(data?.result);
      setSHowWithdraw(true);
    }
  };

  const handleLogout = () => {
    /* Logout function */
    handleLogOut();

    setTokenLoading(true);
    /* Get updated token from local storage */
    setGetToken((prev) => !prev);
    /* Navigate home page */
    navigate("/");
  };

  const navigateWhatsApp = (link) => {
    window.open(link, "_blank");
  };

  return (
    <>
      {/* Withdraw modal */}
      {showWithdraw && withdrawData?.allBanks?.length > 0 && (
        <Withdraw
          setSHowWithdraw={setSHowWithdraw}
          setWithdrawCoinErr={setWithdrawCoinErr}
          setWithdrawCoinSuccess={setWithdrawCoinSuccess}
          bankId={bankId}
          refetchWithdrawData={handleWithdrawData}
          setBankId={setBankId}
          withdrawData={withdrawData}
        />
      )}
      {/* Add bank modal */}
      {showWithdraw && withdrawData?.allBanks?.length < 1 && (
        <AddBank
          setErrCrudMsg={setWithdrawCoinErr}
          setShowAddBank={setSHowWithdraw}
          setSuccessCrudMsg={setWithdrawCoinSuccess}
        />
      )}

      {/* Withdraw and add bank state */}
      {withdrawCoinSuccess && (
        <Success
          message={withdrawCoinSuccess}
          setMessage={setWithdrawCoinSuccess}
          success={true}
        />
      )}
      {/* Withdraw and add bank state */}
      {withdrawCoinErr && (
        <Success
          message={withdrawCoinErr}
          setMessage={setWithdrawCoinErr}
          success={false}
        />
      )}
      <div _ngcontent-ng-c2865632707="" className="user-details-wrap">
        <div
          _ngcontent-ng-c2865632707=""
          className="user-details ng-star-inserted"
        >
          <div _ngcontent-ng-c2865632707="" className="contact-info">
            <p _ngcontent-ng-c2865632707="" className="notranslate">
              {loginName}
            </p>
            <p
              style={{ marginTop: "5px" }}
              _ngcontent-ng-c2865632707=""
              className="notranslate"
            >
              {languageValue(valueByLanguage, LanguageKey.USER_ID)} : {memberId}
            </p>

            <p _ngcontent-ng-c2865632707="" className="notranslate"></p>
          </div>
          <div _ngcontent-ng-c2865632707="" className="actions-wrap">
            {!isCheckedBonusToken && (
              <button
                onClick={() => setShowChangePassModal(true)}
                _ngcontent-ng-c2865632707=""
                mat-flat-button=""
                className="chng-psw-btn mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-unthemed mat-mdc-button-base ng-star-inserted"
                mat-ripple-loader-class-name="mat-mdc-button-ripple"
              >
                <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                <span className="mdc-button__label">
                  {" "}
                  {languageValue(valueByLanguage, LanguageKey.CHANGE_PASSWORD)}
                </span>
                <span className="mat-mdc-focus-indicator"></span>
                <span className="mat-mdc-button-touch-target"></span>
                <span className="mat-ripple mat-mdc-button-ripple"></span>
              </button>
            )}
          </div>
        </div>

        <div
          _ngcontent-ng-c2865632707=""
          className="user-bal-info ng-star-inserted"
        >
          <div _ngcontent-ng-c2865632707="" className="card-wrapper">
            <div _ngcontent-ng-c2865632707="" className="bal-cont">
              <div _ngcontent-ng-c2865632707="" className="avl-bal show-bal">
                <mat-label _ngcontent-ng-c2865632707="">
                  {" "}
                  {languageValue(valueByLanguage, LanguageKey.BALANCE)}
                </mat-label>
                <p _ngcontent-ng-c2865632707=""> {balanceData?.creditLimit}</p>
              </div>
            </div>
            {!isCheckedBonusToken && (
              <div _ngcontent-ng-c2865632707="" className="d-w-btn">
                {Settings.deposit && (
                  <button
                    onClick={() => {
                      setSHowDeposit(true);
                    }}
                    _ngcontent-ng-c2865632707=""
                    mat-flat-button=""
                    className="notranslate mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-unthemed mat-mdc-button-base"
                    mat-ripple-loader-class-name="mat-mdc-button-ripple"
                  >
                    <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                    <span className="mdc-button__label">
                      {" "}
                      {languageValue(valueByLanguage, LanguageKey.DEPOSIT)}
                    </span>
                    <span className="mat-mdc-focus-indicator"></span>
                    <span className="mat-mdc-button-touch-target"></span>
                    <span className="mat-ripple mat-mdc-button-ripple"></span>
                  </button>
                )}
                {Settings.withdraw && (
                  <button
                    onClick={() => navigate("/withdraw")}
                    _ngcontent-ng-c2865632707=""
                    mat-flat-button=""
                    className="notranslate mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-unthemed mat-mdc-button-base"
                    mat-ripple-loader-uninitialized=""
                    mat-ripple-loader-class-name="mat-mdc-button-ripple"
                  >
                    <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                    <span className="mdc-button__label">
                      {" "}
                      {languageValue(valueByLanguage, LanguageKey.WITHDRAW)}
                    </span>
                    <span className="mat-mdc-focus-indicator"></span>
                    <span className="mat-mdc-button-touch-target"></span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div _ngcontent-ng-c2865632707="" className="menu-items-wrap">
        <ul _ngcontent-ng-c2865632707="" className="smenu-wrap">
          {/* <li
            _ngcontent-ng-c2865632707=""
            className="smenu-item ng-star-inserted"
          >
            <a _ngcontent-ng-c2865632707="" className="smenu-link">
              <div _ngcontent-ng-c2865632707="" className="label-wrap">
                <img
                  _ngcontent-ng-c2865632707=""
                  alt="Menu Icon"
                  src="https://ss.manage63.com/bmk-wl/commonAssets/sidenav_alternate _no.svg"
                />
                <span _ngcontent-ng-c2865632707="">Alternate Number</span>
              </div>
            </a>
          </li>
          <li
            _ngcontent-ng-c2865632707=""
            className="smenu-item ng-star-inserted"
          >
            <a _ngcontent-ng-c2865632707="" className="smenu-link">
              <div _ngcontent-ng-c2865632707="" className="label-wrap">
                <img
                  _ngcontent-ng-c2865632707=""
                  alt="Menu Icon"
                  src="https://ss.manage63.com/bmk-wl/commonAssets/sidenav_email.svg"
                />
                <span _ngcontent-ng-c2865632707="">Add Email</span>
              </div>
            </a>
          </li>
          <li
            _ngcontent-ng-c2865632707=""
            className="smenu-item ng-star-inserted"
          >
            <a _ngcontent-ng-c2865632707="" className="smenu-link">
              <div _ngcontent-ng-c2865632707="" className="label-wrap">
                <img
                  _ngcontent-ng-c2865632707=""
                  alt="Menu Icon"
                  src="https://ss.manage63.com/bmk-wl/commonAssets/sidenav_profile.svg"
                />
                <span _ngcontent-ng-c2865632707="">Complete Profile</span>
              </div>
            </a>
          </li> */}
          {Settings?.branchWhatsapplink && (
            <li
              _ngcontent-ng-c2865632707=""
              routerlink="/rules"
              routerlinkactive="active-link"
              className="smenu-item"
            >
              <a
                onClick={() => navigateWhatsApp(Settings?.branchWhatsapplink)}
                _ngcontent-ng-c2865632707=""
                className="smenu-link"
              >
                <div _ngcontent-ng-c2865632707="" className="label-wrap">
                  <img
                    _ngcontent-ng-c2865632707=""
                    alt="Menu Icon"
                    src="/assets/img/whatsapp.png"
                  />
                  <span _ngcontent-ng-c2865632707="">
                    {" "}
                    {languageValue(
                      valueByLanguage,
                      LanguageKey.DEPOSIT_SUPPORT,
                    )}
                  </span>
                </div>
              </a>
            </li>
          )}
          <li _ngcontent-ng-c2865632707="" className="smenu-item">
            <Link
              to="/active-bets"
              _ngcontent-ng-c2865632707=""
              className="smenu-link"
            >
              <div _ngcontent-ng-c2865632707="" className="label-wrap">
                <img
                  _ngcontent-ng-c2865632707=""
                  alt="Menu Icon"
                  src="/assets/img/sidenav_activebets.svg"
                />
                <span _ngcontent-ng-c2865632707="">
                  {" "}
                  {languageValue(valueByLanguage, LanguageKey.ACTIVE_BETS)}
                </span>
              </div>
            </Link>
          </li>
          <li
            _ngcontent-ng-c2865632707=""
            routerlinkactive="active-link"
            className="smenu-item"
          >
            <Link
              to="/deposit-statement"
              _ngcontent-ng-c2865632707=""
              className="smenu-link"
            >
              <div _ngcontent-ng-c2865632707="" className="label-wrap">
                <img
                  _ngcontent-ng-c2865632707=""
                  alt="Menu Icon"
                  src="/assets/img/sidenav__ac_statement.svg"
                />
                <span _ngcontent-ng-c2865632707="">
                  {" "}
                  {languageValue(
                    valueByLanguage,
                    LanguageKey.DEPOSIT_STATEMENT,
                  )}
                </span>
              </div>
            </Link>
          </li>
          <li
            _ngcontent-ng-c2865632707=""
            routerlinkactive="active-link"
            className="smenu-item"
          >
            <Link
              to="/withdraw-statement"
              _ngcontent-ng-c2865632707=""
              className="smenu-link"
            >
              <div _ngcontent-ng-c2865632707="" className="label-wrap">
                <img
                  _ngcontent-ng-c2865632707=""
                  alt="Menu Icon"
                  src="/assets/img/sidenav__ac_statement.svg"
                />
                <span _ngcontent-ng-c2865632707="">
                  {" "}
                  {languageValue(
                    valueByLanguage,
                    LanguageKey.WITHDRAW_STATMENT,
                  )}
                </span>
              </div>
            </Link>
          </li>
          <li
            _ngcontent-ng-c2865632707=""
            routerlinkactive="active-link"
            className="smenu-item"
          >
            <Link
              to="/bonus-statement"
              _ngcontent-ng-c2865632707=""
              className="smenu-link"
            >
              <div _ngcontent-ng-c2865632707="" className="label-wrap">
                <img
                  _ngcontent-ng-c2865632707=""
                  alt="Menu Icon"
                  src="/assets/img/sidenav__ac_statement.svg"
                />
                <span _ngcontent-ng-c2865632707="">
                  {" "}
                  {languageValue(valueByLanguage, LanguageKey.BONUS_STATEMENT)}
                </span>
              </div>
            </Link>
          </li>

          <li
            _ngcontent-ng-c2865632707=""
            routerlinkactive="active-link"
            className="smenu-item"
          >
            <Link
              to="/my-bank-details"
              _ngcontent-ng-c2865632707=""
              className="smenu-link"
            >
              <div _ngcontent-ng-c2865632707="" className="label-wrap">
                <img
                  _ngcontent-ng-c2865632707=""
                  alt="Menu Icon"
                  src="/assets/img/sidenav_bank.svg"
                />
                <span _ngcontent-ng-c2865632707="">
                  {" "}
                  {languageValue(valueByLanguage, LanguageKey.MY_BANK_DETAILS)}
                </span>
              </div>
            </Link>
          </li>

          <li
            _ngcontent-ng-c2865632707=""
            routerlinkactive="active-link"
            className="smenu-item casino-hidden"
          >
            <a _ngcontent-ng-c2865632707="" className="smenu-link">
              <div _ngcontent-ng-c2865632707="" className="label-wrap">
                <img
                  _ngcontent-ng-c2865632707=""
                  alt="Menu Icon"
                  src="/assets/img/dice.svg"
                />
                <span _ngcontent-ng-c2865632707="">Casino Result</span>
              </div>
            </a>
          </li>
          <li
            _ngcontent-ng-c2865632707=""
            routerlink="/rules"
            routerlinkactive="active-link"
            className="smenu-item"
          >
            <Link
              to="/rules"
              _ngcontent-ng-c2865632707=""
              className="smenu-link"
            >
              <div _ngcontent-ng-c2865632707="" className="label-wrap">
                <img
                  _ngcontent-ng-c2865632707=""
                  alt="Menu Icon"
                  src="/assets/img/sidenav_rules.svg"
                />
                <span _ngcontent-ng-c2865632707="">
                  {" "}
                  {languageValue(valueByLanguage, LanguageKey.RULES)}
                </span>
              </div>
            </Link>
          </li>
          {Settings.bonus && (
            <li
              _ngcontent-ng-c2865632707=""
              routerlink="/rules"
              routerlinkactive="active-link"
              className="smenu-item"
            >
              <a
                onClick={() => setShowBonusRule(true)}
                _ngcontent-ng-c2865632707=""
                className="smenu-link"
              >
                <div _ngcontent-ng-c2865632707="" className="label-wrap">
                  <img
                    _ngcontent-ng-c2865632707=""
                    alt="Menu Icon"
                    src="/assets/img/sidenav_rules.svg"
                  />
                  <span _ngcontent-ng-c2865632707="">
                    {" "}
                    {languageValue(valueByLanguage, LanguageKey.BONUS_RULES)}
                  </span>
                </div>
              </a>
            </li>
          )}

          {Settings?.referral && (
            <li
              _ngcontent-ng-c2865632707=""
              routerlink="/affiliate"
              routerlinkactive="active-link"
              className="smenu-item"
            >
              <Link
                to="/affiliate"
                _ngcontent-ng-c2865632707=""
                className="smenu-link"
              >
                <div _ngcontent-ng-c2865632707="" className="label-wrap">
                  <img
                    _ngcontent-ng-c2865632707=""
                    alt="Menu Icon"
                    src="/assets/img/sidenav_rules.svg"
                  />
                  <span _ngcontent-ng-c2865632707=""> Affiliate</span>
                </div>
              </Link>
            </li>
          )}
          <li
            _ngcontent-ng-c2865632707=""
            routerlink="/affiliate"
            routerlinkactive="active-link"
            className="smenu-item"
          >
            <Link
              to="/promotions"
              _ngcontent-ng-c2865632707=""
              className="smenu-link"
            >
              <div _ngcontent-ng-c2865632707="" className="label-wrap">
                <img
                  _ngcontent-ng-c2865632707=""
                  alt="Menu Icon"
                  src="/assets/img/sidenav_rules.svg"
                />
                <span _ngcontent-ng-c2865632707=""> Promos & Bonus</span>
              </div>
            </Link>
          </li>
          <li
            _ngcontent-ng-c2865632707=""
            routerlink="/affiliate"
            routerlinkactive="active-link"
            className="smenu-item"
          >
            <Link
              to="/lossback-bonus"
              _ngcontent-ng-c2865632707=""
              className="smenu-link"
            >
              <div _ngcontent-ng-c2865632707="" className="label-wrap">
                <img
                  _ngcontent-ng-c2865632707=""
                  alt="Menu Icon"
                  src="/assets/img/sidenav_rules.svg"
                />
                <span _ngcontent-ng-c2865632707="">Lossback Bonus</span>
              </div>
            </Link>
          </li>
          {closePopupForForever && (
            <li
              _ngcontent-ng-c2865632707=""
              routerlink="/affiliate"
              routerlinkactive="active-link"
              className="smenu-item"
            >
              <Link
                to="/app-only-bonus"
                _ngcontent-ng-c2865632707=""
                className="smenu-link"
              >
                <div _ngcontent-ng-c2865632707="" className="label-wrap">
                  <img
                    _ngcontent-ng-c2865632707=""
                    alt="Menu Icon"
                    src="/assets/img/sidenav_rules.svg"
                  />
                  <span _ngcontent-ng-c2865632707="">App Only Bonus</span>
                </div>
              </Link>
            </li>
          )}

          {/* {Settings?.whatsapplink && (
            <li
              _ngcontent-ng-c2865632707=""
              routerlink="/rules"
              routerlinkactive="active-link"
              className="smenu-item"
            >
              <a
                onClick={() => navigateWhatsApp(Settings?.whatsapplink)}
                _ngcontent-ng-c2865632707=""
                className="smenu-link"
              >
                <div _ngcontent-ng-c2865632707="" className="label-wrap">
                  <img
                    _ngcontent-ng-c2865632707=""
                    alt="Menu Icon"
                    src="/assets/img/whatsapp.png"
                  />
                  <span _ngcontent-ng-c2865632707="">
                    {" "}
                    {languageValue(valueByLanguage, LanguageKey.ALL_SUPPORT)}
                  </span>
                </div>
              </a>
            </li>
          )} */}

          {token && (
            <li
              _ngcontent-ng-c2865632707=""
              routerlinkactive="active-link"
              className="smenu-item"
              onClick={handleLogout}
            >
              <a
                style={{ backgroundColor: "var(--primary-color)" }}
                _ngcontent-ng-c2865632707=""
                className="smenu-link"
              >
                <div
                  _ngcontent-ng-c2865632707=""
                  className="label-wrap"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  <span
                    style={{
                      textAlign: "center",
                      width: "100%",
                      color: "white",
                    }}
                    _ngcontent-ng-c2865632707=""
                  >
                    {languageValue(valueByLanguage, LanguageKey.LOGOUT)}
                  </span>
                </div>
              </a>
            </li>
          )}
        </ul>
        {Settings?.instagramLink || Settings?.telegramLink ? (
          <div
            _ngcontent-ng-c2865632707=""
            className="social-links-wrap ng-star-inserted"
          >
            <label _ngcontent-ng-c2865632707="">
              {" "}
              {languageValue(valueByLanguage, LanguageKey.JOIN_US)}
            </label>
            <div _ngcontent-ng-c2865632707="" className="social-links">
              {/* <a _ngcontent-ng-c2865632707="" className="ng-star-inserted">
                <img
                  _ngcontent-ng-c2865632707=""
                  alt=""
                  src="https://ss.manage63.com/bmk-wl/commonAssets/icon_dark_facebook.svg"
                />
              </a> */}
              {Settings?.instagramLink && (
                <a
                  onClick={() =>
                    handleNavigateSocialLink(Settings?.instagramLink)
                  }
                  _ngcontent-ng-c2865632707=""
                  className="ng-star-inserted"
                >
                  <img
                    _ngcontent-ng-c2865632707=""
                    alt=""
                    src="/assets/img/icon_dark_instagram.svg"
                  />
                </a>
              )}

              {Settings?.telegramLink && (
                <a
                  onClick={() =>
                    handleNavigateSocialLink(Settings?.telegramLink)
                  }
                  _ngcontent-ng-c2865632707=""
                  className="ng-star-inserted"
                >
                  <img
                    _ngcontent-ng-c2865632707=""
                    alt=""
                    src="/assets/img/icon_dark_telegram.svg"
                  />
                </a>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default LoggedInProfile;
