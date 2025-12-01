/* eslint-disable react/no-unknown-property */
import "./affiliate.css";
import BonusInformation from "../../components/modules/Affiliate/BonusInformation";
import InviteSection from "../../components/modules/Affiliate/InviteSection";
import TodayProfitLoss from "../../components/modules/Affiliate/TodayProfitLoss";
import TodayStatusSection from "../../components/modules/Affiliate/TodayStatusSection";
import TopFiveLossUser from "../../components/modules/Affiliate/TopFiveLossUser";
import { Fragment, useState } from "react";
import UserList from "../../components/modules/Affiliate/UserList";
import ProfitLoss from "../../components/modules/Affiliate/ProfitLoss";
import Reports from "../../components/modules/Affiliate/Reports";
import Footer from "../../components/modules/Affiliate/Footer";

const Affiliate = () => {
  const [tab, setTab] = useState("dashboard");
  return (
    <div
      _ngcontent-ng-c3622565476=""
      className="page-body"
      style={{ minHeight: "100vh" }}
    >
      <div className="main-content" style={{ marginTop: "10px" }}>
        <div data-v-4c49d924 className="container">
          {tab === "dashboard" && (
            <Fragment>
              <TodayStatusSection />
              <InviteSection />
              <TopFiveLossUser />
              <BonusInformation />
              <TodayProfitLoss />
            </Fragment>
          )}
          {tab === "user-list" && <UserList />}
          {tab === "pnl" && <ProfitLoss />}
          {tab === "reports" && <Reports />}
          <Footer setTab={setTab} tab={tab} />
        </div>
      </div>
    </div>
  );
};

export default Affiliate;
