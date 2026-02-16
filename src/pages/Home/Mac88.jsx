/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetMac88 from "../../hooks/useGetMac88";
import WarningCondition from "../../components/modal/WarningCondition";
import { Settings } from "../../api";
import useContextState from "../../hooks/useContextState";
import Warning from "../../components/ui/Notification/Warning";

const Mac88 = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [gameInfo, setGameInfo] = useState({ gameName: "", gameId: "" });
  const { token, isCheckedBonusToken } = useContextState();
  const [warnMessage, setWarnMessage] = useState("");
  const navigate = useNavigate();
  const { data } = useGetMac88();

  const handleLiveSlotCasino = (id, name) => {
    if (token) {
      if (isCheckedBonusToken) {
        return setWarnMessage("Bonus wallet is available only on sports.");
      }
      if (Settings.casino_currency !== "AED") {
        console.log("ok");
        navigate(`/casino/${name.replace(/ /g, "")}/${id}`);
      } else {
        setGameInfo({ gameName: "", gameId: "" });
        setGameInfo({ gameName: name, gameId: id });
        setShowWarning(true);
      }
    } else {
      setShowWarning(true);
    }
  };
  return (
    <div _ngcontent-ng-c1965075897="" className="page-body">
      {showWarning && (
        <WarningCondition gameInfo={gameInfo} setShowWarning={setShowWarning} />
      )}
      {/* Warning message for bonus wallet */}
      {warnMessage && (
        <Warning message={warnMessage} setMessage={setWarnMessage} />
      )}

      <div
        _ngcontent-ng-c1965075897=""
        className="casino-section live-casino game-play mt-2 mb-3 ng-star-inserted"
      >
        <div
          _ngcontent-ng-c1965075897=""
          className="game-type-list ng-star-inserted"
        >
          <ul _ngcontent-ng-c1965075897="" className="casino-container">
            {data?.map((item, i) => {
              return (
                <li
                  onClick={() =>
                    handleLiveSlotCasino(item?.game_id, item?.game_name)
                  }
                  key={i}
                  _ngcontent-ng-c1965075897=""
                  className="ng-star-inserted"
                >
                  <a _ngcontent-ng-c1965075897="" className="active">
                    <img _ngcontent-ng-c1965075897="" alt="" src={item?.img} />
                  </a>
                  <div
                    _ngcontent-ng-c1965075897=""
                    className="game-detail"
                    style={{
                      minHeight: "50px",
                      padding: "0px",
                      position: "relative",
                    }}
                  >
                    <p
                      style={{ position: "absolute", top: "50%", left: "5px" }}
                      _ngcontent-ng-c1965075897=""
                      className="game-name"
                    >
                      {item?.game_name}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Mac88;
