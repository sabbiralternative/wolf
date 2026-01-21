import { useEffect, useState } from "react";
import useContextState from "../../../hooks/useContextState";
import { handlePlaceBet } from "../../../utils/handlePlaceBet";
import Suspended from "../Suspended";
import { handleCashOutPlaceBet } from "../../../utils/handleCashOutPlaceBet";
import { Settings } from "../../../api";
import Login from "../../../components/modal/Login";
import { useParams } from "react-router-dom";
import { isGameSuspended } from "../../../utils/isGameSuspended";
import SpeedCashOut from "../../../components/modal/SpeedCashOut";

/* eslint-disable react/no-unknown-property */
const Bookmaker = ({
  bookmarker,
  setOpenBetSlip,
  setPlaceBetValues,
  exposer,
  setShowLoginWarn,
}) => {
  const [speedCashOut, setSpeedCashOut] = useState(null);
  const { eventId } = useParams();
  const [errorLogin, setErrorLogin] = useState("");
  const [teamProfit, setTeamProfit] = useState([]);
  const { token, showLogin, setShowLogin, setGetToken } = useContextState();
  let pnlBySelection;
  /* Exposure */
  if (exposer?.pnlBySelection) {
    const obj = exposer?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }
  const computeExposureAndStake = (
    exposureA,
    exposureB,
    runner1,
    runner2,
    gameId,
  ) => {
    let runner,
      largerExposure,
      layValue,
      oppositeLayValue,
      lowerExposure,
      speedCashOut;

    const pnlArr = [exposureA, exposureB];
    const isOnePositiveExposure = onlyOnePositive(pnlArr);

    if (exposureA > exposureB) {
      // Team A has a larger exposure.
      runner = runner1;
      largerExposure = exposureA;
      layValue = 1 + Number(runner1?.lay?.[0]?.price) / 100;
      oppositeLayValue = 1 + Number(runner2?.lay?.[0]?.price) / 100;
      lowerExposure = exposureB;
    } else {
      // Team B has a larger exposure.
      runner = runner2;
      largerExposure = exposureB;
      layValue = 1 + Number(runner2?.lay?.[0]?.price) / 100;
      oppositeLayValue = 1 + Number(runner1?.lay?.[0]?.price) / 100;
      lowerExposure = exposureA;
    }

    if (exposureA > 0 && exposureB > 0) {
      const difference = Math.abs(exposureA - exposureB);
      if (difference <= 10) {
        speedCashOut = true;
      }
    }

    // Compute the absolute value of the lower exposure.
    let absLowerExposure = Math.abs(lowerExposure);

    // Compute the liability for the team with the initially larger exposure.
    let liability = absLowerExposure * (layValue - 1);

    // Compute the new exposure of the team with the initially larger exposure.
    let newExposure = largerExposure - liability;

    // Compute the profit using the new exposure and the lay odds of the opposite team.
    let profit = newExposure / layValue;

    // Calculate the new stake value for the opposite team by adding profit to the absolute value of its exposure.
    let newStakeValue = absLowerExposure + profit;

    // Return the results.
    return {
      runner,
      newExposure,
      profit,
      newStakeValue,
      oppositeLayValue,
      gameId,
      isOnePositiveExposure,
      exposureA,
      exposureB,
      runner1,
      runner2,
      speedCashOut,
    };
  };

  function onlyOnePositive(arr) {
    let positiveCount = arr?.filter((num) => num > 0).length;
    return positiveCount === 1;
  }

  useEffect(() => {
    let results = [];
    if (
      bookmarker?.length > 0 &&
      exposer?.pnlBySelection &&
      Object.keys(exposer?.pnlBySelection)?.length > 0
    ) {
      bookmarker.forEach((game) => {
        const runners = game?.runners || [];
        if (runners?.length === 2) {
          const runner1 = runners[0];
          const runner2 = runners[1];

          const runner1back = runner1?.back?.[0]?.price;
          const runner1Lay = runner1?.lay?.[0]?.price;
          const runner2back = runner2?.back?.[0]?.price;
          const runner2Lay = runner2?.lay?.[0]?.price;

          const pnl1 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner1?.id,
          )?.pnl;
          const pnl2 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner2?.id,
          )?.pnl;

          if (
            pnl1 &&
            pnl2 &&
            runner1 &&
            runner2 &&
            runner1back &&
            runner1Lay &&
            runner2back &&
            runner2Lay
          ) {
            const result = computeExposureAndStake(
              pnl1,
              pnl2,
              runner1,
              runner2,
              game?.id,
            );
            results.push(result);
          }
        }
      });
      setTeamProfit(results);
    } else {
      setTeamProfit([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmarker, eventId, exposer]);
  return (
    <>
      {speedCashOut && (
        <SpeedCashOut
          speedCashOut={speedCashOut}
          setSpeedCashOut={setSpeedCashOut}
        />
      )}
      {bookmarker?.map((games, i) => {
        const teamProfitForGame = teamProfit?.find(
          (profit) =>
            profit?.gameId === games?.id && profit?.isOnePositiveExposure,
        );
        const speedCashOut = teamProfit?.find(
          (profit) => profit?.gameId === games?.id && profit?.speedCashOut,
        );

        return (
          <div key={i} _ngcontent-ng-c942213636="" className="ng-star-inserted">
            <div
              _ngcontent-ng-c942213636=""
              className={`bookmaker-card card-outer ${
                games?.maxLiabilityPerBet == "1" ? "disableMo" : ""
              }`}
              id="YFXXHB0"
            >
              <div _ngcontent-ng-c942213636="" className="head-wrap">
                <h2
                  _ngcontent-ng-c942213636=""
                  className="card-heading ng-star-inserted"
                >
                  {/* { games?.eventTypeId == 4 ? games?.btype : games?.name} */}
                  {games?.name}
                </h2>
                {Settings.bookmakerCashOut &&
                  games?.runners?.length !== 3 &&
                  !speedCashOut && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      {teamProfitForGame?.profit !== 0 && (
                        <span
                          style={{
                            fontSize: "10px",
                            color: `${
                              teamProfitForGame?.profit > 0 ? "green" : "red"
                            }`,
                          }}
                        >
                          {teamProfitForGame?.profit?.toFixed(2)}
                        </span>
                      )}

                      <button
                        disabled={
                          !teamProfitForGame ||
                          isGameSuspended(games) ||
                          teamProfitForGame?.profit === 0
                        }
                        onClick={() =>
                          handleCashOutPlaceBet(
                            games,
                            "lay",
                            setOpenBetSlip,
                            setPlaceBetValues,
                            pnlBySelection,
                            token,
                            setShowLogin,
                            teamProfitForGame,
                          )
                        }
                        style={{
                          cursor: `${
                            !teamProfitForGame ||
                            isGameSuspended(games) ||
                            teamProfitForGame?.profit === 0
                              ? "not-allowed"
                              : "pointer"
                          }`,
                          opacity: `${
                            !teamProfitForGame ||
                            isGameSuspended(games) ||
                            teamProfitForGame?.profit === 0
                              ? "0.6"
                              : "1"
                          }`,
                          zIndex: "1000",
                          pointerEvents: "auto",
                        }}
                        _ngcontent-ng-c942213636=""
                        mat-button=""
                        mat-ripple-loader-uninitialized=""
                        mat-ripple-loader-class-name="mat-mdc-button-ripple"
                        className="mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base ng-star-inserted"
                        mat-ripple-loader-
                      >
                        <span className="mdc-button__label">
                          <span> Cashout</span>
                        </span>
                      </button>
                    </div>
                  )}

                {Settings.bookmakerCashOut &&
                  games?.runners?.length !== 3 &&
                  speedCashOut && (
                    <button
                      onClick={() =>
                        setSpeedCashOut({
                          ...speedCashOut,
                          market_name: games?.name,
                          event_name: games?.eventName,
                        })
                      }
                      disabled={isGameSuspended(games)}
                      style={{
                        zIndex: "1000",
                        pointerEvents: "auto",
                        backgroundColor: "#82371b",
                        color: "white",
                      }}
                      _ngcontent-ng-c942213636=""
                      mat-button=""
                      mat-ripple-loader-uninitialized=""
                      mat-ripple-loader-class-name="mat-mdc-button-ripple"
                      className="mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base ng-star-inserted"
                      mat-ripple-loader-
                    >
                      <span className="mdc-button__label">
                        <span> Speed Cashout</span>
                      </span>
                    </button>
                  )}
              </div>
              <div _ngcontent-ng-c942213636="" className="card-header">
                <h3 _ngcontent-ng-c942213636="" className="card-title">
                  Min: 100 | Max: {games?.maxLiabilityPerBet}
                </h3>
                <div _ngcontent-ng-c942213636="" className="lay-back-wrap">
                  <h3 _ngcontent-ng-c942213636="" className="back-bg">
                    Back
                  </h3>
                  <h3 _ngcontent-ng-c942213636="" className="lay-bg">
                    Lay
                  </h3>
                </div>
              </div>
              <div _ngcontent-ng-c942213636="" className="card-body">
                {games?.runners?.map((runner) => {
                  const pnl = pnlBySelection?.filter(
                    (pnl) => pnl?.RunnerId === runner?.id,
                  );
                  return (
                    <div
                      key={runner?.id}
                      _ngcontent-ng-c942213636=""
                      className="data-wrap ng-star-inserted"
                    >
                      <div
                        _ngcontent-ng-c942213636=""
                        className="teamlist-info flex-row-left"
                      >
                        <h3 _ngcontent-ng-c942213636="" className="team-title">
                          {runner?.name}
                        </h3>
                        {pnl &&
                          pnl?.map(({ pnl }, i) => {
                            return (
                              <p
                                _ngcontent-ng-c942213636=""
                                // onClick={() => handleLader(MarketId)}
                                key={i}
                                className={`ng-star-inserted ${
                                  pnl > 0 ? "text-success" : "text-danger"
                                }`}
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                                {pnl}
                              </p>
                            );
                          })}
                      </div>
                      {games?.status === "OPEN" && runner?.status === "OPEN" ? (
                        <div
                          _ngcontent-ng-c942213636=""
                          className="count-v-wrap ng-star-inserted"
                        >
                          <button
                            onClick={() =>
                              handlePlaceBet(
                                games,
                                runner,
                                "back",
                                setOpenBetSlip,
                                setPlaceBetValues,
                                pnlBySelection,
                                setShowLoginWarn,
                                token,
                              )
                            }
                            _ngcontent-ng-c942213636=""
                            mat-flat-button=""
                            mat-ripple-loader-uninitialized=""
                            mat-ripple-loader-class-name="mat-mdc-button-ripple"
                            className="mdc-button mdc-button--unelevated mat-mdc-unelevated-button back-count count-value mat-unthemed mat-mdc-button-base ng-star-inserted"
                            id="d67e0042e8277600f888897d3a4a8849:f05bb1104e8a7ec43d261c1c0e408764back1"
                          >
                            <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                            <span className="mdc-button__label">
                              <h4 _ngcontent-ng-c942213636="">
                                {runner?.back[0]?.price}
                              </h4>{" "}
                            </span>
                            <span className="mat-mdc-focus-indicator"></span>
                            <span className="mat-mdc-button-touch-target"></span>
                          </button>

                          <button
                            onClick={() =>
                              handlePlaceBet(
                                games,
                                runner,
                                "lay",
                                setOpenBetSlip,
                                setPlaceBetValues,
                                pnlBySelection,
                                setShowLoginWarn,
                                token,
                              )
                            }
                            _ngcontent-ng-c942213636=""
                            mat-flat-button=""
                            mat-ripple-loader-uninitialized=""
                            mat-ripple-loader-class-name="mat-mdc-button-ripple"
                            className="mdc-button mdc-button--unelevated mat-mdc-unelevated-button count-value lay-count mat-unthemed mat-mdc-button-base ng-star-inserted"
                            id="d67e0042e8277600f888897d3a4a8849:f05bb1104e8a7ec43d261c1c0e408764lay1"
                          >
                            <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                            <span className="mdc-button__label">
                              <h4 _ngcontent-ng-c942213636="">
                                {runner?.lay[0]?.price}
                              </h4>{" "}
                            </span>
                            <span className="mat-mdc-focus-indicator"></span>
                            <span className="mat-mdc-button-touch-target"></span>
                          </button>
                        </div>
                      ) : (
                        <Suspended statusLabel={runner?.statusLable} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
      {showLogin && (
        <Login
          setShowLogin={setShowLogin}
          errorLogin={errorLogin}
          setErrorLogin={setErrorLogin}
          setGetToken={setGetToken}
        />
      )}
    </>
  );
};

export default Bookmaker;
