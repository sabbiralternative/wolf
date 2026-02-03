import { Link, useNavigate } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import { useEffect, useRef, useState } from "react";
import useCloseModalClickOutside from "../../../hooks/useCloseModalClickOutside";
import { RiEditBoxFill } from "react-icons/ri";
import useBonusBalance from "../../../hooks/useBonusBalance";
import { handleLogOut } from "../../../utils/handleLogOut";
import { Settings } from "../../../api";
import Warning from "../Notification/Warning";
import ClaimWarning from "../Notification/ClaimWarning";
// import axios from "axios";
// import UseTokenGenerator from "../../../hooks/UseTokenGenerator";
// import UseEncryptData from "../../../hooks/UseEncryptData";
import useBalance from "../../../hooks/useBalance";
/* eslint-disable react/no-unknown-property */
const Sidebar = () => {
  const {
    showSidebar,
    setShowSidebar,
    setGetToken,
    setShowEditStake,
    token,
    setShowLogin,
    isCheckedBonusToken,
    logo,
    // setPromoErrMgs,
    // setPromoSuccessMsg,
    setShowHelpModal,
    setShowReferral,
    setShowBonusRule,
    setTokenLoading,
  } = useContextState();
  const loginName = localStorage.getItem("loginName");
  const navigate = useNavigate();
  const leftMenuRef = useRef();
  const { bonusBalanceData, bonusRefetchBalance } = useBonusBalance();
  const { refetchBalance } = useBalance();
  const [warningMessage, setWarningMessage] = useState("");
  const [showClaimWarn, setShowClaimWarn] = useState(false);
  // const [promoCode, setPromoCode] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const handleNavigateSocialLink = (link) => {
    window.open(link, "_blank");
    setShowSidebar(false);
  };
  /* Close sidebar click outside */
  useCloseModalClickOutside(leftMenuRef, () => {
    setShowSidebar(false);
  });
  /* Handle logout */
  const handleLogout = () => {
    /* Logout function */
    handleLogOut();
    setTokenLoading(true);
    /* Close sidebar */
    setShowSidebar(false);
    /* get current token */
    setGetToken((prev) => !prev);
    /* Navigate gome */
    navigate("/");
  };

  /* navigate account statement */
  const handleAccountStatement = (link) => {
    /* If checkbox is checked then set warning message */
    if (isCheckedBonusToken) {
      setWarningMessage("Please switch to main wallet");
      /* Close sidebar */
      setShowSidebar(false);
    } else {
      /* Other wise navigate to account statement  */
      navigate(link);
      /* Close sidebar */
      setShowSidebar(false);
    }
  };

  /* Handle checkbox true or false */
  const handleBonusToken = (e) => {
    const bonusTokenChecked = e.target.checked;
    if (bonusTokenChecked) {
      localStorage.setItem("checkedBonusToken", "true");
    } else {
      localStorage.removeItem("checkedBonusToken");
    }

    /* Get current token */
    setGetToken((prev) => !prev);
  };

  /* When sidebar open disabling scroll */
  useEffect(() => {
    if (showSidebar) {
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }
    return () => {
      document.body.classList.remove("disable-scroll");
    };
  }, [showSidebar]);

  useEffect(() => {
    const referralCode = localStorage.getItem("referralCode");
    setReferralCode(referralCode);
  }, [referralCode]);

  /* Handle referral code */
  // const handlePromoSubmit = async () => {
  //   /* Random token generator */
  //   const generatedToken = UseTokenGenerator();
  //   const postData = {
  //     code: promoCode,
  //     token: generatedToken,
  //   };
  //   /* Encrypted the post data */
  //   const encryptedData = UseEncryptData(postData);
  //   const res = await axios.post(API.referralCode, encryptedData, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   const data = res?.data;
  //   if (data?.success) {
  //     localStorage.setItem("referralCode", "hide");
  //     const referralCode = localStorage.getItem("referralCode");
  //     setReferralCode(referralCode);
  //     setPromoSuccessMsg(data?.result?.message);
  //     setShowSidebar(false);
  //   } else {
  //     setPromoErrMgs(data?.error?.errorMessage);
  //   }
  // };

  return (
    <>
      {/* Warning modal */}
      {warningMessage && (
        <Warning message={warningMessage} setMessage={setWarningMessage} />
      )}
      {/* Claim warning modal */}
      {showClaimWarn && (
        <ClaimWarning
          setShowClaimWarn={setShowClaimWarn}
          bonusRefetchBalance={bonusRefetchBalance}
          refetchBalance={refetchBalance}
        />
      )}
      <div
        className="mat-drawer-backdrop ng-star-inserted"
        style={{ visibility: `${showSidebar ? "visible" : "hidden"}` }}
      ></div>
      <div
        className="cdk-visually-hidden cdk-focus-trap-anchor"
        aria-hidden="true"
      ></div>

      <div
        ref={leftMenuRef}
        _ngcontent-ng-c967272132=""
        ngskiphydration=""
        mode="over"
        opened="false"
        className="mat-drawer mat-sidenav left-sidemenu ng-tns-c3816625663-0 ng-trigger ng-trigger-transform mat-drawer-over ng-star-inserted"
        style={{
          transform: `translate(${showSidebar ? "0" : "-100%"}, 0)`,
          boxShadow: `${showSidebar ? "" : "none"}`,
          transition: "0.5s",
        }}
      >
        {/* <span
              _ngcontent-ng-c967272132=""
              ngskiphydration=""
              mode="over"
              opened="false"
              className="mat-drawer mat-sidenav left-sidemenu ng-tns-c3816625663-0 ng-trigger ng-trigger-transform mat-drawer-over ng-star-inserted mat-drawer-opened"
              style={{ transform: "none", visibility: "visible" }}
            ></span> */}

        <div
          cdkscrollable=""
          className="mat-drawer-inner-container ng-tns-c3816625663-0"
        >
          <div
            _ngcontent-ng-c967272132=""
            className="sidemenu-wrapper ng-tns-c3816625663-0"
          >
            <div _ngcontent-ng-c967272132="" className="sidemenu-header">
              <div _ngcontent-ng-c967272132="" className="logo">
                <div _ngcontent-ng-c967272132="" className="img-wrap">
                  <img
                    _ngcontent-ng-c967272132=""
                    alt="logo"
                    src={logo}
                    className="ng-star-inserted"
                  />
                </div>
              </div>
              <div
                _ngcontent-ng-c967272132=""
                className="user-details ng-star-inserted"
              >
                <p _ngcontent-ng-c967272132="" className="notranslate">
                  <span
                    _ngcontent-ng-c967272132=""
                    role="img"
                    className="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color"
                    aria-hidden="true"
                    data-mat-icon-type="font"
                  >
                    person
                  </span>
                  {loginName || "Guest User"}
                </p>
              </div>
            </div>
            <div _ngcontent-ng-c967272132="" className="sidemenu-list">
              <ul _ngcontent-ng-c967272132="" className="smenu-wrap top">
                {/* If token avail able then showing this html */}
                {token && (
                  <>
                    {/* If bonus true in setting then showing bonus html */}
                    {Settings.bonus && (
                      <li
                        _ngcontent-ng-c967272132=""
                        className="smenu-item nav-bonus ng-star-inserted"
                      >
                        <div _ngcontent-ng-c967272132="" className="smenu-link">
                          <img
                            _ngcontent-ng-c967272132=""
                            alt="Menu Icon"
                            src="/assets/img/sidenav-reward.svg"
                          />
                          <span _ngcontent-ng-c967272132="">Bonus</span>
                          <span
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              marginLeft: "auto",
                              justifyContent: "flex-end",
                            }}
                          >
                            <input
                              style={{ cursor: "pointer" }}
                              onChange={handleBonusToken}
                              type="checkbox"
                              name="bonus"
                              id="bonus"
                              defaultChecked={
                                isCheckedBonusToken ? true : false
                              }
                            ></input>
                            <label htmlFor="bonus"> Bonus Wallet</label>
                          </span>
                        </div>
                        <div _ngcontent-ng-c967272132="">
                          <div
                            _ngcontent-ng-c967272132=""
                            className="bonus-wrap"
                          >
                            <div
                              _ngcontent-ng-c967272132=""
                              className="bonus-details"
                            >
                              <div
                                _ngcontent-ng-c967272132=""
                                className="bonus-info"
                              >
                                <p _ngcontent-ng-c967272132="">
                                  Total Bonus: {bonusBalanceData?.availBalance}
                                </p>
                                <div
                                  _ngcontent-ng-c967272132=""
                                  className="claim-btn"
                                >
                                  <p _ngcontent-ng-c967272132="">
                                    Claimable Bonus:{" "}
                                    {bonusBalanceData?.claimBonus}
                                  </p>
                                  <button
                                    onClick={() => {
                                      setShowClaimWarn(true);
                                      setShowSidebar(false);
                                    }}
                                    _ngcontent-ng-c967272132=""
                                    className="btn secondary-btn"
                                    disabled={
                                      bonusBalanceData &&
                                      bonusBalanceData?.claimBonus < 100
                                        ? true
                                        : false
                                    }
                                  >
                                    Claim
                                  </button>
                                </div>
                                <p
                                  _ngcontent-ng-c967272132=""
                                  className="n-msg"
                                >
                                  Min. Claimable Coins: 100
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                    {/* 
                    {referralCode == "show" && (
                      <li
                        _ngcontent-ng-c967272132=""
                        hidden=""
                        className="smenu-item"
                      >
                        <a _ngcontent-ng-c967272132="" className="smenu-link">
                          <img
                            _ngcontent-ng-c967272132=""
                            alt="Menu Icon"
                            src="/assets/img/sidenav-reward.svg"
                          />
                          <span _ngcontent-ng-c967272132="">
                            Have a promo/refer code
                          </span>
                        </a>
                        <div _ngcontent-ng-c967272132="" className="refer-code">
                          <input
                            onChange={(e) => setPromoCode(e.target.value)}
                            _ngcontent-ng-c967272132=""
                            type="text"
                            placeholder="Enter Promo/Refer code"
                          />
                          <p
                            _ngcontent-ng-c967272132=""
                            className="timer text-danger"
                            style={{ display: "none" }}
                          >
                            23:03
                          </p>
                          <button
                            onClick={handlePromoSubmit}
                            _ngcontent-ng-c967272132=""
                            className="btn secondary-btn"
                          >
                            Submit
                          </button>
                        </div>
                      </li>
                    )} */}

                    <li _ngcontent-ng-c967272132="" className="smenu-item">
                      <Link
                        to="/profile"
                        onClick={() => setShowSidebar(false)}
                        _ngcontent-ng-c967272132=""
                        className="smenu-link"
                      >
                        <img
                          _ngcontent-ng-c967272132=""
                          alt="Menu Icon"
                          src="/assets/img/sidenav_profile.svg"
                        />
                        <span _ngcontent-ng-c967272132="">Profile</span>
                      </Link>
                    </li>
                    {/* <li
                      _ngcontent-ng-c967272132=""
                      routerlinkactive="active-link"
                      className="smenu-item"
                    >
                      <a _ngcontent-ng-c967272132="" className="smenu-link">
                        <img
                          _ngcontent-ng-c967272132=""
                          alt="Menu Icon"
                          src="https://ss.manage63.com/bmk-wl/commonAssets/sidenav_bank.svg"
                        />
                        <span _ngcontent-ng-c967272132="">
                          Withdrawal Details
                        </span>
                      </a>
                    </li> */}
                    <li
                      _ngcontent-ng-c967272132=""
                      routerlinkactive="active-link"
                      className="smenu-item"
                    >
                      <a
                        onClick={() =>
                          handleAccountStatement("/deposit-statement")
                        }
                        _ngcontent-ng-c967272132=""
                        className="smenu-link"
                      >
                        <img
                          _ngcontent-ng-c967272132=""
                          alt="Menu Icon"
                          src="/assets/img/sidenav__ac_statement.svg"
                        />
                        <span _ngcontent-ng-c967272132="">
                          Deposit Statement
                        </span>
                      </a>
                    </li>
                    <li
                      _ngcontent-ng-c967272132=""
                      routerlinkactive="active-link"
                      className="smenu-item"
                    >
                      <a
                        onClick={() =>
                          handleAccountStatement("/withdraw-statement")
                        }
                        _ngcontent-ng-c967272132=""
                        className="smenu-link"
                      >
                        <img
                          _ngcontent-ng-c967272132=""
                          alt="Menu Icon"
                          src="/assets/img/sidenav__ac_statement.svg"
                        />
                        <span _ngcontent-ng-c967272132="">
                          Withdraw Statement
                        </span>
                      </a>
                    </li>

                    <li
                      _ngcontent-ng-c967272132=""
                      routerlinkactive="active-link"
                      className="smenu-item"
                    >
                      <a
                        onClick={() =>
                          handleAccountStatement("/my-bank-details")
                        }
                        _ngcontent-ng-c967272132=""
                        className="smenu-link"
                      >
                        <img
                          _ngcontent-ng-c2865632707=""
                          alt="Menu Icon"
                          src="/assets/img/sidenav_bank.svg"
                        />
                        <span _ngcontent-ng-c967272132="">My Bank Details</span>
                      </a>
                    </li>

                    <li
                      _ngcontent-ng-c967272132=""
                      routerlinkactive="active-link"
                      className="smenu-item"
                    >
                      <Link
                        onClick={() => setShowSidebar(false)}
                        to="/active-bets"
                        _ngcontent-ng-c967272132=""
                        className="smenu-link"
                      >
                        <img
                          _ngcontent-ng-c967272132=""
                          alt="Menu Icon"
                          src="/assets/img/sidenav_activebets.svg"
                        />
                        <span _ngcontent-ng-c967272132="">Active Bets</span>
                      </Link>
                    </li>
                    <li
                      _ngcontent-ng-c967272132=""
                      routerlinkactive="active-link"
                      className="smenu-item"
                    >
                      <a
                        onClick={() => {
                          setShowEditStake(true);
                          setShowSidebar(false);
                        }}
                        _ngcontent-ng-c967272132=""
                        className="smenu-link"
                      >
                        <RiEditBoxFill size={18} color="#3d3d3d" />
                        <span _ngcontent-ng-c967272132="">Edit Stakes</span>
                      </a>
                    </li>
                    {Settings.referral && (
                      <li
                        _ngcontent-ng-c967272132=""
                        routerlinkactive="active-link"
                        className="smenu-item"
                      >
                        <a
                          onClick={() => {
                            setShowReferral(true);
                            setShowSidebar(false);
                          }}
                          _ngcontent-ng-c967272132=""
                          className="smenu-link"
                        >
                          <RiEditBoxFill size={18} color="#3d3d3d" />
                          <span _ngcontent-ng-c967272132="">Referral</span>
                        </a>
                      </li>
                    )}
                    <li
                      _ngcontent-ng-c967272132=""
                      onClick={() => setShowSidebar(false)}
                      className="smenu-item"
                    >
                      <Link
                        to="/referral-statement"
                        _ngcontent-ng-c967272132=""
                        className="smenu-link"
                      >
                        <RiEditBoxFill size={18} color="#3d3d3d" />
                        <span _ngcontent-ng-c967272132="">
                          Referral Statement
                        </span>
                      </Link>
                    </li>
                  </>
                )}
                <li _ngcontent-ng-c967272132="" className="smenu-item">
                  <a _ngcontent-ng-c967272132="" className="smenu-link">
                    <img
                      _ngcontent-ng-c967272132=""
                      alt="Menu Icon"
                      src="/assets/img/sidenav_notification.svg"
                    />
                    <span _ngcontent-ng-c967272132="">Notifications</span>
                  </a>
                </li>
                <li _ngcontent-ng-c967272132="" className="smenu-item">
                  <Link
                    onClick={() => setShowSidebar(false)}
                    to="/rules"
                    _ngcontent-ng-c967272132=""
                    className="smenu-link"
                  >
                    <img
                      _ngcontent-ng-c967272132=""
                      alt="Menu Icon"
                      src="/assets/img/sidenav_rules.svg"
                    />
                    <span _ngcontent-ng-c967272132="">Rules</span>
                  </Link>
                </li>
                {Settings.bonus && (
                  <li _ngcontent-ng-c967272132="" className="smenu-item">
                    <a
                      onClick={() => {
                        setShowBonusRule(true);
                        setShowSidebar(false);
                      }}
                      to="/rules"
                      _ngcontent-ng-c967272132=""
                      className="smenu-link"
                    >
                      <img
                        _ngcontent-ng-c967272132=""
                        alt="Menu Icon"
                        src="/assets/img/sidenav_rules.svg"
                      />
                      <span _ngcontent-ng-c967272132="">Bonus Rules</span>
                    </a>
                  </li>
                )}
                {Settings?.link && (
                  <li
                    _ngcontent-ng-c967272132=""
                    className="smenu-item ng-star-inserted"
                  >
                    <a
                      onClick={() => {
                        setShowHelpModal(true);
                        setShowSidebar(false);
                      }}
                      _ngcontent-ng-c967272132=""
                      className="smenu-link"
                    >
                      <img
                        _ngcontent-ng-c967272132=""
                        alt="Menu Icon"
                        src="/assets/img/sidenav_help.svg"
                      />
                      <span _ngcontent-ng-c967272132="">Help</span>
                    </a>
                  </li>
                )}
              </ul>
              <ul _ngcontent-ng-c967272132="" className="smenu-wrap bottom">
                <li
                  _ngcontent-ng-c967272132=""
                  className="smenu-item social-links-wrap ng-star-inserted"
                >
                  {Settings?.instagramLink || Settings?.telegramLink ? (
                    <label _ngcontent-ng-c967272132="">Join us Now</label>
                  ) : null}

                  <div _ngcontent-ng-c967272132="" className="social-links">
                    {/* <a _ngcontent-ng-c967272132="" className="ng-star-inserted">
                      <img
                        _ngcontent-ng-c967272132=""
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
                </li>
                {/* <li
                _ngcontent-ng-c967272132=""
                className="smenu-item ng-star-inserted"
              >
                <div _ngcontent-ng-c967272132="" className="action-btn">
                  <button
                    _ngcontent-ng-c967272132=""
                    className="btn outline-btn app-dwnld-btn notranslate"
                  >
                    <span
                      _ngcontent-ng-c967272132=""
                      role="img"
                      className="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color"
                      aria-hidden="true"
                      data-mat-icon-type="font"
                    >
                      download
                    </span>
                    Download App
                  </button>
                </div>
              </li> */}
                <li _ngcontent-ng-c967272132="" className="smenu-item">
                  <div
                    _ngcontent-ng-c967272132=""
                    className="action-btn ng-star-inserted"
                  >
                    {token ? (
                      <button
                        onClick={handleLogout}
                        _ngcontent-ng-c967272132=""
                        className="btn secondary-btn notranslate"
                      >
                        Logout
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setShowLogin(true);
                          setShowSidebar(false);
                        }}
                        _ngcontent-ng-c967272132=""
                        className="btn secondary-btn notranslate"
                      >
                        Login
                      </button>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
