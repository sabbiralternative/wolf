/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import WarningCondition from "../../components/modal/WarningCondition";
import useContextState from "../../hooks/useContextState";
import useGoCasino from "../../hooks/useGoCasino";
import { useNavigate } from "react-router-dom";
import Warning from "../../components/ui/Notification/Warning";
import useLanguage from "../../hooks/useLanguage";
import { languageValue } from "../../utils/language";
import { LanguageKey } from "../../constant/constant";

const GoCasino = () => {
  const { valueByLanguage } = useLanguage();
  /* get aura casino (go casino) */
  const { data } = useGoCasino();
  const { setSportsType, token, isCheckedBonusToken } = useContextState();
  const [showWarning, setShowWarning] = useState(false);
  const [warnMessage, setWarnMessage] = useState(false);
  const navigate = useNavigate();

  console.log(data);

  const handleCasino = (code, name) => {
    if (token) {
      if (isCheckedBonusToken) {
        return setWarnMessage("Bonus wallet is available only on sports.");
      } else {
        navigate(`/casino/${name.replace(/ /g, "")}/${code}`);
      }
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div
      _ngcontent-ng-c943649379=""
      className="casino-section go-casino game-play mt-2 mb-3 ng-star-inserted"
    >
      {/* Wanning based on condition */}
      {showWarning && <WarningCondition setShowWarning={setShowWarning} />}

      {/* Bonus wallet message */}
      {warnMessage && (
        <Warning message={warnMessage} setMessage={setWarnMessage} />
      )}
      <div _ngcontent-ng-c943649379="" className="game-play-heading">
        <h2 _ngcontent-ng-c943649379="">Card Games</h2>
        <a
          _ngcontent-ng-c943649379=""
          routerlink="/casino-bmk-lobby"
          routerlinkactive="active-link"
          className="view-all-link ng-star-inserted"
          onClick={() => setSportsType("aura")}
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
                onClick={() => handleCasino(item?.game_code, item?.game_name)}
                key={i}
                _ngcontent-ng-c943649379=""
                className="ng-star-inserted"
              >
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
                <a _ngcontent-ng-c943649379="" className="active">
                  <img _ngcontent-ng-c943649379="" alt="" src={item?.img} />
                </a>
                <div _ngcontent-ng-c943649379="" className="game-detail">
                  {/* <p _ngcontent-ng-c943649379="" className="company-type">
                    {item?.provider_name}
                  </p> */}
                  <p _ngcontent-ng-c943649379="" className="game-name">
                    {item?.game_name}
                  </p>
                  {/* <p
                    _ngcontent-ng-c943649379=""
                    className="coins-limit ng-star-inserted"
                  >
                    {item?.text}
                  </p> */}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default GoCasino;
