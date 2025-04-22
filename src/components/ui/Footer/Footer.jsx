import { useLocation, useNavigate } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import MyMarket from "../../modal/MyMarket";
import { useEffect, useState } from "react";
import useGetSocialLink from "../../../hooks/useGetSocialLink";
import useGetVersion from "../../../hooks/useGetVersion";
import useLanguage from "../../../hooks/useLanguage";
import { languageValue } from "../../../utils/language";
import { LanguageKey } from "../../../constant/constant";

/* eslint-disable react/no-unknown-property */
const Footer = () => {
  const { valueByLanguage } = useLanguage();
  const { version } = useGetVersion();
  const { socialLink, refetchSocialLinks } = useGetSocialLink();

  const location = useLocation();
  const navigate = useNavigate();
  const { token, setShowLogin, icon } = useContextState();
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
                  <img
                    _ngcontent-ng-c2125492905=""
                    src="/assets/img/transparent-img.svg"
                    alt="Tab Icon"
                    style={{
                      backgroundImage: `url(${icon})`,
                    }}
                  />
                  <p _ngcontent-ng-c2125492905="" className="notranslate">
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
                  <img
                    _ngcontent-ng-c2125492905=""
                    src="/assets/img/transparent-img.svg"
                    alt="Tab Icon"
                    style={{
                      backgroundImage: `url(${icon})`,
                    }}
                  />
                  <p _ngcontent-ng-c2125492905="" className="notranslate">
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
                  <img
                    _ngcontent-ng-c2125492905=""
                    src="/assets/img/transparent-img.svg"
                    alt="Tab Icon"
                    style={{
                      backgroundImage: `url(${icon})`,
                    }}
                  />
                  <p _ngcontent-ng-c2125492905="" className="notranslate">
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
                  <img
                    _ngcontent-ng-c2125492905=""
                    src="/assets/img/transparent-img.svg"
                    alt="Tab Icon"
                    style={{
                      backgroundImage: `url(${icon})`,
                    }}
                  />
                  <p _ngcontent-ng-c2125492905="" className="notranslate">
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
