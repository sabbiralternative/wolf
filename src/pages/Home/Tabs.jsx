/* eslint-disable react/no-unknown-property */

import { useNavigate } from "react-router-dom";
import useContextState from "../../hooks/useContextState";
import useLatestEvent from "../../hooks/useLatestEvent";
import { Settings } from "../../api";
import useLanguage from "../../hooks/useLanguage";
import { languageValue } from "../../utils/language";
import { LanguageKey } from "../../constant/constant";
import { useState } from "react";
import WarningCondition from "../../components/modal/WarningCondition";
import assets from "../../assets";

const Tabs = () => {
  const { setShowLogin, token } = useContextState();
  const { valueByLanguage } = useLanguage();
  const { setSportsType, sportsType } = useContextState();
  const [showWarning, setShowWarning] = useState(false);
  const [gameInfo, setGameInfo] = useState({ gameName: "", gameId: "" });
  const { latestEvents } = useLatestEvent();
  const navigate = useNavigate();

  const handleNavigate = (sportsType) => {
    setSportsType(sportsType);
    navigate("/");
  };

  const handleNavigateToIFrame = (name, id) => {
    if (token) {
      if (Settings.casinoCurrency !== "AED") {
        navigate(`/casino/${name}/${id}`);
      } else {
        setGameInfo({ gameName: "", gameId: "" });
        setGameInfo({ gameName: name, gameId: id });
        setShowWarning(true);
      }
    } else {
      setShowLogin(true);
    }
  };

  return (
    <>
      {showWarning && (
        <WarningCondition gameInfo={gameInfo} setShowWarning={setShowWarning} />
      )}
      <div
        _ngcontent-ng-c943649379=""
        _nghost-ng-c2582205232=""
        className="ng-star-inserted"
      >
        <div _ngcontent-ng-c2582205232="" className="pagetab-wrapper">
          {latestEvents?.length > 0 && (
            <div
              _ngcontent-ng-c2582205232=""
              className="latest-events ng-star-inserted"
            >
              {latestEvents?.map((item, i) => {
                return (
                  <div
                    onClick={() => {
                      navigate(
                        `/game-details/${item?.eventTypeId}/${item?.eventId}`,
                      );
                    }}
                    key={i}
                    _ngcontent-ng-c2582205232=""
                    className="le-item ng-star-inserted"
                  >
                    <h2
                      _ngcontent-ng-c2582205232=""
                      className="ng-star-inserted"
                    >
                      <span _ngcontent-ng-c2582205232="" className="blink-it">
                        {item?.eventName}
                      </span>
                    </h2>
                  </div>
                );
              })}
            </div>
          )}

          <div _ngcontent-ng-c2582205232="" className="pagetab-header">
            {/* <div
              onClick={() => navigate("/game-details/4/27996014")}
              _ngcontent-ng-c2582205232=""
              routerlinkactive="active-link"
              className={`pagetab-item ng-star-inserted   `}
            >
              <div _ngcontent-ng-c2582205232="" className={`icon-wrap `}>
                <img
                  _ngcontent-ng-c2582205232=""
                  alt="Tab Icon"
                  src="/assets/img/ball.svg"
                />
              </div>
              <div _ngcontent-ng-c2582205232="" className="tab-label">
                BBL
              </div>
            </div> */}
            {Settings?.referral && (
              <div
                onClick={() => {
                  token ? navigate("/affiliate") : setShowLogin(true);
                }}
                _ngcontent-ng-c2582205232=""
                routerlinkactive="active-link"
                className={`pagetab-item ng-star-inserted   `}
              >
                <div _ngcontent-ng-c2582205232="" className={`icon-wrap `}>
                  <img
                    style={{
                      filter: "invert(1)",
                      height: "18px",
                      objectFit: "contain",
                    }}
                    _ngcontent-ng-c2582205232=""
                    alt="Tab Icon"
                    src={assets.affiliate}
                  />
                </div>
                <div _ngcontent-ng-c2582205232="" className="tab-label">
                  {/* {valueByLanguage ? valueByLanguage?.CRICKET : "Cricket"} */}
                  Affiliate
                </div>
              </div>
            )}

            <div
              onClick={() => handleNavigate(4)}
              _ngcontent-ng-c2582205232=""
              routerlinkactive="active-link"
              className={`pagetab-item ng-star-inserted   ${
                sportsType === 4 && location.pathname === "/"
                  ? "active-link"
                  : ""
              }`}
            >
              <div
                _ngcontent-ng-c2582205232=""
                className={`icon-wrap ${
                  sportsType === 4 && location.pathname === "/"
                    ? "rotate-animation"
                    : ""
                }`}
              >
                <img
                  _ngcontent-ng-c2582205232=""
                  alt="Tab Icon"
                  src="/assets/img/ball.svg"
                />
              </div>
              <div _ngcontent-ng-c2582205232="" className="tab-label">
                {/* {valueByLanguage ? valueByLanguage?.CRICKET : "Cricket"} */}
                {languageValue(valueByLanguage, LanguageKey.CRICKET)}
              </div>
            </div>
            <div
              onClick={() => handleNavigate(1)}
              _ngcontent-ng-c2582205232=""
              routerlinkactive="active-link"
              className={`pagetab-item ng-star-inserted   ${
                sportsType === 1 && location.pathname === "/"
                  ? "active-link"
                  : ""
              }`}
            >
              <div
                _ngcontent-ng-c2582205232=""
                className={`icon-wrap ${
                  sportsType === 1 && location.pathname === "/"
                    ? "rotate-animation"
                    : ""
                }`}
              >
                <img
                  _ngcontent-ng-c2582205232=""
                  alt="Tab Icon"
                  src="/assets/img/soccer.svg"
                />
              </div>
              <div _ngcontent-ng-c2582205232="" className="tab-label">
                {languageValue(valueByLanguage, LanguageKey.FOOTBALL)}
              </div>
            </div>
            <div
              onClick={() => handleNavigate(2)}
              _ngcontent-ng-c2582205232=""
              routerlinkactive="active-link"
              className={`pagetab-item ng-star-inserted   ${
                sportsType === 2 && location.pathname === "/"
                  ? "active-link"
                  : ""
              }`}
            >
              {/* <p
              _ngcontent-ng-c2582205232=""
              className="newgame ng-star-inserted"
            >
              Started
            </p> */}
              <div
                _ngcontent-ng-c2582205232=""
                className={`icon-wrap ${
                  sportsType === 2 && location.pathname === "/"
                    ? "rotate-animation"
                    : ""
                }`}
              >
                <img
                  _ngcontent-ng-c2582205232=""
                  alt="Tab Icon"
                  src="/assets/img/tennis.svg"
                />
              </div>
              <div _ngcontent-ng-c2582205232="" className="tab-label">
                {languageValue(valueByLanguage, LanguageKey.TENNIS)}
              </div>
            </div>

            <div
              onClick={() => handleNavigateToIFrame("sportsbook", "550000")}
              _ngcontent-ng-c2582205232=""
              routerlinkactive="active-link"
              className={`pagetab-item ng-star-inserted   `}
            >
              {/* <p
              _ngcontent-ng-c2582205232=""
              className="newgame ng-star-inserted"
            >
              Started
            </p> */}
              <div _ngcontent-ng-c2582205232="" className={`icon-wrap`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  height="20"
                  width="20"
                  fill="white"
                >
                  <path d="M400 0L176 0c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8L24 64C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9L192 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-26.1 0C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24L446.4 64c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112l84.4 0c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6l84.4 0c-5.1 66.3-31.1 111.2-63 142.3z"></path>
                </svg>
              </div>
              <div _ngcontent-ng-c2582205232="" className="tab-label">
                Sportsbook
              </div>
            </div>

            <div
              onClick={() => handleNavigate(5)}
              _ngcontent-ng-c2582205232=""
              routerlinkactive="active-link"
              className={`pagetab-item ng-star-inserted   ${
                sportsType === 5 && location.pathname === "/"
                  ? "active-link"
                  : ""
              }`}
            >
              {/* <p
              _ngcontent-ng-c2582205232=""
              className="newgame ng-star-inserted"
            >
              Started
            </p> */}
              <div
                _ngcontent-ng-c2582205232=""
                className={`icon-wrap ${
                  sportsType === 5 && location.pathname === "/"
                    ? "rotate-animation"
                    : ""
                }`}
              >
                <img
                  _ngcontent-ng-c2582205232=""
                  alt="Tab Icon"
                  src="/assets/img/kabbadi.svg"
                />
              </div>
              <div _ngcontent-ng-c2582205232="" className="tab-label">
                {languageValue(valueByLanguage, LanguageKey.KABADDI)}
              </div>
            </div>
            <div
              onClick={() => navigate("/horse-racing")}
              _ngcontent-ng-c2582205232=""
              routerlinkactive="active-link"
              className={`pagetab-item ng-star-inserted   ${
                location.pathname === "/horse-racing" ? "active-link" : ""
              }`}
            >
              {/* <p
              _ngcontent-ng-c2582205232=""
              className="newgame ng-star-inserted"
            >
              Started
            </p> */}
              <div
                _ngcontent-ng-c2582205232=""
                className={`icon-wrap ${
                  location.pathname === "/horse-racing"
                    ? "rotate-animation"
                    : ""
                }`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5784 10.3261L17.0501 9.55133C17.0501 9.55133 15.6414 5.16856 14.3867 3.89579C14.3867 3.89579 13.9464 1.70441 14.3867 0.68619C14.3867 0.68619 13.6162 1.12889 13.3741 1.56053C13.3741 1.56053 13.4732 0.243487 13.7153 0C13.7153 0 11.5141 0.608717 11.1949 2.29099C11.1949 2.29099 6.68247 2.54554 4.23914 4.54878C2.58824 5.89902 1.46563 7.16073 0.629169 9.47385C-0.0642086 11.3885 -0.691551 14.2993 1.74078 17.3761C4.98755 21.4711 11.338 21.9913 11.338 21.9913C11.338 21.9913 12.4826 18.7042 10.9198 16.6788C9.76415 15.1737 8.28935 11.3553 10.5896 9.72841C9.87421 8.53311 9.83019 7.205 10.1053 5.36778C9.91823 7.92439 11.1949 9.81695 11.1949 9.81695C11.7012 10.4589 12.9889 11.8977 14.5958 12.0858C14.5958 12.0858 14.8379 14.576 17.3583 13.2036C18.0076 12.8384 18.2608 11.3111 17.5784 10.3261Z"
                    fill="#fff"
                  ></path>
                </svg>
              </div>
              <div _ngcontent-ng-c2582205232="" className="tab-label">
                {languageValue(valueByLanguage, LanguageKey.HORSE)}
              </div>
            </div>
            <div
              onClick={() => navigate("/greyhound-racing")}
              _ngcontent-ng-c2582205232=""
              routerlinkactive="active-link"
              className={`pagetab-item ng-star-inserted   ${
                location.pathname === "/greyhound-racing" ? "active-link" : ""
              }`}
            >
              {/* <p
              _ngcontent-ng-c2582205232=""
              className="newgame ng-star-inserted"
            >
              Started
            </p> */}
              <div
                _ngcontent-ng-c2582205232=""
                className={`icon-wrap ${
                  location.pathname === "/greyhound-racing"
                    ? "rotate-animation"
                    : ""
                }`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.44232 8.90395C5.88416 8.90395 5.70714 16.1059 6.2631 20C6.2631 20 4.03942 19.4435 2.37117 18.3309C0.702907 17.2183 0.147685 15.5494 0.147685 15.5494C-0.741855 11.0991 2.77077 6.49335 4.43866 4.45361L6.31223 6.32907C5.08824 4.93769 3.77795 1.77694 4.99462 0.559553C6.32893 -0.775551 8.88636 0.559553 9.04291 1.64232C10.5542 1.11585 12.5557 1.89466 13.89 2.78473C15.5579 3.89731 16.6698 3.89731 20.0056 5.0099C17.2258 8.90395 13.89 8.90395 9.44232 8.90395Z"
                    fill="#fff"
                  ></path>
                </svg>
              </div>
              <div _ngcontent-ng-c2582205232="" className="tab-label">
                {languageValue(valueByLanguage, LanguageKey.GREYHOUND)}
              </div>
            </div>

            {Settings.mac88 && Settings.casinoCurrency === "INR" && (
              <div
                onClick={() => handleNavigate("mac88")}
                _ngcontent-ng-c2582205232=""
                routerlinkactive="active-link"
                className={`pagetab-item ng-star-inserted   ${
                  sportsType === "mac88" && location.pathname === "/"
                    ? "active-link"
                    : ""
                }`}
              >
                {/* <p
            _ngcontent-ng-c2582205232=""
            className="newgame ng-star-inserted"
          >
            Started
          </p> */}
                <div
                  _ngcontent-ng-c2582205232=""
                  className={`icon-wrap ${
                    sportsType === "mac88" && location.pathname === "/"
                      ? "rotate-animation"
                      : ""
                  }`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 15 16"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.7793 5.44C8.75526 3.192 7.71226 1.393 7.00526 0C6.29726 1.393 5.25526 3.192 2.23126 5.44C-2.92574 9.273 1.92826 14.622 6.19626 11.678C5.91826 13.505 4.96926 14.837 4.00526 15.411V16.001H10.0053V15.411C9.04126 14.837 8.09226 13.505 7.81426 11.678C12.0823 14.622 16.9363 9.273 11.7793 5.44Z"
                      // fill="var(--color-secondary)"
                    ></path>
                  </svg>
                </div>
                <div _ngcontent-ng-c2582205232="" className="tab-label">
                  {languageValue(valueByLanguage, LanguageKey.MAC88)}
                </div>
              </div>
            )}
            {Settings.aura && (
              <div
                onClick={() => handleNavigate("aura")}
                _ngcontent-ng-c2582205232=""
                routerlink="/casino-bmk-lobby"
                routerlinkactive="active-link"
                className={`pagetab-item ng-star-inserted   ${
                  sportsType === "aura" && location.pathname === "/"
                    ? "active-link"
                    : ""
                }`}
              >
                <div
                  _ngcontent-ng-c2582205232=""
                  className={`icon-wrap ${
                    sportsType === "aura" && location.pathname === "/"
                      ? "rotate-animation"
                      : ""
                  }`}
                >
                  <img
                    _ngcontent-ng-c2582205232=""
                    alt="Tab Icon"
                    src="/assets/img/cards-header-icon.svg"
                  />
                </div>
                <div _ngcontent-ng-c2582205232="" className="tab-label">
                  {languageValue(valueByLanguage, LanguageKey.CARD_GAMES)}
                </div>
              </div>
            )}

            <div
              onClick={() => handleNavigate("live-casino")}
              _ngcontent-ng-c2582205232=""
              routerlink="/live-casino-lobby/live_casino"
              routerlinkactive="active-link"
              className={`pagetab-item ng-star-inserted   ${
                sportsType === "live-casino" && location.pathname === "/"
                  ? "active-link"
                  : ""
              }`}
            >
              <div
                _ngcontent-ng-c2582205232=""
                className={`icon-wrap ${
                  sportsType === "live-casino" && location.pathname === "/"
                    ? "rotate-animation"
                    : ""
                }`}
              >
                <img
                  _ngcontent-ng-c2582205232=""
                  alt="Tab Icon"
                  src="/assets/img/chips-header-icon.svg"
                />
              </div>
              <div _ngcontent-ng-c2582205232="" className="tab-label">
                {languageValue(valueByLanguage, LanguageKey.LIVE_CASINO)}
              </div>
            </div>

            <div
              onClick={() => handleNavigate("casino")}
              _ngcontent-ng-c2582205232=""
              routerlink="/casino-lobby/casino"
              routerlinkactive="active-link"
              className={`pagetab-item ng-star-inserted ${
                sportsType === "casino" && location.pathname === "/"
                  ? "active-link"
                  : ""
              }`}
            >
              <div
                _ngcontent-ng-c2582205232=""
                className={`icon-wrap ${
                  sportsType === "casino" && location.pathname === "/"
                    ? "rotate-animation"
                    : ""
                }`}
              >
                <img
                  _ngcontent-ng-c2582205232=""
                  alt="Tab Icon"
                  src="/assets/img/dice-header-icon.svg"
                />
              </div>
              <div _ngcontent-ng-c2582205232="" className="tab-label">
                Casino
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
