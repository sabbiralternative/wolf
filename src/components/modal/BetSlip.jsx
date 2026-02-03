import { useEffect, useRef, useState } from "react";
import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";
import { API, Settings } from "../../api";
import useContextState from "../../hooks/useContextState";
import useBalance from "../../hooks/useBalance";
import { FaSpinner } from "react-icons/fa";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import useLanguage from "../../hooks/useLanguage";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import useGetSocialLink from "../../hooks/useGetSocialLink";
import { AxiosJSEncrypt } from "../../lib/AxiosJSEncrypt";

/* eslint-disable react/no-unknown-property */
const BetSlip = ({
  setOpenBetSlip,
  placeBetValues,
  refetchExposure,
  setSuccessMessage,
  setErrorMessage,
  refetchCurrentBets,
  data,
}) => {
  const currentPlaceBetEvent = data?.find(
    (item) => item?.id === placeBetValues?.marketId,
  );

  const [isCashOut, setIsCashOut] = useState(false);
  const { eventTypeId } = useParams();
  const { language } = useLanguage();
  const { setPredictOdds, predictOdds, closePopupForForever } =
    useContextState();
  /* Close modal click outside */
  const betSlipRef = useRef();
  useCloseModalClickOutside(betSlipRef, () => {
    setOpenBetSlip(false);
    setPredictOdds([]);
  });
  /* Button values from locale storage */
  const buttonGameValue = JSON.parse(localStorage.getItem("buttonValue"));
  const [totalSize, setTotalSize] = useState("");
  const [loader, setLoader] = useState(false);
  const [betDelay, setBetDelay] = useState("");
  const { socialLink } = useGetSocialLink();
  const { refetchBalance } = useBalance();
  const [stakeErr, setStakeErr] = useState("");
  const [price, setPrice] = useState(null);

  /* Set price */
  useEffect(() => {
    setPrice(placeBetValues?.price);
    setTotalSize(placeBetValues?.totalSize?.toFixed(2));
    setIsCashOut(placeBetValues?.cashout || false);
  }, [placeBetValues]);

  let payload = {};
  if (price) {
    if (Settings.language) {
      payload.language = language;
    }
    if (placeBetValues?.btype === "SPORTSBOOK") {
      payload = {
        price: price,
        side: placeBetValues?.side,
        selectionId: placeBetValues?.selectionId,
        btype: placeBetValues?.btype,
        placeName: placeBetValues?.placeName,
        eventTypeId: placeBetValues?.eventTypeId,
        betDelay: currentPlaceBetEvent?.betDelay,
        marketId: placeBetValues?.marketId,
        maxLiabilityPerMarket: placeBetValues?.maxLiabilityPerMarket,
        maxLiabilityPerBet: placeBetValues?.maxLiabilityPerBet,
        totalSize: totalSize,
        isBettable: placeBetValues?.isBettable,
        eventId: placeBetValues?.eventId,
        cashout: isCashOut,
        b2c: Settings.b2c,
      };
    } else {
      payload = {
        betDelay: currentPlaceBetEvent?.betDelay,
        btype: placeBetValues?.btype,
        eventTypeId: placeBetValues?.eventTypeId,
        marketId: placeBetValues?.marketId,
        price: price,
        selectionId: placeBetValues?.selectionId,
        side: placeBetValues?.side,
        totalSize: totalSize,
        maxLiabilityPerMarket: placeBetValues?.maxLiabilityPerMarket,
        isBettable: placeBetValues?.isBettable,
        maxLiabilityPerBet: placeBetValues?.maxLiabilityPerBet,
        eventId: placeBetValues?.eventId,
        cashout: isCashOut,
        b2c: Settings.b2c,
      };
    }
  }

  /* Handle bets */
  const handleOrderBets = () => {
    if (totalSize < 100) {
      return setStakeErr("Min bet amount is 100");
    }

    const payloadData = [
      {
        ...payload,
        nounce: uuidv4(),
        isbetDelay: socialLink?.bet_delay,
        apk: closePopupForForever ? true : false,
      },
    ];
    let delay = 0;
    if (
      (eventTypeId == 4 || eventTypeId == 2) &&
      placeBetValues?.btype === "MATCH_ODDS" &&
      price > 3 &&
      placeBetValues?.name?.length === 2
    ) {
      delay = 9000;
    }
    if (
      (eventTypeId == 4 || eventTypeId == 2) &&
      placeBetValues?.btype === "MATCH_ODDS" &&
      price > 7 &&
      placeBetValues?.name?.length === 3
    ) {
      delay = 9000;
    } else {
      setBetDelay(currentPlaceBetEvent?.betDelay);
      delay = socialLink?.bet_delay ? currentPlaceBetEvent?.betDelay * 1000 : 0;
    }
    setLoader(true);
    setTimeout(async () => {
      const { data } = await AxiosJSEncrypt.post(API.order, payloadData);
      if (data?.success) {
        refetchExposure();
        refetchBalance();
        refetchCurrentBets();
        setLoader(false);
        setOpenBetSlip(false);
        setPredictOdds([]);
        setSuccessMessage(data?.result?.result?.placed?.[0]?.message);
      } else {
        setErrorMessage(
          data?.error?.status?.[0]?.description || data?.error?.errorMessage,
        );
        setLoader(false);
        setOpenBetSlip(false);
        setPredictOdds([]);
      }
    }, delay);
  };

  /* Increase price bets */
  const handleIncreasePrice = () => {
    if (price == 1000 || placeBetValues?.isWeak === true) {
      return;
    } else if (price > 1.0 && price < 2) {
      setPrice((parseFloat(price) + 0.01).toFixed(2));
    } else if (price > 1.99 && price < 3) {
      setPrice((parseFloat(price) + 0.02).toFixed(2));
    } else if (price > 2.99 && price < 4) {
      setPrice((parseFloat(price) + 0.05).toFixed(2));
    } else if (price > 3.99 && price < 6) {
      setPrice((parseFloat(price) + 0.1).toFixed(1));
    } else if (price > 5.99 && price < 10) {
      setPrice((parseFloat(price) + 0.2).toFixed(1));
    } else if (price > 9.99 && price < 20) {
      setPrice((parseFloat(price) + 0.5).toFixed(1));
    } else {
      setPrice(parseFloat(price) + 1);
    }
    setIsCashOut(false);
  };

  /* Decrease price bets */
  const handleDecreasePrice = () => {
    if (price < 1.02 || placeBetValues?.isWeak === true) {
      return;
    } else if (price < 2) {
      setPrice((parseFloat(price) - 0.01).toFixed(2));
    } else if (price > 1.99 && price < 3) {
      setPrice((parseFloat(price) - 0.02).toFixed(2));
    } else if (price > 2.99 && price < 4) {
      setPrice((parseFloat(price) - 0.05).toFixed(2));
    } else if (price > 3.99 && price < 6) {
      setPrice((parseFloat(price) - 0.1).toFixed(1));
    } else if (price > 5.99 && price < 10) {
      setPrice((parseFloat(price) - 0.2).toFixed(1));
    } else if (price > 9.99 && price < 20) {
      setPrice((parseFloat(price) - 0.5).toFixed(1));
    } else {
      setPrice(parseFloat(price) - 1);
    }
    setIsCashOut(false);
  };

  console.log(placeBetValues);

  useEffect(() => {
    let total;
    if (
      placeBetValues?.btype === "MATCH_ODDS" ||
      placeBetValues?.btype === "BOOKMAKER"
    ) {
      if (placeBetValues?.back) {
        if (placeBetValues?.btype === "MATCH_ODDS") {
          total = price * totalSize - totalSize;
        }
        if (placeBetValues?.btype === "BOOKMAKER") {
          const bookmaker = 1 + price / 100;
          total = bookmaker * totalSize - totalSize;
        }

        const currentExposure = placeBetValues?.exposure?.map((exp) => {
          return {
            updatedExposure: totalSize
              ? exp?.isBettingOnThisRunner
                ? formatNumber(exp?.exposure + total)
                : formatNumber(exp?.exposure + -1 * totalSize)
              : null,

            id: exp?.id,
            isBettingOnThisRunner: exp?.isBettingOnThisRunner,
            name: exp?.name,
            exposure: exp?.exposure,
          };
        });

        setPredictOdds(currentExposure);
      } else if (placeBetValues?.lay) {
        if (placeBetValues?.btype === "MATCH_ODDS") {
          total = -1 * (price * totalSize - totalSize);
        }
        if (placeBetValues?.btype === "BOOKMAKER") {
          const bookmaker = 1 + price / 100;
          total = -1 * (bookmaker * totalSize - totalSize);
        }

        const currentExposure = placeBetValues?.exposure?.map((exp) => {
          return {
            updatedExposure: totalSize
              ? exp?.isBettingOnThisRunner
                ? formatNumber(exp?.exposure + total)
                : formatNumber(1 * exp?.exposure + 1 * totalSize)
              : null,
            id: exp?.id,
            isBettingOnThisRunner: exp?.isBettingOnThisRunner,
            name: exp?.name,
            exposure: exp?.exposure,
          };
        });
        setPredictOdds(currentExposure);
      }
    }
  }, [price, totalSize, placeBetValues, setPredictOdds]);

  /* Format number */
  const formatNumber = (value) => {
    const hasDecimal = value % 1 !== 0;
    return hasDecimal ? value.toFixed(2) : value;
  };
  /* Adding red or green color on odd */

  useEffect(() => {
    if (betDelay > 0) {
      setTimeout(() => {
        setBetDelay((prev) => prev - 1);
      }, 1000);
    } else {
      setBetDelay(null);
    }
  }, [setBetDelay, betDelay]);

  const handleButtonValue = (value) => {
    setIsCashOut(false);
    const buttonValue = Number(value);
    const prevStake = !totalSize ? null : Number(totalSize);

    if (prevStake === null) {
      setTotalSize(buttonValue);
    }
    if (prevStake >= 0) {
      setTotalSize(buttonValue + prevStake);
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
        <div
          id="cdk-overlay-1"
          className="cdk-overlay-pane betslip-dialog"
          style={{
            width: "calc(100% - 30px)",
            maxWidth: "400px",
            position: "static",
            marginBottom: "10px",
          }}
          ref={betSlipRef}
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
                <div _nghost-ng-c2459892542="" className="ng-star-inserted">
                  <div
                    _ngcontent-ng-c2459892542=""
                    className={`betslip-modal ${
                      placeBetValues?.back ? "forback" : "forlay"
                    }`}
                  >
                    {/*  <!--forback // forlay --> */}
                    <div _ngcontent-ng-c2459892542="" className="modal-header">
                      <h2 _ngcontent-ng-c2459892542=""></h2>
                      <h2 _ngcontent-ng-c2459892542=""></h2>
                      <h2 _ngcontent-ng-c2459892542="">
                        Place Bet | {placeBetValues?.marketName}
                      </h2>
                      <div _ngcontent-ng-c2459892542="" className="action-btns">
                        <button
                          onClick={() => {
                            setOpenBetSlip(false);
                            setPredictOdds([]);
                          }}
                          _ngcontent-ng-c2459892542=""
                          mat-button=""
                          mat-dialog-close=""
                          className="modal-close-btn mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base"
                          mat-ripple-loader-uninitialized=""
                          mat-ripple-loader-class-name="mat-mdc-button-ripple"
                          type="button"
                        >
                          <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                          <span
                            style={{ marginLeft: "4px" }}
                            _ngcontent-ng-c2459892542=""
                            role="img"
                            className="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color"
                            aria-hidden="true"
                            data-mat-icon-type="font"
                          >
                            close
                          </span>
                          <span className="mdc-button__label"></span>
                          <span className="mat-mdc-focus-indicator"></span>
                          <span className="mat-mdc-button-touch-target"></span>
                        </button>
                      </div>
                    </div>
                    <div _ngcontent-ng-c2459892542="" className="modal-body">
                      <div
                        _ngcontent-ng-c2459892542=""
                        className={`betvalue-wrap ${
                          placeBetValues?.back ? "forback" : "forlay"
                        }`}
                      >
                        {loader && (
                          <div id="loader-section">
                            <div id="load-inner">
                              <span style={{ position: "relative" }}>
                                <FaSpinner size={25} />
                                {/*      <span
                                  style={{
                                    position: "absolute",
                                    right: "9px",
                                    top: "4px",
                                  }}
                                >
                                  {betDelay > 0 && betDelay}
                                </span> */}
                              </span>
                              <span style={{ fontWeight: "500" }}>
                                Your bet is being processed...
                              </span>
                              <span
                                style={{ fontWeight: "500" }}
                                className="font-semibold"
                              >
                                Please Wait...
                              </span>
                            </div>
                          </div>
                        )}

                        {/* <!--forback // forlay --> */}
                        <div
                          _ngcontent-ng-c2459892542=""
                          className="betslip-toprow"
                        >
                          <h2 _ngcontent-ng-c2459892542="">
                            {placeBetValues?.selectedBetName ||
                              placeBetValues?.placeName}{" "}
                          </h2>
                        </div>
                        <div
                          _ngcontent-ng-c2459892542=""
                          className="bet-action-grid"
                        >
                          <div
                            _ngcontent-ng-c2459892542=""
                            className="bet-action-item"
                            style={{ position: "relative", overflow: "hidden" }}
                          >
                            <input
                              _ngcontent-ng-c2459892542=""
                              type="number"
                              readOnly={placeBetValues?.isWeak}
                              className="rate-inp"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                            />
                            {!placeBetValues?.isWeak && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: 3,
                                  right: 5,
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <MdKeyboardArrowUp
                                  onClick={handleIncreasePrice}
                                  style={{ cursor: "pointer" }}
                                  size={15}
                                />
                                <MdKeyboardArrowDown
                                  onClick={handleDecreasePrice}
                                  style={{ cursor: "pointer" }}
                                  size={15}
                                />
                              </div>
                            )}
                          </div>
                          <div
                            _ngcontent-ng-c2459892542=""
                            className="bet-action-item"
                          >
                            <input
                              onChange={(e) => {
                                setTotalSize(e.target.value);
                                setIsCashOut(false);
                              }}
                              _ngcontent-ng-c2459892542=""
                              type="number"
                              name="betStake"
                              className="ng-untouched ng-pristine ng-valid"
                              defaultValue={totalSize}
                              placeholder={`Max : ${placeBetValues?.maxLiabilityPerBet}`}
                            />
                          </div>
                          <div
                            _ngcontent-ng-c2459892542=""
                            className="bet-action-item"
                          >
                            <button
                              // disabled={!totalSize}
                              onClick={handleOrderBets}
                              _ngcontent-ng-c2459892542=""
                              mat-flat-button=""
                              className="slip-btn notranslate mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-unthemed mat-mdc-button-base"
                              mat-ripple-loader-uninitialized=""
                              mat-ripple-loader-class-name="mat-mdc-button-ripple"
                              mat-ripple-loader-disabled=""
                            >
                              <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                              <span
                                className="mdc-button__label"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  gap: "0px 6px",
                                  fontSize: "11px",
                                }}
                              >
                                <span> Place Bet</span>

                                <span
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "0px 1px",
                                    fontSize: "10px",
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={11}
                                    height={11}
                                    viewBox="0 0 12 12"
                                    fill="none"
                                  >
                                    <g clipPath="url(#clip0_2144_3162)">
                                      <path
                                        d="M9.91095 3.68857L10.3814 3.21808C10.5643 3.03525 10.5643 2.7388 10.3814 2.55606C10.1986 2.37323 9.90225 2.37323 9.71942 2.55606L9.24893 3.02655C8.45956 2.36884 7.50037 1.9715 6.47717 1.87848V0.93631H6.92972C7.18826 0.93631 7.39783 0.726654 7.39783 0.468109C7.39783 0.209564 7.18826 0 6.92972 0H5.08832C4.82977 0 4.62021 0.209564 4.62021 0.468109C4.62021 0.726654 4.82977 0.93631 5.08832 0.93631H5.54086V1.87848C2.97958 2.11139 0.9375 4.26306 0.9375 6.92844C0.9375 9.73141 3.20572 12 6.00906 12C8.81195 12 11.0805 9.73178 11.0805 6.92844C11.0805 5.73111 10.6682 4.59723 9.91095 3.68857ZM6.00897 11.0637C3.72885 11.0637 1.87372 9.20865 1.87372 6.92844C1.87372 4.64832 3.72885 2.79327 6.00897 2.79327C8.28918 2.79327 10.1442 4.64832 10.1442 6.92844C10.1442 9.20865 8.28918 11.0637 6.00897 11.0637ZM8.1785 4.759C8.36133 4.94183 8.36133 5.23828 8.1785 5.42102L6.34003 7.25949C6.1572 7.44232 5.86075 7.44232 5.67801 7.25949C5.49518 7.07666 5.49518 6.78021 5.67801 6.59747L7.51639 4.759C7.69922 4.57617 7.99567 4.57617 8.1785 4.759Z"
                                        fill="var(--primary-bg)"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_2144_3162">
                                        <rect
                                          width={12}
                                          height={12}
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                  {currentPlaceBetEvent?.betDelay}s
                                </span>
                              </span>
                              <span className="mat-mdc-focus-indicator"> </span>
                              <span className="mat-mdc-button-touch-target"></span>
                            </button>
                          </div>
                        </div>
                        <div
                          _ngcontent-ng-c2459892542=""
                          className="error-wrap"
                        >
                          <p
                            _ngcontent-ng-c2459892542=""
                            className="spacer"
                          ></p>
                          <p
                            _ngcontent-ng-c2459892542=""
                            className="error-msg ng-star-inserted"
                          >
                            {" "}
                            {stakeErr}
                          </p>
                        </div>
                        <div
                          _ngcontent-ng-c2459892542=""
                          className="amt-chip-grid"
                        >
                          {buttonGameValue?.slice(0, 8).map(({ value }, i) => {
                            return (
                              <button
                                onClick={() => handleButtonValue(value)}
                                key={i}
                                _ngcontent-ng-c2459892542=""
                                mat-flat-button=""
                                className="chip-grid-item mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-unthemed mat-mdc-button-base ng-star-inserted"
                                mat-ripple-loader-uninitialized=""
                                mat-ripple-loader-class-name="mat-mdc-button-ripple"
                              >
                                <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                                <span className="mdc-button__label">
                                  {value}
                                </span>
                                <span className="mat-mdc-focus-indicator"></span>
                                <span className="mat-mdc-button-touch-target"></span>
                              </button>
                            );
                          })}
                        </div>
                        {placeBetValues?.btype === "FANCY" ||
                        placeBetValues?.btype === "SPORTSBOOK" ? (
                          <div
                            _ngcontent-ng-c2459892542=""
                            className="range-text-row"
                          >
                            <h2
                              _ngcontent-ng-c2459892542=""
                              style={{ textTransform: "none" }}
                            >
                              Limit: {placeBetValues?.minLiabilityPerBet} to{" "}
                              {placeBetValues?.maxLiabilityPerBet}
                              <span _ngcontent-ng-c2459892542="">
                                Max Market:{" "}
                                {placeBetValues?.maxLiabilityPerMarket}
                              </span>
                            </h2>
                          </div>
                        ) : null}
                        {placeBetValues?.btype === "MATCH_ODDS" ||
                        placeBetValues?.btype === "BOOKMAKER" ||
                        placeBetValues?.btype === "BOOKMAKER2" ? (
                          <div
                            _ngcontent-ng-c2459892542=""
                            className="pred-pl-wrap"
                          >
                            {predictOdds?.map((predictOdd, i) => {
                              return (
                                <p
                                  key={i}
                                  _ngcontent-ng-c2459892542=""
                                  className="pred-pl-row ng-star-inserted"
                                >
                                  <strong _ngcontent-ng-c2459892542="">
                                    {predictOdd?.name}
                                  </strong>
                                  <span
                                    style={{
                                      fontSize: "10px",
                                      textAlign: "right",
                                    }}
                                    _ngcontent-ng-c2459892542=""
                                    className={`${
                                      predictOdd?.exposure &&
                                      placeBetValues?.exposure > 0
                                        ? "text-success"
                                        : "text-danger"
                                    }`}
                                  >
                                    {predictOdd?.exposure !== 0 &&
                                      predictOdd?.exposure}
                                  </span>
                                  <span
                                    className={`${
                                      predictOdd?.updatedExposure &&
                                      predictOdd?.updatedExposure > 0
                                        ? "text-success"
                                        : "text-danger"
                                    }`}
                                    style={{
                                      fontSize: "10px",
                                      textAlign: "right",
                                    }}
                                  >
                                    {predictOdd?.updatedExposure}
                                  </span>
                                </p>
                              );
                            })}
                          </div>
                        ) : (
                          <div></div>
                        )}
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
        </div>
      </div>
    </div>
  );
};

export default BetSlip;
