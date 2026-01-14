import { createBrowserRouter } from "react-router-dom";
import Main from "../components/layout/Main";
import Home from "../pages/Home/Home";
import GameDetails from "../pages/GameDetails/GameDetails";
import Profile from "../pages/Profile/Profile";
import Rules from "../pages/Rules/Rules";
import Deposit from "../pages/Deposit/Deposit";
import Withdraw from "../pages/Withdraw/Withdraw";
import ActiveBets from "../pages/ActiveBets/ActiveBets";
import Passbook from "../pages/Passbook/Passbook";
import SinglePassbook from "../pages/Passbook/SinglePassbook";
import WithdrawStatement from "../pages/WithdrawStatement/WithdrawStatement";
import DepositStatement from "../pages/DepositStatement/DepositStatement";
import MyBankDetails from "../pages/MyBankDetails/MyBankDetails";
import Casino from "../pages/Casino/Casino";
import NotFound from "../pages/NotFound/NotFound";
import APK from "../pages/APK/APK";
import BonusStatement from "../pages/BonusStatement/BonusStatement";
import ReferralStatement from "../pages/ReferralStatement/ReferralStatement";
import HorseRacing from "../pages/HorseRacing/HorseRacing";
import GreyhoundRacing from "../pages/GreyhoundRacing/GreyhoundRacing";
import Affiliate from "../pages/Affiliate/Affiliate";
import AffiliateUserProfitLoss from "../pages/AffiliateUserProfitLoss/AffiliateUserProfitLoss";
import AffiliateUserStatement from "../pages/AffiliateUserStatement/AffiliateUserStatement";
import Promotions from "../pages/Promotions/Promotions";
import LossBackClaims from "../pages/LossBackClaims/LossBackClaims";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Main />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "casino/:name/:id",
          element: <Casino />,
        },
        {
          path: "game-details/:eventTypeId/:eventId",
          element: <GameDetails />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "profile/deposit",
          element: <Deposit />,
        },
        {
          path: "withdraw",
          element: <Withdraw />,
        },

        {
          path: "rules",
          element: <Rules />,
        },
        {
          path: "active-bets",
          element: <ActiveBets />,
        },
        {
          path: "deposit-statement",
          element: <DepositStatement />,
        },
        {
          path: "withdraw-statement",
          element: <WithdrawStatement />,
        },
        {
          path: "passbook",
          element: <Passbook />,
        },
        {
          path: "passbook/:marketId",
          element: <SinglePassbook />,
        },
        {
          path: "my-bank-details",
          element: <MyBankDetails />,
        },
        {
          path: "bonus-statement",
          element: <BonusStatement />,
        },
        {
          path: "apk",
          element: <APK />,
        },
        {
          path: "referral-statement",
          element: <ReferralStatement />,
        },
        {
          path: "horse-racing",
          element: <HorseRacing />,
        },
        {
          path: "greyhound-racing",
          element: <GreyhoundRacing />,
        },
        {
          path: "affiliate",
          element: <Affiliate />,
        },
        {
          path: "/affiliate/user-profit-loss",
          element: <AffiliateUserProfitLoss />,
        },
        {
          path: "/affiliate/user-statement",
          element: <AffiliateUserStatement />,
        },
        {
          path: "/promotions",
          element: <Promotions />,
        },
        {
          path: "/lossback-claims",
          element: <LossBackClaims />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL ?? "/",
  }
);
