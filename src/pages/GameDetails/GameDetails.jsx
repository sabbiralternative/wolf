import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BetSlip from "../../components/modal/BetSlip";
import useContextState from "../../hooks/useContextState";
import Success from "../../components/ui/Notification/Success";
import useCurrentBets from "../../hooks/useCurrentBets";
import useExposer from "../../hooks/useExposer";
import Tabs from "./Tabs";
import OpenBetsTab from "./OpenBetsTab";
import MarketTab from "./MarketTab";
import Warning from "../../components/ui/Notification/Warning";
import axios from "axios";
import { API, Settings } from "../../api";
import useBalance from "../../hooks/useBalance";
import handleDecryptData from "../../utils/handleDecryptData";
import Score from "./Score";
import { useSportsVideo } from "../../hooks/useIFrame";

/* eslint-disable react/no-unknown-property */
const GameDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { eventId, eventTypeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [score, setScore] = useState({});
  const [sportsBook, setSportsBook] = useState({});
  const { placeBetValues, token, openBetSlip, setOpenBetSlip, tokenLoading } =
    useContextState();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [tabs, setTabs] = useState("market");
  const { myBets, refetchCurrentBets } = useCurrentBets(eventId);
  const { exposer, refetchExposure } = useExposer(eventId);
  const [showIFrame, setShowIFrame] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [match_odds, setMatch_odds] = useState([]);
  const [showLoginWarn, setShowLoginWarn] = useState("");
  const { refetchBalance } = useBalance();
  const [iFrame, setIframe] = useState(null);
  const { mutate } = useSportsVideo();

  const handleGetSportsVideo = () => {
    const encryptedVideoData = {
      eventTypeId: eventTypeId,
      eventId: eventId,
      type: "video",
      casinoCurrency: Settings.casinoCurrency,
    };
    mutate(encryptedVideoData, {
      onSuccess: (data) => {
        if (data?.success) {
          setIframe(data?.result?.url);
        }
      },
    });
  };

  useEffect(() => {
    if (!tokenLoading && !Settings.balanceApiLoop) {
      refetchBalance();
    }
  }, []);

  /* get game details */
  useEffect(() => {
    const getGameDetails = async () => {
      const res = await axios.get(
        `${API.eventDetails}/${eventTypeId}/${eventId}`,
        {
          headers: {
            "Cache-Control": "public",
            "max-age": 1,
          },
        }
      );
      const data = res.data;
      const decryptionData = await handleDecryptData(JSON.stringify(data));
      setLoading(false);

      if (decryptionData?.success) {
        setData(decryptionData?.result);
        setScore(decryptionData?.score);
        setSportsBook(decryptionData?.sportsbook?.Result);
      }
    };
    getGameDetails();
    /* refetch after some millisecond */
    const intervalId = setInterval(getGameDetails, Settings.interval);
    return () => clearInterval(intervalId);
  }, [eventId, eventTypeId]);

  if (loading) {
    return;
  }

  let footballScore;
  if (match_odds?.[0]?.eventTypeId == 1 && match_odds?.[0]?.score) {
    footballScore = match_odds?.[0]?.score;
  }

  return (
    <>
      <div _ngcontent-ng-c942213636="" className="page-body">
        {/* Warning modal */}
        {showLoginWarn && (
          <Warning message={showLoginWarn} setMessage={setShowLoginWarn} />
        )}
        <div _ngcontent-ng-c942213636="" className="game-tab ng-star-inserted">
          <div
            _ngcontent-ng-c942213636=""
            className="pagetop-bar"
            style={{
              paddingTop: "2px",
              paddingBottom: "2px",
              position: "static",
            }}
          >
            <div
              _ngcontent-ng-c942213636=""
              className="team-play-bar title-bar"
            >
              {/* score */}
              {eventTypeId == 2 || eventTypeId == 1 ? (
                <Score score={score} eventTypeId={eventTypeId} />
              ) : (
                <>
                  {footballScore && (
                    <table style={{ fontSize: "10px", color: "white" }}>
                      <tbody>
                        <tr>
                          <td rowspan="2" style={{ color: "greenyellow" }}>
                            {" "}
                            {footballScore?.inplay_status === "HT" && "HT"}
                            {footballScore?.additional_time == null &&
                              footballScore?.inplay_status !== "HT" &&
                              footballScore?.current_time}
                            {footballScore?.additional_time !== null &&
                              footballScore?.inplay_status !== "HT" &&
                              `${footballScore?.current_time} + ${footballScore?.additional_time}`}
                          </td>

                          <td
                            style={{
                              width: "15px",
                              height: "10px",
                              textAlign: "right",
                            }}
                          >
                            {footballScore?.hscore}
                          </td>
                          <td style={{ height: "10px" }}>
                            {footballScore?.ht}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              width: "15px",
                              height: "10px",
                              textAlign: "right",
                            }}
                          >
                            {footballScore?.ascore}
                          </td>
                          <td style={{ height: "10px" }}>
                            {footballScore?.at}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}

                  {!footballScore && (
                    <>
                      <div
                        _ngcontent-ng-c942213636=""
                        className="playing-teams"
                      >
                        <button
                          _ngcontent-ng-c942213636=""
                          mat-icon-button=""
                          mattooltipposition="below"
                          mattooltiphidedelay="1000"
                          tooltiptouchgestures="on"
                          className="mat-mdc-tooltip-trigger mdc-icon-button mat-mdc-icon-button mat-unthemed mat-mdc-button-base"
                          mat-ripple-loader-uninitialized=""
                          mat-ripple-loader-class-name="mat-mdc-button-ripple"
                          mat-ripple-loader-centered=""
                          aria-describedby="cdk-describedby-message-ng-1-2"
                          cdk-describedby-host="ng-1"
                        >
                          <span className="mat-mdc-button-persistent-ripple mdc-icon-button__ripple"></span>
                          i <span className="mat-mdc-focus-indicator"></span>
                          <span className="mat-mdc-button-touch-target"></span>
                        </button>

                        <span
                          _ngcontent-ng-c942213636=""
                          className="ng-star-inserted"
                        >
                          {data?.length > 0 && data[0]?.eventName}
                        </span>
                      </div>

                      <div
                        _ngcontent-ng-c942213636=""
                        className="playing-teams"
                      >
                        <span
                          _ngcontent-ng-c942213636=""
                          className="ng-star-inserted"
                        >
                          {data?.length > 0 && data[0]?.openDate}
                        </span>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div
            _ngcontent-ng-c942213636=""
            ngskiphydration=""
            mat-stretch-tabs="true"
            disablepagination="true"
            className="mat-mdc-tab-group mat-tab-group mat-primary mat-mdc-tab-group-stretch-tabs"
            /*  style="--mat-tab-animation-duration: 500ms" */
          >
            <Tabs
              handleGetSportsVideo={handleGetSportsVideo}
              myBets={myBets}
              setTabs={setTabs}
              tabs={tabs}
              setShowIFrame={setShowIFrame}
              showIFrame={showIFrame}
              showScore={showScore}
              setShowScore={setShowScore}
              score={score}
            />

            {tabs === "market" && (
              <MarketTab
                iFrame={iFrame}
                score={score}
                sportsBook={sportsBook}
                data={data}
                setOpenBetSlip={setOpenBetSlip}
                exposer={token && exposer}
                showIFrame={showIFrame}
                showScore={showScore}
                setShowScore={setShowScore}
                match_odds={match_odds}
                setMatch_odds={setMatch_odds}
                setShowLoginWarn={setShowLoginWarn}
              />
            )}
            {tabs === "openBets" && <OpenBetsTab myBets={myBets} />}
          </div>
        </div>
      </div>

      {/*  <!-- betslip start --> */}
      {openBetSlip && (
        <BetSlip
          setOpenBetSlip={setOpenBetSlip}
          placeBetValues={placeBetValues}
          refetchExposure={refetchExposure}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          refetchCurrentBets={refetchCurrentBets}
        />
      )}
      {errorMessage && (
        <Success
          message={errorMessage}
          success={false}
          setMessage={setErrorMessage}
        />
      )}
      {successMessage && (
        <Success
          message={successMessage}
          success={true}
          setMessage={setSuccessMessage}
        />
      )}
      {/*   <!-- betslip end --> */}
    </>
  );
};

export default GameDetails;
