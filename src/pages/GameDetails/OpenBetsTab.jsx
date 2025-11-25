import useSBCashOut from "../../hooks/sb_cashout";

/* eslint-disable react/no-unknown-property */
const OpenBetsTab = ({
  myBets,
  refetchCurrentBets,
  sportsBook,
  setSuccessMessage,
  setErrorMessage,
}) => {
  const { mutate: cashOut } = useSBCashOut();
  const sports =
    sportsBook &&
    sportsBook?.MarketGroups?.filter(
      (group) =>
        group?.Name !== "Bet Builder" &&
        group?.Name !== "Fast Markets" &&
        group?.Name !== "Player Specials"
    );

  const handleCashOut = ({ betHistory, sportsBook, price, cashout_value }) => {
    let item;
    sports?.forEach((group) => {
      group?.Items?.forEach((data) => {
        if (betHistory?.marketId == data?.Id) {
          item = data;
        }
      });
    });

    const column = item?.Items?.find(
      (col) => col?.Id === betHistory?.selectionId
    );

    const payload = {
      price,
      cashout_value,
      back: true,
      side: 0,
      selectionId: column?.Id,
      btype: "SPORTSBOOK",
      placeName: column?.Name,
      eventTypeId: sportsBook?.EventTypeId,
      betDelay: sportsBook?.betDelay,
      marketId: item?.Id,
      maxLiabilityPerMarket: item?.maxLiabilityPerMarket,
      maxLiabilityPerBet: item?.maxLiabilityPerBet,
      isBettable: sportsBook?.isBettable,
      isWeak: sportsBook?.isWeak,
      marketName: item?.Name,
      eventId: sportsBook?.eventId,
      betId: betHistory?.betId,
    };

    cashOut(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          refetchCurrentBets();
          setSuccessMessage(data?.result?.message);
        } else {
          setErrorMessage(data?.error);
        }
      },
    });
  };

  return (
    <div className="mat-mdc-tab-body-wrapper">
      <div
        role="tabpanel"
        className="mat-mdc-tab-body mat-tab-body ng-tns-c737557735-111 ng-star-inserted mat-mdc-tab-body-active"
        id="mat-tab-content-20-1"
        aria-labelledby="mat-tab-label-20-1"
      >
        <div
          cdkscrollable=""
          className="mat-mdc-tab-body-content ng-tns-c737557735-111 ng-trigger ng-trigger-translateTab"
          style={{ transform: "none" }}
        >
          <div
            _ngcontent-ng-c942213636=""
            ngskiphydration=""
            mat-stretch-tabs="true"
            mat-align-tabs="center"
            disablepagination="true"
            className="mat-mdc-tab-group mat-tab-group bethistory-tabs mat-primary mat-mdc-tab-group-stretch-tabs ng-star-inserted"
            // style="--mat-tab-animation-duration: 500ms;"
          >
            <div className="mat-mdc-tab-body-wrapper">
              <div
                role="tabpanel"
                className="mat-mdc-tab-body mat-tab-body ng-tns-c737557735-107 ng-star-inserted mat-mdc-tab-body-active"
                id="mat-tab-content-21-0"
                aria-labelledby="mat-tab-label-21-0"
              >
                <div
                  cdkscrollable=""
                  className="mat-mdc-tab-body-content ng-tns-c737557735-107 ng-trigger ng-trigger-translateTab"
                  style={{ transform: "none" }}
                >
                  {myBets?.length > 0 ? (
                    <div
                      _ngcontent-ng-c942213636=""
                      id="betSlipAcc"
                      className="card-accordion card-outer betslip-card ng-star-inserted"
                    >
                      <div _ngcontent-ng-c942213636="" className="card-body">
                        <div
                          _ngcontent-ng-c942213636=""
                          className="betslip-data-wrap"
                        >
                          <div
                            _ngcontent-ng-c942213636=""
                            className="betslip-title"
                          >
                            <h3 _ngcontent-ng-c942213636="">Bet History</h3>
                            <div
                              _ngcontent-ng-c942213636=""
                              className="odds-stake-wrap"
                            >
                              <h3 _ngcontent-ng-c942213636="">Odds</h3>
                              <h3 _ngcontent-ng-c942213636="">Stake</h3>
                            </div>
                          </div>
                          <div
                            _ngcontent-ng-c942213636=""
                            className="betslip-databody"
                          >
                            {myBets?.map((bet, i) => {
                              let column;
                              sports?.forEach((group) => {
                                group?.Items?.forEach((data) => {
                                  if (bet?.marketId == data?.Id) {
                                    column = data?.Items?.find(
                                      (col) => col?.Id === bet?.selectionId
                                    );
                                  }
                                });
                              });

                              const price = (
                                0.92 *
                                  bet?.amount *
                                  (bet?.userRate / column?.Price) -
                                bet?.amount
                              )?.toFixed(2);
                              return (
                                <div
                                  key={i}
                                  _ngcontent-ng-c942213636=""
                                  className={`betslip-datalist  ng-star-inserted ${
                                    bet?.betType === "Back"
                                      ? "back-list-row"
                                      : "lay-list-row"
                                  }`}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                    }}
                                    _ngcontent-ng-c942213636=""
                                    className="bs-gameinfo"
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0px 5px",
                                      }}
                                    >
                                      {" "}
                                      <div
                                        _ngcontent-ng-c942213636=""
                                        className="game-type"
                                      >
                                        <p
                                          _ngcontent-ng-c942213636=""
                                          className="icon-bookmaker"
                                        >
                                          B{" "}
                                        </p>
                                      </div>
                                      <div
                                        _ngcontent-ng-c942213636=""
                                        className="bs-content"
                                      >
                                        <h3 _ngcontent-ng-c942213636="">
                                          {bet?.nation}
                                        </h3>
                                        <p _ngcontent-ng-c942213636="">
                                          {bet?.placeDate}
                                        </p>
                                        <p _ngcontent-ng-c942213636=""></p>
                                      </div>
                                    </div>
                                    {bet?.cashout && column && (
                                      <button
                                        onClick={() =>
                                          handleCashOut({
                                            betHistory: bet,
                                            sportsBook,
                                            price: column?.Price,
                                            cashout_value: price,
                                          })
                                        }
                                        type="button"
                                        className="btn_box "
                                        style={{
                                          width: "auto",
                                          backgroundColor: "#f3f3f3ff",
                                          display: "flex",
                                          alignItems: "center",
                                          cursor: `pointer`,
                                          justifyContent: "center",
                                          gap: "0px 2px",
                                          borderRadius: "2px",
                                          border: "none",
                                          padding: "3px 5px",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontSize: "10px",
                                            color: "black",
                                          }}
                                        >
                                          Cashout
                                        </span>
                                        {price && (
                                          <span
                                            style={{
                                              color: "black",
                                              fontSize: "10px",
                                            }}
                                          >
                                            :
                                          </span>
                                        )}

                                        {price && (
                                          <span
                                            style={{
                                              color: `${
                                                price > 0 ? "green" : "red"
                                              }`,
                                              fontSize: "10px",
                                            }}
                                          >
                                            {price}
                                          </span>
                                        )}
                                      </button>
                                    )}
                                  </div>
                                  <div
                                    _ngcontent-ng-c942213636=""
                                    className="odds-stake-wrap"
                                  >
                                    <h3 _ngcontent-ng-c942213636="">
                                      {bet?.userRate}
                                    </h3>
                                    <h3 _ngcontent-ng-c942213636="">
                                      {bet?.amount}
                                    </h3>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      _ngcontent-ng-c3799324686=""
                      className="no-data ng-star-inserted"
                    >
                      <p _ngcontent-ng-c3799324686="">
                        No bets placed yet, Place your bet now!
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
  );
};

export default OpenBetsTab;
