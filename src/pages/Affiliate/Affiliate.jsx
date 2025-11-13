import "./affiliate.css";
import BonusInformation from "../../components/modules/Affiliate/BonusInformation";
import InviteSection from "../../components/modules/Affiliate/InviteSection";
import TodayProfitLoss from "../../components/modules/Affiliate/TodayProfitLoss";
import TodayStatusSection from "../../components/modules/Affiliate/TodayStatusSection";
import TopFiveLossUser from "../../components/modules/Affiliate/TopFiveLossUser";

/* eslint-disable react/no-unknown-property */
const Affiliate = () => {
  return (
    <div
      _ngcontent-ng-c3622565476=""
      className="page-body"
      style={{ minHeight: "100vh" }}
    >
      <div className="main-content" style={{ marginTop: "10px" }}>
        <div data-v-4c49d924 className="container">
          <TodayStatusSection />
          <InviteSection />
          <TopFiveLossUser />
          <BonusInformation />
          <TodayProfitLoss />
        </div>
      </div>
    </div>
  );
};

export default Affiliate;
