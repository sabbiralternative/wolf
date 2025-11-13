/* eslint-disable react/no-unknown-property */
import { useState } from "react";
// import Tabs from "./Tabs";
import SportsColumn from "./SportsColumn";

const SportsBook = ({ sportsBook }) => {
  const [tabs] = useState("Main");
  const filteredSportsBook = sportsBook?.MarketGroups?.filter(
    (group) =>
      group?.Name !== "Bet Builder" &&
      group?.Name !== "Fast Markets" &&
      group?.Name !== "Player Specials"
  );

  let sports;
  if (tabs === "ALL") {
    sports = filteredSportsBook;
  } else {
    const filterSports = filteredSportsBook?.filter(
      (group) => group?.Name === tabs
    );
    sports = filterSports;
  }

  return (
    <div
      _ngcontent-ng-c942213636=""
      className="fancy-card card-outer ng-star-inserted"
    >
      <div _ngcontent-ng-c942213636="" className="head-wrap">
        <h2 _ngcontent-ng-c942213636="" className="card-heading">
          Sportsbook
        </h2>
      </div>
      {/* <div _ngcontent-ng-c942213636="" className="fancybody-header">
        <h3 _ngcontent-ng-c942213636="" className="card-title">
          Min: {sportsBook?.minLiabilityPerBet} | Max:{" "}
          {sportsBook?.maxLiabilityPerBet}
        </h3>
      </div> */}

      <div className="">
        <div className="_asb_event-details-markets">
          {/* <Tabs setTabs={setTabs} sportsBook={filteredSportsBook} tabs={tabs} /> */}
          <div className="_asb_items-tabs-content">
            <div className="asb-cut">
              <div>
                <div className="_asb_event-details-markets-group">
                  <SportsColumn
                    tabs={tabs}
                    sports={sports}
                    sportsBook={sportsBook}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsBook;
