import { useLocation, useNavigate } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import MyMarket from "../../modal/MyMarket";
import { useEffect, useState } from "react";
import useGetSocialLink from "../../../hooks/useGetSocialLink";
import useGetVersion from "../../../hooks/useGetVersion";
import useLanguage from "../../../hooks/useLanguage";
import { languageValue } from "../../../utils/language";
import { LanguageKey } from "../../../constant/constant";
import img from "../../../../public/assets/img";

/* eslint-disable react/no-unknown-property */
const Footer = () => {
  const { valueByLanguage } = useLanguage();
  const { version } = useGetVersion();
  const { socialLink, refetchSocialLinks } = useGetSocialLink();

  const location = useLocation();
  const navigate = useNavigate();
  const {
    token,
    setShowLogin,
    // icon
  } = useContextState();

  const [showMyMarket, setShowMyMarket] = useState(false);
  /* Handle logout */

  /* on click whats app navigate in new tab */
  const navigateWhatsApp = () => {
    if (token && socialLink?.branchWhatsapplink) {
      window.open(socialLink?.branchWhatsapplink, "_blank");
    } else {
      window.open(socialLink?.whatsapplink, "_blank");
    }
  };

  useEffect(() => {
    refetchSocialLinks();
  }, [token, refetchSocialLinks]);

  useEffect(() => {
    if (version?.chaport?.isChaportEnabled) {
      const script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.innerHTML = `
        (function(w,d,v3){
          w.chaportConfig = {
            appId: '${version?.chaport?.chaportAppId}',
            appearance: {
              windowColor: '#25d366',
              teamName: 'Customer Care',
              onlineWelcome: 'Hello, we are online!',
              offlineWelcome: 'We are not online.',
              position: ['right', 0, 50],
              textStatuses: true,
            },
            launcher: {
              show: false,
            },
          };
          
          if(w.chaport)return;v3=w.chaport={};v3._q=[];v3._l={};v3.q=function(){v3._q.push(arguments)};v3.on=function(e,fn){if(!v3._l[e])v3._l[e]=[];v3._l[e].push(fn)};var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://app.chaport.com/javascripts/insert.js';var ss=d.getElementsByTagName('script')[0];ss.parentNode.insertBefore(s,ss);
        })(window, document);
      `;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [version]);

  const openChaportOnClick = () => {
    window.chaport.on("ready", function () {
      window.chaport.open();
    });
  };

  return (
    <>
      {/* My market modal */}
      {showMyMarket && <MyMarket setShowMyMarket={setShowMyMarket} />}
      {/* Render html based on path */}
      {!location?.pathname?.includes("/game-details") &&
      location.pathname !== "/profile/deposit" &&
      !location.pathname?.includes("/casino") ? (
        <div _ngcontent-ng-c943649379="" className="page-footer">
          <div
            _ngcontent-ng-c943649379=""
            className="floating-btns"
            style={{ cursor: "pointer", bottom: "170px" }}
          >
            <div
              _ngcontent-ng-c943649379=""
              className="btn-item ng-star-inserted"
            >
              <div _ngcontent-ng-c943649379="" className="btn-wrap whatsapp">
                {socialLink?.instagramLink && location.pathname === "/" ? (
                  <img
                    onClick={() =>
                      window.open(socialLink?.instagramLink, "_blank")
                    }
                    style={{ height: "40px", width: "40px" }}
                    _ngcontent-ng-c943649379=""
                    alt="WhatsApp"
                    src={img.instagram}
                  />
                ) : null}
              </div>
            </div>
          </div>
          <div
            _ngcontent-ng-c943649379=""
            className="floating-btns"
            style={{ cursor: "pointer", bottom: "120px" }}
          >
            <div
              _ngcontent-ng-c943649379=""
              className="btn-item ng-star-inserted"
            >
              <div _ngcontent-ng-c943649379="" className="btn-wrap whatsapp">
                {socialLink?.telegramLink && location.pathname === "/" ? (
                  <img
                    onClick={() =>
                      window.open(socialLink?.telegramLink, "_blank")
                    }
                    style={{ height: "40px", width: "40px" }}
                    _ngcontent-ng-c943649379=""
                    alt="WhatsApp"
                    src={"/assets/img/telegram.png"}
                  />
                ) : null}
              </div>
            </div>
          </div>
          <div
            _ngcontent-ng-c943649379=""
            className="floating-btns"
            style={{ cursor: "pointer" }}
          >
            <div
              _ngcontent-ng-c943649379=""
              className="btn-item ng-star-inserted"
            >
              <div _ngcontent-ng-c943649379="" className="btn-wrap whatsapp">
                {(socialLink?.whatsapplink || socialLink?.branchWhatsapplink) &&
                location.pathname === "/" ? (
                  <img
                    onClick={navigateWhatsApp}
                    style={{ height: "40px", width: "40px" }}
                    _ngcontent-ng-c943649379=""
                    alt="WhatsApp"
                    src="/assets/img/whatsapp.png"
                  />
                ) : null}
                {version?.chaport?.isChaportVisible &&
                  location.pathname === "/" && (
                    <img
                      onClick={openChaportOnClick}
                      _ngcontent-ng-c943649379=""
                      alt="WhatsApp"
                      src="/assets/img/wp_support.webp"
                    />
                  )}
              </div>
            </div>
          </div>

          {/* {location?.pathname === "/profile" && token && (
            <div
              onClick={handleLogout}
              _ngcontent-ng-c2865632707=""
              className="action-btns ng-star-inserted"
            >
              <button
                _ngcontent-ng-c2865632707=""
                type="button"
                className="btn secondary-btn w-100"
              >
                Logout
              </button>
            </div>
          )} */}
          {location?.pathname === "/profile" && !token && (
            <div
              onClick={() => {
                setShowLogin(true);
              }}
              _ngcontent-ng-c2865632707=""
              className="action-btns ng-star-inserted"
            >
              <button
                _ngcontent-ng-c2865632707=""
                type="button"
                className="btn secondary-btn w-100"
              >
                {languageValue(valueByLanguage, LanguageKey.LOGIN)}
              </button>
            </div>
          )}

          <div _ngcontent-ng-c943649379="" _nghost-ng-c2125492905="">
            <div _ngcontent-ng-c2125492905="" className="tab-navigation">
              <button
                onClick={() => {
                  navigate("/");
                }}
                _ngcontent-ng-c2125492905=""
                mat-flat-button=""
                routerlink="/home"
                routerlinkactive="active-link"
                className={`home mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-unthemed mat-mdc-button-base ${
                  location?.pathname === "/" ? "active-link" : ""
                }`}
                mat-ripple-loader-uninitialized=""
                mat-ripple-loader-class-name="mat-mdc-button-ripple"
              >
                <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                <span className="mdc-button__label">
                  {/* <img
                    _ngcontent-ng-c2125492905=""
                    src="/assets/img/transparent-img.svg"
                    alt="Tab Icon"
                    style={{
                      backgroundImage: `url(${icon})`,
                    }}
                  /> */}
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 207 203"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="#ffffffff"></g>
                    <g id="#a0a0a0ff">
                      <path
                        fill={`${
                          location?.pathname === "/"
                            ? "var(--primary-bg)"
                            : "#fff"
                        }`}
                        opacity="1.00"
                        d=" M 93.24 40.16 C 101.78 38.48 110.72 41.22 117.45 46.57 C 128.55 55.17 140.15 63.10 151.19 71.78 C 157.40 76.53 161.08 84.21 160.96 92.02 C 161.06 107.02 160.96 122.03 161.01 137.03 C 161.11 145.81 156.80 154.60 149.54 159.61 C 144.81 163.14 138.81 164.50 132.98 164.49 C 109.98 164.49 86.99 164.52 63.99 164.48 C 55.61 164.48 47.00 160.85 41.95 154.01 C 38.08 149.26 36.07 143.17 36.05 137.07 C 35.93 123.04 36.04 109.01 35.99 94.98 C 35.96 89.16 36.88 83.10 40.09 78.14 C 42.51 74.28 46.20 71.50 49.76 68.77 C 58.96 61.92 68.30 55.25 77.41 48.28 C 82.11 44.65 87.28 41.21 93.24 40.16 M 66.33 127.34 C 63.72 129.02 63.42 133.18 65.71 135.24 C 67.46 136.66 69.87 136.45 71.98 136.53 C 90.66 136.44 109.35 136.57 128.03 136.47 C 130.92 136.56 133.73 133.98 133.23 130.97 C 133.08 127.90 129.78 126.24 127.01 126.51 C 108.34 126.45 89.66 126.54 70.99 126.47 C 69.41 126.50 67.71 126.43 66.33 127.34 Z"
                      />
                    </g>
                  </svg>
                  <p
                    _ngcontent-ng-c2125492905=""
                    className="notranslate"
                    style={{ color: "var(--footerColor)" }}
                  >
                    {languageValue(valueByLanguage, LanguageKey.HOME)}
                  </p>{" "}
                </span>
                <span className="mat-mdc-focus-indicator"></span>
                <span className="mat-mdc-button-touch-target"></span>
              </button>

              <button
                onClick={() => setShowMyMarket(true)}
                _ngcontent-ng-c2125492905=""
                mat-flat-button=""
                className="market mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-unthemed mat-mdc-button-base ng-star-inserted"
                mat-ripple-loader-uninitialized=""
                mat-ripple-loader-class-name="mat-mdc-button-ripple"
              >
                <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                <span className="mdc-button__label">
                  {/* <img
                    _ngcontent-ng-c2125492905=""
                    src="/assets/img/transparent-img.svg"
                    alt="Tab Icon"
                    style={{
                      backgroundImage: `url(${icon})`,
                    }}
                  /> */}
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 177 173"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="#ffffffff"></g>
                    <g id="#a0a0a0ff">
                      <path
                        fill="#fff"
                        opacity="1.00"
                        d=" M 76.44 15.56 C 91.37 12.85 107.34 15.69 120.24 23.74 C 134.48 32.47 145.08 47.12 148.49 63.51 C 151.57 77.00 149.91 91.50 143.91 103.96 C 137.72 117.00 126.78 127.60 113.77 133.78 C 102.59 138.77 89.98 140.63 77.86 138.70 C 63.13 136.40 49.32 128.60 39.77 117.14 C 30.35 106.05 25.00 91.54 25.12 76.98 C 25.02 60.04 32.27 43.23 44.64 31.66 C 53.35 23.33 64.58 17.67 76.44 15.56 M 80.56 48.63 C 65.30 50.86 51.36 60.39 43.38 73.53 C 42.34 75.38 42.01 77.74 42.95 79.70 C 51.93 95.06 69.05 105.76 87.00 105.85 C 104.02 106.22 120.33 96.70 129.95 82.91 C 131.74 80.47 133.58 77.22 131.88 74.22 C 121.81 56.67 100.80 45.49 80.56 48.63 Z"
                      />
                      <path
                        fill="#fff"
                        opacity="1.00"
                        d=" M 83.49 55.64 C 86.05 54.46 91.77 54.72 89.94 58.87 C 87.47 60.88 83.66 60.05 81.34 62.45 C 78.56 64.47 77.77 67.87 77.05 71.02 C 76.89 73.27 73.73 73.56 72.66 71.89 C 71.75 64.77 76.61 57.56 83.49 55.64 Z"
                      />
                      <path
                        fill="#fff"
                        opacity="1.00"
                        d=" M 48.88 77.04 C 53.57 69.41 60.55 63.50 68.23 59.04 C 63.95 66.61 63.94 76.60 69.22 83.70 C 76.73 94.56 94.38 96.30 103.44 86.45 C 110.72 79.56 111.68 68.01 107.20 59.33 C 114.90 63.49 121.49 69.52 126.08 76.99 C 119.83 86.54 110.65 94.44 99.63 97.81 C 86.28 102.04 70.99 98.71 60.33 89.72 C 55.75 86.24 52.08 81.77 48.88 77.04 Z"
                      />
                    </g>
                  </svg>
                  <p
                    _ngcontent-ng-c2125492905=""
                    className="notranslate"
                    style={{ color: "var(--footerColor)" }}
                  >
                    {languageValue(valueByLanguage, LanguageKey.MY_MARKETS)}
                  </p>{" "}
                </span>
                <span className="mat-mdc-focus-indicator"></span>
                <span className="mat-mdc-button-touch-target"></span>
              </button>
              <button
                onClick={() => {
                  navigate("/passbook");
                }}
                _ngcontent-ng-c2125492905=""
                mat-flat-button=""
                routerlink="/passbook"
                routerlinkactive="active-link"
                className={`passbook mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-unthemed mat-mdc-button-base ng-star-inserted ${
                  location?.pathname === "/passbook" ? "active-link" : ""
                }`}
                mat-ripple-loader-uninitialized=""
                mat-ripple-loader-class-name="mat-mdc-button-ripple"
              >
                <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                <span className="mdc-button__label">
                  {/* <img
                    _ngcontent-ng-c2125492905=""
                    src="/assets/img/transparent-img.svg"
                    alt="Tab Icon"
                    style={{
                      backgroundImage: `url(${icon})`,
                    }}
                  /> */}
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 154 148"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="#ffffffff"></g>
                    <g id="#a0a0a0ff">
                      <path
                        fill={`${
                          location?.pathname === "/passbook"
                            ? "var(--primary-bg)"
                            : "#fff"
                        }`}
                        opacity="1.00"
                        d=" M 33.43 29.64 C 36.82 28.48 40.48 28.76 44.01 28.74 C 69.03 28.79 94.05 28.69 119.06 28.78 C 124.65 28.49 129.89 33.19 129.71 38.87 C 129.80 62.59 129.73 86.31 129.74 110.03 C 129.78 113.83 128.20 117.98 124.64 119.77 C 121.43 121.66 117.58 121.22 114.03 121.27 C 89.03 121.24 64.03 121.26 39.03 121.25 C 36.18 121.24 33.16 120.83 30.92 118.91 C 27.93 116.63 27.00 112.70 27.01 109.12 C 26.99 86.39 27.00 63.66 27.00 40.93 C 26.77 36.38 28.87 31.27 33.43 29.64 M 42.49 49.28 C 42.48 52.68 42.50 56.09 42.51 59.49 C 66.50 59.51 90.50 59.51 114.49 59.49 C 114.52 56.08 114.51 52.67 114.49 49.25 C 90.49 49.27 66.49 49.22 42.49 49.28 M 42.50 70.02 C 42.47 73.43 42.49 76.84 42.52 80.25 C 66.51 80.26 90.49 80.25 114.48 80.25 C 114.50 76.84 114.53 73.43 114.51 70.02 C 90.50 69.98 66.50 69.99 42.50 70.02 M 42.51 90.50 C 42.46 93.92 42.49 97.35 42.54 100.77 C 52.76 100.72 62.97 100.77 73.19 100.74 C 73.26 97.33 73.29 93.92 73.23 90.51 C 62.99 90.49 52.75 90.49 42.51 90.50 Z"
                      />
                    </g>
                  </svg>
                  <p
                    _ngcontent-ng-c2125492905=""
                    className="notranslate"
                    style={{ color: "var(--footerColor)" }}
                  >
                    {languageValue(valueByLanguage, LanguageKey.PASSBOOK)}
                  </p>{" "}
                </span>
                <span className="mat-mdc-focus-indicator"></span>
                <span className="mat-mdc-button-touch-target"></span>
              </button>
              <button
                onClick={() => {
                  navigate("/profile");
                }}
                _ngcontent-ng-c2125492905=""
                mat-flat-button=""
                routerlink="/profile"
                routerlinkactive="active-link"
                className={`profile mdc-button mdc-button--unelevated mat-mdc-unelevated-button mat-unthemed mat-mdc-button-base ${
                  location?.pathname === "/profile" ? "active-link" : ""
                }`}
                mat-ripple-loader-uninitialized=""
                mat-ripple-loader-class-name="mat-mdc-button-ripple"
              >
                <span className="mat-mdc-button-persistent-ripple mdc-button__ripple"></span>
                <span className="mdc-button__label">
                  {/* <img
                    _ngcontent-ng-c2125492905=""
                    src="/assets/img/transparent-img.svg"
                    alt="Tab Icon"
                    style={{
                      backgroundImage: `url(${icon})`,
                    }}
                  /> */}
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 137 176"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="#ffffffff"></g>
                    <g id="#a0a0a0ff">
                      <path
                        fill={`${
                          location?.pathname === "/profile"
                            ? "var(--primary-bg)"
                            : "#fff"
                        }`}
                        opacity="1.00"
                        d=" M 55.31 25.22 C 61.77 23.93 68.42 24.64 74.97 24.57 C 85.79 24.51 95.36 34.24 95.47 44.99 C 95.52 50.98 95.55 56.98 95.44 62.97 C 95.21 73.85 87.06 84.16 76.29 86.31 C 70.50 87.30 64.49 87.35 58.72 86.25 C 47.97 84.09 39.74 73.88 39.40 63.00 C 39.16 56.63 39.13 50.25 39.44 43.89 C 40.03 35.14 46.82 27.27 55.31 25.22 Z"
                      />
                      <path
                        fill={`${
                          location?.pathname === "/profile"
                            ? "var(--primary-bg)"
                            : "#fff"
                        }`}
                        opacity="1.00"
                        d=" M 35.27 100.23 C 38.77 99.29 42.44 99.50 46.03 99.49 C 62.02 99.53 78.01 99.48 94.00 99.52 C 99.91 99.38 105.83 101.77 109.73 106.25 C 114.27 110.89 115.06 117.63 116.33 123.70 C 117.60 130.02 116.20 137.00 111.87 141.90 C 107.87 146.96 101.36 149.53 95.01 149.50 C 76.66 149.48 58.32 149.52 39.97 149.48 C 32.38 149.59 24.78 145.65 21.13 138.88 C 16.75 131.90 18.43 123.31 20.52 115.88 C 21.93 108.41 27.94 102.14 35.27 100.23 Z"
                      />
                    </g>
                  </svg>
                  <p
                    _ngcontent-ng-c2125492905=""
                    className="notranslate"
                    style={{ color: "var(--footerColor)" }}
                  >
                    {languageValue(valueByLanguage, LanguageKey.PROFILE)}
                  </p>{" "}
                </span>
                <span className="mat-mdc-focus-indicator"></span>
                <span className="mat-mdc-button-touch-target"></span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Footer;
