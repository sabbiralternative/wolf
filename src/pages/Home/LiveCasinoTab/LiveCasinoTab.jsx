/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import WarningCondition from "../../../components/modal/WarningCondition";

import { API, Settings } from "../../../api";
import useContextState from "../../../hooks/useContextState";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Warning from "../../../components/ui/Notification/Warning";
import useLanguage from "../../../hooks/useLanguage";

const LiveCasinoTab = () => {
  const { language } = useLanguage();
  const [showLeftDropdown, setShowLeftDropdown] = useState(false);
  const [showRightDropdown, setShowRightDropdown] = useState(false);
  const [gameList, setGameList] = useState("All");
  const [product, setProduct] = useState("All");
  const [showWarning, setShowWarning] = useState(false);
  const [gameInfo, setGameInfo] = useState({ gameName: "", gameId: "" });
  const { token, sportsType, isCheckedBonusToken } = useContextState();
  const [data, setData] = useState({});
  const [warnMessage, setWarnMessage] = useState("");
  const navigate = useNavigate();

  /* casino thumbnail for 3 tabs */
  useEffect(() => {
    const apiMapping = {
      "live-casino": API.liveCasinoWolf,
      casino: API.slotWolf,
      aura: API.auraWolf,
    };
    let payload = {
      gameList,
      product,
      isHome: false,
    };
    if (Settings.language) {
      payload.language = language;
    }
    const getGames = async () => {
      const res = await axios.post(apiMapping[sportsType], payload);
      if (res?.status === 200) {
        const result = res?.data;
        setData(result);
      }
    };
    getGames();
  }, [gameList, product, sportsType, token, language]);

  useEffect(() => {
    setGameList("All");
    setProduct("All");
  }, [sportsType]);

  const handleAuraCasino = (code, name) => {
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

  const handleLiveSlotCasino = (id, name) => {
    if (token) {
      if (isCheckedBonusToken) {
        return setWarnMessage("Bonus wallet is available only on sports.");
      }
      if (Settings.casinoCurrency !== "AED") {
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
      {sportsType !== "aura" && (
        <div _ngcontent-ng-c1965075897="" className="filter-wrapper">
          <Dropdown
            showLeftDropdown={showLeftDropdown}
            setShowLeftDropdown={setShowLeftDropdown}
            data={data}
            showRightDropdown={showRightDropdown}
            setShowRightDropdown={setShowRightDropdown}
            setProduct={setProduct}
            setGameList={setGameList}
            product={product}
            gameList={gameList}
          />
        </div>
      )}

      {sportsType !== "aura" &&
      data &&
      data?.gameList &&
      Object?.values(data?.gameList !== null) &&
      data?.gameList !== null &&
      data?.gameList !== undefined ? (
        Object.keys(data.gameList)
          .filter((key) => data.gameList[key] !== null)
          ?.map((title, i) => {
            return (
              <div
                key={i}
                _ngcontent-ng-c1965075897=""
                className="casino-section live-casino game-play mt-2 mb-3 ng-star-inserted"
              >
                <div _ngcontent-ng-c1965075897="" className="game-play-heading">
                  <h2 _ngcontent-ng-c1965075897="">{title}</h2>
                </div>
                <div
                  _ngcontent-ng-c1965075897=""
                  className="game-type-list ng-star-inserted"
                >
                  <ul _ngcontent-ng-c1965075897="" className="casino-container">
                    {Array.isArray(data.gameList[title])
                      ? data?.gameList[title]?.map((item, i) => {
                          return (
                            <>
                              <li
                                onClick={() =>
                                  handleLiveSlotCasino(
                                    item?.game_id,
                                    item?.game_name
                                  )
                                }
                                key={i}
                                _ngcontent-ng-c1965075897=""
                                className="ng-star-inserted"
                              >
                                <a
                                  _ngcontent-ng-c1965075897=""
                                  className="active"
                                >
                                  <img
                                    _ngcontent-ng-c1965075897=""
                                    alt=""
                                    src={item?.url_thumb}
                                  />
                                </a>
                                <p
                                  _ngcontent-ng-c1965075897=""
                                  className="total-players"
                                >
                                  <span
                                    _ngcontent-ng-c1965075897=""
                                    role="img"
                                    className="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color"
                                    aria-hidden="true"
                                    data-mat-icon-type="font"
                                  >
                                    group
                                  </span>{" "}
                                  {item?.active_players}
                                </p>
                                <div
                                  _ngcontent-ng-c1965075897=""
                                  className="game-detail"
                                >
                                  <p
                                    _ngcontent-ng-c1965075897=""
                                    className="company-type"
                                  >
                                    {item?.product}
                                  </p>
                                  <p
                                    _ngcontent-ng-c1965075897=""
                                    className="game-name"
                                  >
                                    {item?.game_name}
                                  </p>
                                  <p
                                    _ngcontent-ng-c1965075897=""
                                    className="coins-limit ng-star-inserted"
                                  >
                                    {item?.text}
                                  </p>
                                </div>
                              </li>
                            </>
                          );
                        })
                      : Object?.values(data?.gameList[title])?.map(
                          (item, i) => {
                            return (
                              <li
                                onClick={() =>
                                  handleLiveSlotCasino(
                                    item?.game_id,
                                    item?.game_name
                                  )
                                }
                                key={i}
                                _ngcontent-ng-c1965075897=""
                                className="ng-star-inserted"
                              >
                                <a
                                  _ngcontent-ng-c1965075897=""
                                  className="active"
                                >
                                  <img
                                    _ngcontent-ng-c1965075897=""
                                    alt=""
                                    src={item?.url_thumb}
                                  />
                                </a>
                                <p
                                  _ngcontent-ng-c1965075897=""
                                  className="total-players"
                                >
                                  <span
                                    _ngcontent-ng-c1965075897=""
                                    role="img"
                                    className="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color"
                                    aria-hidden="true"
                                    data-mat-icon-type="font"
                                  >
                                    group
                                  </span>{" "}
                                  {item?.active_players}
                                </p>
                                <div
                                  _ngcontent-ng-c1965075897=""
                                  className="game-detail"
                                >
                                  <p
                                    _ngcontent-ng-c1965075897=""
                                    className="company-type"
                                  >
                                    {item?.product}
                                  </p>
                                  <p
                                    _ngcontent-ng-c1965075897=""
                                    className="game-name"
                                  >
                                    {item?.game_name}
                                  </p>
                                  <p
                                    _ngcontent-ng-c1965075897=""
                                    className="coins-limit ng-star-inserted"
                                  >
                                    {item?.text}
                                  </p>
                                </div>
                              </li>
                            );
                          }
                        )}
                  </ul>
                </div>
              </div>
            );
          })
      ) : (
        <div
          _ngcontent-ng-c1965075897=""
          className="casino-section live-casino game-play mt-2 mb-3 ng-star-inserted"
        >
          {/* <div _ngcontent-ng-c1965075897="" className="game-play-heading">
                <h2 _ngcontent-ng-c1965075897="">{title}</h2>
              </div> */}
          <div
            _ngcontent-ng-c1965075897=""
            className="game-type-list ng-star-inserted"
          >
            <ul _ngcontent-ng-c1965075897="">
              {data?.data?.map((item, i) => {
                return (
                  <li
                    onClick={() =>
                      handleAuraCasino(item?.game_id, item?.game_name)
                    }
                    key={i}
                    _ngcontent-ng-c1965075897=""
                    className="ng-star-inserted"
                  >
                    <a _ngcontent-ng-c1965075897="" className="active">
                      <img
                        _ngcontent-ng-c1965075897=""
                        alt=""
                        src={item?.img}
                      />
                    </a>
                    <p _ngcontent-ng-c1965075897="" className="total-players">
                      <span
                        _ngcontent-ng-c1965075897=""
                        role="img"
                        className="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color"
                        aria-hidden="true"
                        data-mat-icon-type="font"
                      >
                        group
                      </span>{" "}
                      {item?.active_players}
                    </p>
                    <div _ngcontent-ng-c1965075897="" className="game-detail">
                      <p _ngcontent-ng-c1965075897="" className="company-type">
                        {item?.provider_name}
                      </p>
                      <p _ngcontent-ng-c1965075897="" className="game-name">
                        {item?.game_name}
                      </p>
                      <p
                        _ngcontent-ng-c1965075897=""
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
      )}
    </div>
  );
};

export default LiveCasinoTab;
