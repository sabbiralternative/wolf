import { useEffect, useState } from "react";
import useContextState from "../../hooks/useContextState";
import Bookmaker from "./GameType/Bookmaker";
import Bookmaker2 from "./GameType/Bookmaker2";
import Fancy from "./GameType/Fancy";
import FancyOne from "./GameType/FancyOne";
import MatchOdds from "./GameType/MatchOdds";
import HorseGreyhound from "./GameType/HorseGreyhound";
import OverByOver from "./GameType/OverByOver";
import SportsBook from "./GameType/SportsBook/SportsBook";
import { useParams } from "react-router-dom";
// import ScoreCard from "./ScoreCard";
import CricketScore from "./CricketScore";

/* eslint-disable react/no-unknown-property */
const MarketTab = ({
  sportsBook,
  data,
  exposer,
  setOpenBetSlip,
  showIFrame,
  showScore,
  match_odds,
  setMatch_odds,
  setShowLoginWarn,
  score,
  iFrame,
  iScore,
}) => {
  const [bookmarker, setBookmarker] = useState([]);
  const [bookmarker2, setBookmarker2] = useState([]);
  const [normal, setNormal] = useState([]);
  const [fancy1, setFancy1] = useState([]);
  const [overByOver, setOverByOver] = useState([]);
  const { setPlaceBetValues } = useContextState();
  const { eventTypeId } = useParams();

  /* Filtered all the game  */
  useEffect(() => {
    const filterMatch_odds = data?.filter(
      (match_odd) =>
        match_odd.btype === "MATCH_ODDS" && match_odd?.visible == true
    );
    setMatch_odds(filterMatch_odds);

    const bookmarkerFilter = data?.filter(
      (bookmarker) =>
        bookmarker.btype === "BOOKMAKER" && bookmarker?.visible == true
    );
    setBookmarker(bookmarkerFilter);

    const filterBookmarker2 = data?.filter(
      (bookmarker2) =>
        bookmarker2.btype === "BOOKMAKER2" && bookmarker2?.visible == true
    );
    setBookmarker2(filterBookmarker2);

    const normalFilter = data?.filter(
      (normal) =>
        normal.btype === "FANCY" &&
        normal.tabGroupName === "Normal" &&
        normal?.visible == true
    );
    setNormal(normalFilter);

    const fancy1Filter = data?.filter(
      (fancy1) =>
        fancy1.btype === "ODDS" &&
        fancy1.tabGroupName === "Fancy1" &&
        fancy1?.visible == true
    );
    setFancy1(fancy1Filter);

    const overByOverFilter = data?.filter(
      (overByOver) =>
        overByOver.btype === "FANCY" &&
        overByOver.tabGroupName === "Over By Over" &&
        overByOver?.visible == true
    );
    setOverByOver(overByOverFilter);
  }, [data]);

  return (
    <div className="mat-mdc-tab-body-wrapper">
      <div
        role="tabpanel"
        className="mat-mdc-tab-body mat-tab-body ng-tns-c737557735-1 mat-mdc-tab-body-active ng-star-inserted"
        id="mat-tab-content-0-0"
        aria-labelledby="mat-tab-label-0-0"
      >
        <div
          cdkscrollable=""
          className="mat-mdc-tab-body-content ng-tns-c737557735-1 ng-trigger ng-trigger-translateTab"
          style={{ transform: "none" }}
        >
          <div
            _ngcontent-ng-c942213636=""
            className="tab-body sports-tab ng-star-inserted"
          >
            <div
              _ngcontent-ng-c942213636=""
              className="live-match-screen ng-star-inserted"
            >
              {showIFrame && score?.hasVideo && iFrame && (
                <iframe
                  _ngcontent-ng-c942213636=""
                  style={{
                    width: "100%",
                    border: "0px",
                  }}
                  src={iFrame}
                  // referrerPolicy={
                  //   iFrameUrl?.ref === false ? "no-referrer" : "no-referrer"
                  // }
                ></iframe>
              )}

              {showScore && score?.tracker && (
                <div
                  style={{ height: "125px", width: "100%", overflow: "hidden" }}
                >
                  <iframe
                    // _ngcontent-ng-c942213636=""
                    style={{
                      width: "100%",
                      border: "0px",
                    }}
                    src={score?.tracker}
                  ></iframe>
                </div>
              )}

              {/* {data?.[0]?.score?.length > 0 &&
                eventTypeId == 4 &&
                data?.[0]?.score?.length !== 0 &&
                data?.[0]?.score?.map((team, i) => {
                  return (
                    <div
                      key={i}
                      _ngcontent-ng-c3799324686=""
                      class="live-score-section ng-star-inserted"
                    >
                      <div _ngcontent-ng-c3799324686="" class="score-wrap">
                        <span _ngcontent-ng-c3799324686="" class="bowling-team">
                          <span class="small" _ngcontent-ng-c3799324686="">
                            {team?.team1Name}: {team?.team1Score}
                          </span>

                          <span
                            class="small"
                            _ngcontent-ng-c3799324686=""
                          ></span>
                        </span>

                        <span _ngcontent-ng-c3799324686="" class="batting-team">
                          <span class="small" _ngcontent-ng-c3799324686="">
                            {team?.team2Name}: {team?.team2Score}
                          </span>
                        </span>
                      </div>

                      <div
                        _ngcontent-ng-c3799324686=""
                        class="score-overlay ng-star-inserted"
                        style={{
                          height: `${team?.commentary ? "20px" : "1px"}`,
                          fontSize: `${team?.commentary ? "12px" : "0px"}`,
                          fontFamily: "open_bold",
                        }}
                      >
                        {team?.commentary}
                      </div>
                      <div
                        _ngcontent-ng-c3799324686=""
                        class="last-balls-record multiple-overs"
                      >
                        <div _ngcontent-ng-c3799324686="" class="previous-over">
                          <span _ngcontent-ng-c3799324686="" class="mat-label">
                            Recent Over
                          </span>
                          <ul _ngcontent-ng-c3799324686="">
                            {team?.recent?.map((run, i) => (
                              <li
                                key={i}
                                _ngcontent-ng-c3799324686=""
                                class="ng-star-inserted"
                              >
                                <p
                                  className={`_${run > 0 ? "4" : ""}`}
                                  _ngcontent-ng-c3799324686=""
                                >
                                  {run}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <span _ngcontent-ng-c3799324686="" class="batting-team">
                          <span
                            style={{ color: "black", fontSize: "12px" }}
                            class="small"
                            _ngcontent-ng-c3799324686=""
                          >
                            {team?.target}
                          </span>
                        </span>
                      </div>
                    </div>
                  );
                })} */}
            </div>

            <div _ngcontent-ng-c942213636="" className="mkt-tab-section">
              {/* {eventTypeId == 4 &&
                data?.[0]?.score2?.length !== 0 &&
                !Array.isArray(data?.[0]?.score2) && (
                  <ScoreCard score2={data?.[0]?.score2} />
                )} */}
              {eventTypeId == 4 && iScore && <CricketScore iscore={iScore} />}
              {match_odds && match_odds?.length > 0 && (
                <MatchOdds
                  match_odd={match_odds}
                  setOpenBetSlip={setOpenBetSlip}
                  setPlaceBetValues={setPlaceBetValues}
                  exposer={exposer}
                  setShowLoginWarn={setShowLoginWarn}
                />
              )}

              {bookmarker && bookmarker?.length > 0 && (
                <Bookmaker
                  bookmarker={bookmarker}
                  setOpenBetSlip={setOpenBetSlip}
                  setPlaceBetValues={setPlaceBetValues}
                  exposer={exposer}
                  setShowLoginWarn={setShowLoginWarn}
                />
              )}
              {bookmarker2 && bookmarker2?.length > 0 && (
                <Bookmaker2
                  bookmarker2={bookmarker2}
                  setOpenBetSlip={setOpenBetSlip}
                  setPlaceBetValues={setPlaceBetValues}
                  exposer={exposer}
                  setShowLoginWarn={setShowLoginWarn}
                />
              )}
              {normal && normal?.length > 0 && (
                <Fancy
                  normal={normal}
                  setOpenBetSlip={setOpenBetSlip}
                  setPlaceBetValues={setPlaceBetValues}
                  exposer={exposer}
                  setShowLoginWarn={setShowLoginWarn}
                />
              )}

              {fancy1 && fancy1?.length > 0 && (
                <FancyOne
                  FancyOne={fancy1}
                  setOpenBetSlip={setOpenBetSlip}
                  setPlaceBetValues={setPlaceBetValues}
                  exposer={exposer}
                  setShowLoginWarn={setShowLoginWarn}
                />
              )}
              {sportsBook && Object.keys(sportsBook)?.length > 0 && (
                <SportsBook sportsBook={sportsBook} />
              )}

              {overByOver && overByOver?.length > 0 && (
                <OverByOver
                  normal={overByOver}
                  setOpenBetSlip={setOpenBetSlip}
                  setPlaceBetValues={setPlaceBetValues}
                  exposer={exposer}
                  setShowLoginWarn={setShowLoginWarn}
                />
              )}

              {eventTypeId == 7 || eventTypeId == 4339 ? (
                <HorseGreyhound
                  data={data}
                  setOpenBetSlip={setOpenBetSlip}
                  setPlaceBetValues={setPlaceBetValues}
                  exposer={exposer}
                  setShowLoginWarn={setShowLoginWarn}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketTab;
