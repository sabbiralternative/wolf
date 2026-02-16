/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import useCasino from "../../hooks/useCasino";
import useContextState from "../../hooks/useContextState";
import WarningCondition from "../../components/modal/WarningCondition";
import { useNavigate } from "react-router-dom";
import { Settings } from "../../api";
import Warning from "../../components/ui/Notification/Warning";
import useLanguage from "../../hooks/useLanguage";
import { languageValue } from "../../utils/language";
import { LanguageKey } from "../../constant/constant";

const Casino = () => {
  const { valueByLanguage } = useLanguage();
  /* get casino data */
  const { data } = useCasino();
  const { setSportsType, token, isCheckedBonusToken } = useContextState();
  const [showWarning, setShowWarning] = useState(false);
  const [gameInfo, setGameInfo] = useState({ gameName: "", gameId: "" });
  const [warnMessage, setWarnMessage] = useState("");
  const navigate = useNavigate();

  const handleCasino = (id, name) => {
    if (token) {
      if (isCheckedBonusToken) {
        return setWarnMessage("Bonus wallet is available only on sports.");
      }
      if (Settings.casino_currency !== "AED") {
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
    <div
      _ngcontent-ng-c943649379=""
      className="casino-section live-casino game-play mt-2 mb-3 ng-star-inserted"
    >
      {showWarning && (
        <WarningCondition gameInfo={gameInfo} setShowWarning={setShowWarning} />
      )}

      {/* Warning message for bonus wallet */}
      {warnMessage && (
        <Warning message={warnMessage} setMessage={setWarnMessage} />
      )}
      <div _ngcontent-ng-c943649379="" className="game-play-heading">
        <h2 _ngcontent-ng-c943649379="">Casino</h2>
        <a
          _ngcontent-ng-c943649379=""
          routerlink="/live-casino-lobby/live_casino"
          routerlinkactive="active-link"
          className="view-all-link ng-star-inserted"
          onClick={() => setSportsType("casino")}
        >
          {languageValue(valueByLanguage, LanguageKey.VIEW_ALL)}
        </a>
      </div>
      <div
        _ngcontent-ng-c943649379=""
        className="game-type-list ng-star-inserted"
      >
        <ul _ngcontent-ng-c943649379="">
          {data?.map((item, i) => {
            return (
              <li
                key={i}
                onClick={() => handleCasino(item?.game_id, item?.game_name)}
                _ngcontent-ng-c943649379=""
                className="ng-star-inserted"
              >
                <a _ngcontent-ng-c943649379="" className="active">
                  <img
                    _ngcontent-ng-c943649379=""
                    alt=""
                    src={item?.url_thumb}
                  />
                </a>
                <p _ngcontent-ng-c943649379="" className="total-players">
                  <span
                    _ngcontent-ng-c943649379=""
                    role="img"
                    className="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color"
                    aria-hidden="true"
                    data-mat-icon-type="font"
                  >
                    group
                  </span>
                  {item?.active_players}
                </p>
                <div _ngcontent-ng-c943649379="" className="game-detail">
                  <p _ngcontent-ng-c943649379="" className="company-type">
                    {item?.product}
                  </p>
                  <p _ngcontent-ng-c943649379="" className="game-name">
                    {item?.game_name}
                  </p>
                  <p
                    _ngcontent-ng-c943649379=""
                    className="coins-limit ng-star-inserted"
                  >
                    {item?.text}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Casino;
