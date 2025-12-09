/* eslint-disable react/no-unknown-property */
import "./affiliate.css";
import BonusInformation from "../../components/modules/Affiliate/BonusInformation";
import InviteSection from "../../components/modules/Affiliate/InviteSection";
import TodayProfitLoss from "../../components/modules/Affiliate/TodayProfitLoss";
import TodayStatusSection from "../../components/modules/Affiliate/TodayStatusSection";
// import TopFiveLossUser from "../../components/modules/Affiliate/TopFiveLossUser";
import { Fragment } from "react";
import UserList from "../../components/modules/Affiliate/UserList";
import ProfitLoss from "../../components/modules/Affiliate/ProfitLoss";
import Reports from "../../components/modules/Affiliate/Reports";
import Footer from "../../components/modules/Affiliate/Footer";
import { useLocation } from "react-router-dom";

const Affiliate = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const tab = params.get("tab");
  return (
    <div
      _ngcontent-ng-c3622565476=""
      className="page-body"
      style={{ minHeight: "100vh" }}
    >
      <div className="main-content" style={{ marginTop: "10px" }}>
        <div data-v-4c49d924 className="container">
          <Footer />
          {(tab === "dashboard" || !tab) && (
            <Fragment>
              <TodayStatusSection />
              <InviteSection />
              {/* <TopFiveLossUser /> */}
              <BonusInformation />
              <TodayProfitLoss />
            </Fragment>
          )}
          {tab === "user-list" && <UserList />}
          {tab === "pnl" && <ProfitLoss />}
          {tab === "reports" && <Reports />}
        </div>
      </div>
    </div>
  );
};

export default Affiliate;
