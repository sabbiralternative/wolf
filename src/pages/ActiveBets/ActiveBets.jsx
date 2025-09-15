import { useNavigate } from "react-router-dom";
import { LanguageKey } from "../../constant/constant";
import useCurrentBets from "../../hooks/useCurrentBets";
import useLanguage from "../../hooks/useLanguage";
import { languageValue } from "../../utils/language";
/* eslint-disable react/no-unknown-property */
const ActiveBets = () => {
  const navigate = useNavigate();
  const { valueByLanguage } = useLanguage();
  /* get my bets */
  const { myBets } = useCurrentBets();
  const navigateGameList = (item) => {
    navigate(`/game-details/${item?.eventTypeId}/${item?.eventId}`);
  };

  return (
    <div _ngcontent-ng-c3622565476="" className="page-body">
      <div _ngcontent-ng-c3622565476="" className="passbook-page-wrap">
        <div
          _ngcontent-ng-c3622565476=""
          ngskiphydration=""
          animationduration="0ms"
          className="mat-mdc-tab-group passbook-tabs-group mat-tab-group mat-primary mat-mdc-tab-group-stretch-tabs"
          // style="--mat-tab-animation-duration: 0ms;"
        >
          <div className="mat-mdc-tab-body-wrapper">
            <div
              role="tabpanel"
              className="mat-mdc-tab-body mat-tab-body ng-tns-c737557735-83 mat-mdc-tab-body-active ng-star-inserted"
              id="mat-tab-content-13-1"
              aria-labelledby="mat-tab-label-13-1"
            >
              <div
                cdkscrollable=""
                className="mat-mdc-tab-body-content ng-tns-c737557735-83 ng-trigger ng-trigger-translateTab"
                style={{ transform: "none" }}
              >
                <div
                  _ngcontent-ng-c3622565476=""
                  _nghost-ng-c773751984=""
                  className="ng-star-inserted"
                >
                  <div
                    _ngcontent-ng-c773751984=""
                    className="hydrated"
                    //   style="--offset-top: 0px; --offset-bottom: 0px;"
                  >
                    <div
                      _ngcontent-ng-c773751984=""
                      className="cricket-bets-wrap"
                    >
                      <div
                        _ngcontent-ng-c773751984=""
                        ngskiphydration=""
                        mat-stretch-tabs="true"
                        animationduration="0ms"
                        disablepagination="true"
                        className="mat-mdc-tab-group mat-tab-group betstatement-tabs mat-primary mat-mdc-tab-group-stretch-tabs"
                        //   style="--mat-tab-animation-duration: 0ms;"
                      >
                        <div className="mat-mdc-tab-body-wrapper">
                          <div
                            role="tabpanel"
                            className="mat-mdc-tab-body mat-tab-bodyng-tns-c737557735-88 ng-star-inserted"
                            id="mat-tab-content-14-0"
                            aria-labelledby="mat-tab-label-14-0"
                          >
                            <div
                              cdkscrollable=""
                              className="mat-mdc-tab-body-content ng-tns-c737557735-88 ng-trigger ng-trigger-translateTab"
                              style={{
                                transform: "translate3d(-100%, 0px, 0px)",
                                minHeight: "1px",
                                visibility: "hidden",
                              }}
                            ></div>
                          </div>
                          <div
                            role="tabpanel"
                            className="mat-mdc-tab-body mat-tab-body ng-tns-c737557735-89 ng-star-inserted mat-mdc-tab-body-active"
                            id="mat-tab-content-14-1"
                            aria-labelledby="mat-tab-label-14-1"
                          >
                            <div
                              cdkscrollable=""
                              className="mat-mdc-tab-body-content ng-tns-c737557735-89 ng-trigger ng-trigger-translateTab"
                              style={{ transform: "none" }}
                            >
                              <div
                                _ngcontent-ng-c773751984=""
                                className="bet-statement ng-star-inserted"
                              >
                                <div
                                  _ngcontent-ng-c773751984=""
                                  className="top-filter"
                                >
                                  <div
                                    _ngcontent-ng-c773751984=""
                                    className="title"
                                  >
                                    <h3 _ngcontent-ng-c773751984="">
                                      Bet History
                                    </h3>
                                  </div>
                                  <div
                                    _ngcontent-ng-c773751984=""
                                    className="filter-col"
                                  ></div>
                                </div>
                                <div
                                  _ngcontent-ng-c773751984=""
                                  className="betslip-card ng-star-inserted"
                                >
                                  {myBets?.length > 0 ? (
                                    <div
                                      _ngcontent-ng-c773751984=""
                                      className="betslip-data-wrap ng-star-inserted"
                                    >
                                      <div
                                        _ngcontent-ng-c773751984=""
                                        className="betslip-title"
                                      >
                                        <h3 _ngcontent-ng-c773751984=""></h3>
                                        <div
                                          _ngcontent-ng-c773751984=""
                                          className="odds-stake-wrap"
                                        >
                                          <h3 _ngcontent-ng-c773751984="">
                                            Odds
                                          </h3>
                                          <h3 _ngcontent-ng-c773751984="">
                                            Stake
                                          </h3>
                                        </div>
                                      </div>
                                      {Array.from(
                                        new Set(
                                          myBets.map((item) => item.eventName)
                                        )
                                      )?.map((category) => {
                                        return (
                                          <div
                                            key={category}
                                            _ngcontent-ng-c773751984=""
                                            className="mat-accordion bet-history-accordion ng-star-inserted"
                                          >
                                            <div
                                              _ngcontent-ng-c773751984=""
                                              hidetoggle="true"
                                              className="mat-expansion-panel ng-tns-c1859850774-94 ng-star-inserted mat-expanded mat-expansion-panel-spacing"
                                            >
                                              <div
                                                _ngcontent-ng-c773751984=""
                                                role="button"
                                                className="mat-expansion-panel-header mat-focus-indicator ng-tns-c2690051721-95 ng-tns-c1859850774-94 mat-expansion-toggle-indicator-after ng-star-inserted mat-expanded"
                                                id="mat-expansion-panel-header-12"
                                                aria-controls="cdk-accordion-child-12"
                                                aria-expanded="true"
                                                aria-disabled="false"
                                              >
                                                <span className="mat-content ng-tns-c2690051721-95 mat-content-hide-toggle">
                                                  <div
                                                    _ngcontent-ng-c773751984=""
                                                    className="mat-expansion-panel-header-title ng-tns-c2690051721-95"
                                                  >
                                                    <h3 _ngcontent-ng-c773751984="">
                                                      {category}
                                                    </h3>
                                                  </div>
                                                  <div
                                                    _ngcontent-ng-c773751984=""
                                                    className="mat-expansion-panel-header-description ng-tns-c2690051721-95"
                                                  >
                                                    <span
                                                      _ngcontent-ng-c773751984=""
                                                      role="img"
                                                      className="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color ng-star-inserted"
                                                      aria-hidden="true"
                                                      data-mat-icon-type="font"
                                                    >
                                                      arrow_drop_up
                                                    </span>
                                                  </div>
                                                </span>
                                              </div>
                                              <div
                                                role="region"
                                                className="mat-expansion-panel-content ng-tns-c1859850774-94 ng-trigger ng-trigger-bodyExpansion"
                                                id="cdk-accordion-child-12"
                                                aria-labelledby="mat-expansion-panel-header-12"
                                              >
                                                <div className="mat-expansion-panel-body ng-tns-c1859850774-94">
                                                  <div
                                                    _ngcontent-ng-c773751984=""
                                                    className="betslip-databody ng-tns-c1859850774-94"
                                                  >
                                                    {myBets
                                                      ?.filter(
                                                        (games) =>
                                                          games?.eventName ===
                                                          category
                                                      )
                                                      ?.map((item, i) => {
                                                        return (
                                                          <div
                                                            style={{
                                                              cursor: "pointer",
                                                            }}
                                                            onClick={() =>
                                                              navigateGameList(
                                                                item
                                                              )
                                                            }
                                                            key={i}
                                                            _ngcontent-ng-c773751984=""
                                                            className={`betslip-datalist ng-star-inserted ${
                                                              item?.betType ===
                                                              "Back"
                                                                ? "forback "
                                                                : "forlay "
                                                            }`}
                                                          >
                                                            <div
                                                              _ngcontent-ng-c773751984=""
                                                              className="bs-gameinfo"
                                                            >
                                                              <div
                                                                _ngcontent-ng-c773751984=""
                                                                className="game-type"
                                                              >
                                                                <p
                                                                  _ngcontent-ng-c773751984=""
                                                                  className="icon-bookmaker"
                                                                >
                                                                  F
                                                                </p>
                                                              </div>
                                                              <div
                                                                _ngcontent-ng-c773751984=""
                                                                className="bs-content"
                                                              >
                                                                <h3 _ngcontent-ng-c773751984="">
                                                                  {item?.nation}
                                                                </h3>
                                                                <p
                                                                  _ngcontent-ng-c773751984=""
                                                                  className="game-title ng-star-inserted"
                                                                >
                                                                  <span _ngcontent-ng-c773751984="">
                                                                    {
                                                                      item?.eventName
                                                                    }
                                                                  </span>

                                                                  <span _ngcontent-ng-c773751984="">
                                                                    |{" "}
                                                                    {
                                                                      item?.placeDate
                                                                    }
                                                                  </span>
                                                                </p>
                                                              </div>
                                                            </div>
                                                            <div
                                                              _ngcontent-ng-c773751984=""
                                                              className="odds-stake-wrap"
                                                            >
                                                              <h3 _ngcontent-ng-c773751984="">
                                                                {item?.userRate}
                                                              </h3>
                                                              <h3 _ngcontent-ng-c773751984="">
                                                                {item?.amount}
                                                              </h3>
                                                            </div>
                                                          </div>
                                                        );
                                                      })}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  ) : (
                                    <div
                                      _ngcontent-ng-c3799324686=""
                                      className="no-data ng-star-inserted"
                                    >
                                      <p _ngcontent-ng-c3799324686="">
                                        {languageValue(
                                          valueByLanguage,
                                          LanguageKey.NO_BETS
                                        )}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveBets;
