/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { Settings } from "../../../api";
import useContextState from "../../../hooks/useContextState";
import { handlePlaceBet } from "../../../utils/handlePlaceBet";
import Suspended from "../Suspended";
import { useParams } from "react-router-dom";
import { handleCashOutPlaceBet } from "../../../utils/handleCashOutPlaceBet";
import Login from "../../../components/modal/Login";

const MatchOdds = ({
  match_odd,
  setOpenBetSlip,
  setPlaceBetValues,
  exposer,
  setShowLoginWarn,
}) => {
  const [errorLogin, setErrorLogin] = useState("");
  const { eventId } = useParams();
  const [teamProfit, setTeamProfit] = useState([]);
  const { token, showLogin, setShowLogin, setGetToken } = useContextState();
  /* exposure */
  let pnlBySelection;
  if (exposer?.pnlBySelection) {
    const obj = exposer?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }

  const computeExposureAndStake = (
    exposureA,
    exposureB,
    runner1,
    runner2,
    gameId
  ) => {
    let runner, largerExposure, layValue, oppositeLayValue, lowerExposure;

    const pnlArr = [exposureA, exposureB];
    const isOnePositiveExposure = onlyOnePositive(pnlArr);

    if (exposureA > exposureB) {
      // Team A has a larger exposure.
      runner = runner1;
      largerExposure = exposureA;
      layValue = runner1?.lay?.[0]?.price;
      oppositeLayValue = runner2?.lay?.[0]?.price;
      lowerExposure = exposureB;
    } else {
      // Team B has a larger exposure.
      runner = runner2;
      largerExposure = exposureB;
      layValue = runner2?.lay?.[0]?.price;
      oppositeLayValue = runner1?.lay?.[0]?.price;
      lowerExposure = exposureA;
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
    };
  };

  function onlyOnePositive(arr) {
    let positiveCount = arr?.filter((num) => num > 0).length;
    return positiveCount === 1;
  }

  useEffect(() => {
    let results = [];
    if (
      match_odd?.length > 0 &&
      exposer?.pnlBySelection &&
      Object.keys(exposer?.pnlBySelection)?.length > 0
    ) {
      match_odd.forEach((game) => {
        const runners = game?.runners || [];
        if (runners?.length === 2) {
          const runner1 = runners[0];
          const runner2 = runners[1];
          const pnl1 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner1?.id
          )?.pnl;
          const pnl2 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner2?.id
          )?.pnl;

          if (pnl1 && pnl2 && runner1 && runner2) {
            const result = computeExposureAndStake(
              pnl1,
              pnl2,
              runner1,
              runner2,
              game?.id
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
  }, [match_odd, eventId, exposer]);

  return (
    <>
      {match_odd?.map((games, i) => {
        const teamProfitForGame = teamProfit?.find(
          (profit) =>
            profit?.gameId === games?.id && profit?.isOnePositiveExposure
        );

        return (
          <div key={i} _ngcontent-ng-c942213636="" className="ng-star-inserted">
            <div
              _ngcontent-ng-c942213636=""
              className={`bookmaker-card card-outer  ${
                games?.maxLiabilityPerBet == "1" ? "disableMo" : ""
              }`}
              id="NXDHP0C"
            >
              <div _ngcontent-ng-c942213636="" className="head-wrap">
                <h2 _ngcontent-ng-c942213636="" className="card-heading">
                  {games?.name?.toUpperCase()}
                </h2>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  {teamProfitForGame?.profit && (
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
                  {Settings.betFairCashOut && games?.runners?.length !== 3 && (
                    <button
                      disabled={!teamProfitForGame}
                      onClick={() =>
                        handleCashOutPlaceBet(
                          games,
                          "lay",
                          setOpenBetSlip,
                          setPlaceBetValues,
                          pnlBySelection,
                          token,
                          setShowLogin,
                          teamProfitForGame
                        )
                      }
                      style={{
                        cursor: `${
                          !teamProfitForGame ? "not-allowed" : "pointer"
                        }`,
                        opacity: `${!teamProfitForGame ? "0.6" : "1"}`,
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
                  )}
                </div>
              </div>
              <div _ngcontent-ng-c942213636="" className="card-header">
                <h3 _ngcontent-ng-c942213636="" className="card-title">
                  Min: {games?.minLiabilityPerBet} | Max:{" "}
                  {games?.maxLiabilityPerBet}
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
                    (pnl) => pnl?.RunnerId === runner?.id
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
                                token
                              )
                            }
                            _ngcontent-ng-c942213636=""
                            mat-flat-button=""
                            mat-ripple-loader-uninitialized=""
                            mat-ripple-loader-class-name="mat-mdc-button-ripple"
                            className="mdc-button mdc-button--unelevated mat-mdc-unelevated-button back-count count-value mat-unthemed mat-mdc-button-base ng-star-inserted"
                          >
                            <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                            <span className="mdc-button__label">
                              <h4 _ngcontent-ng-c942213636="">
                                {runner?.back[0]?.price}
                              </h4>
                              <p _ngcontent-ng-c942213636="">
                                {runner?.back[0]?.size}
                              </p>{" "}
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
                                token
                              )
                            }
                            _ngcontent-ng-c942213636=""
                            mat-flat-button=""
                            mat-ripple-loader-uninitialized=""
                            mat-ripple-loader-class-name="mat-mdc-button-ripple"
                            className="mdc-button mdc-button--unelevated mat-mdc-unelevated-button count-value lay-count mat-unthemed mat-mdc-button-base ng-star-inserted"
                          >
                            <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                            <span className="mdc-button__label">
                              <h4 _ngcontent-ng-c942213636="">
                                {runner?.lay[0]?.price}
                              </h4>
                              <p _ngcontent-ng-c942213636="">
                                {runner?.lay[0]?.size}
                              </p>{" "}
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

export default MatchOdds;
