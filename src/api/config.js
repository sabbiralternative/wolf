import axios from "axios";
import { API, Settings } from "./index";

export const getSetApis = (setNoticeLoaded, baseUrl) => {
  const url = baseUrl ? `${baseUrl}/notice.json` : "/notice.json";

  axios
    .get(url)
    .then((res) => {
      const data = res.data;
      if (data?.result?.endpoint) {
        API.forgotPassword = data?.result?.endpoint?.forgotPassword;
        API.pg = data?.result?.endpoint?.pg;
        API.depositBreakdown = data?.result?.endpoint?.depositBreakdown;
        API.utr = data?.result?.endpoint?.utr;
        API.language = data?.result?.endpoint?.language;
        API.otpless = data?.result?.endpoint?.otpless;
        API.accessToken = data?.result?.endpoint?.accessToken;
        API.balance = data?.result?.endpoint?.balance;
        API.changePassword = data?.result?.endpoint?.changePassword;
        API.groupSportsBook = data?.result?.endpoint?.groupSportsBook;
        API.inPlayAndPopularEvents =
          data?.result?.endpoint?.inPlayAndPopularEvents;
        API.ladder = data?.result?.endpoint?.ladder;
        API.login = data?.result?.endpoint?.login;
        API.notification = data?.result?.endpoint?.notification;
        API.eventDetails = data?.result?.endpoint?.eventDetails;
        API.order = data?.result?.endpoint?.order;
        API.updateButtonValues = data?.result?.endpoint?.updateButtonValues;
        API.activityLog = data?.result?.endpoint?.activityLog;
        API.casinoResults = data?.result?.endpoint?.casinoResults;
        API.buttonValue = data?.result?.endpoint?.buttonValue;
        API.changeTheme = data?.result?.endpoint?.changeTheme;
        API.register = data?.result?.endpoint?.register;
        API.deposit = data?.result?.endpoint?.deposit;
        API.withdraw = data?.result?.endpoint?.withdraw;
        API.ourCasino = data?.result?.endpoint?.ourCasino;
        API.diamondCasino = data?.result?.endpoint?.diamondCasino;
        API.casinoType = data?.result?.endpoint?.casinoType;
        API.myMarket = data?.result?.endpoint?.myMarket;
        API.competition = data?.result?.endpoint?.competition;
        API.searchEvent = data?.result?.endpoint?.searchEvent;
        API.currentBets = data?.result?.endpoint?.currentBets;
        API.cache = data?.result?.endpoint?.cache;
        API.interval = data?.result?.settings?.interval;
        API.exposure = data?.result?.endpoint?.exposure;
        API.accountStatement = data?.result?.endpoint?.accountStatement;
        API.settledBets = data?.result?.endpoint?.settledBets;
        API.siteUrl = data?.result?.settings?.siteUrl;
        API.whatsApp = data?.result?.endpoint?.whatsapp;
        API.otp = data?.result?.endpoint?.otp;
        API.liveCasinoWolf = data?.result?.endpoint?.liveCasinoWolf;
        API.slotWolf = data?.result?.endpoint?.slotsWolf;
        API.liveCasinoIFrame = data?.result?.endpoint?.liveCasinoIframe;
        API.auraWolf = data?.result?.endpoint?.auraWolf;
        API.bonusClaim = data?.result?.endpoint?.bonusClaim;
        API.referralCode = data?.result?.endpoint?.referralCode;
        API.banner = data?.result?.endpoint?.banner;
        API.bankAccount = data?.result?.endpoint?.bankAccount;
        API.uploadScreenshot = data?.result?.endpoint?.uploadScreenshot;
        API.latestEvents = data?.result?.endpoint?.latestEvents;
        API.siteSetting = data?.result?.endpoint?.siteSettings;
        API.cache = data?.result?.endpoint?.cache;
        API.assets = data?.result?.endpoint?.assets;
        API.mac88 = data?.result?.endpoint?.mac88;
        API.bonus = data?.result?.endpoint?.bonus;
        API.index = data?.result?.endpoint?.index;
        API.withdrawBreakdown = data?.result?.endpoint?.withdrawBreakdown;
        API.sb_cashout = data?.result?.endpoint?.sb_cashout;
        API.fast_cashout = data?.result?.endpoint?.fast_cashout;

        Settings.logoFormat = data?.result?.settings?.logo?.format;
        Settings.logoHeight = data?.result?.settings?.logo?.height;
        Settings.logoWidth = data?.result?.settings?.logo?.width;
        Settings.bonus = data?.result?.settings?.bonus;
        Settings.otpWhatsapp = data?.result?.settings?.otpWhatsapp;
        Settings.mac88 = data?.result?.settings?.mac88;
        Settings.build = data?.result?.settings?.build;
        Settings.betFairCashOut = data?.result?.settings?.betFairCashOut;
        Settings.deposit = data?.result?.settings?.deposit;
        Settings.registrationWhatsapp =
          data?.result?.settings?.registrationWhatsapp;
        Settings.withdraw = data?.result?.settings?.withdraw;
        Settings.register = data?.result?.settings.register;
        Settings.demoLogin = data?.result?.settings?.demoLogin;
        Settings.disabledDevtool = data?.result?.settings?.disabledDevtool;
        Settings.otp = data?.result?.settings?.otp;
        Settings.siteUrl = data?.result?.settings?.siteUrl;
        Settings.siteTitle = data?.result?.settings?.siteTitle;
        Settings.interval = data?.result?.settings?.interval;
        Settings.referral = data?.result?.settings?.referral;
        Settings.buildVersion = data?.result?.settings?.buildVersion;
        Settings.balanceApiLoop = data?.result?.settings?.balanceApiLoop;
        Settings.baseUrl = data?.result?.settings?.baseUrl;
        Settings.otpless = data?.result?.settings?.otpless;
        Settings.casinoCurrency = data?.result?.settings?.casinoCurrency;
        Settings.apkLink = data?.result?.settings?.apkLink;
        Settings.b2c = data?.result?.settings?.b2c;
        Settings.bookmakerCashOut = data?.result?.settings?.bookmakerCashOut;
        Settings.language = data?.result?.settings?.language;
        Settings.betDelay = data?.result?.settings?.betDelay;
        Settings.complaint = data?.result?.settings?.complaint;
        Settings.aura = data?.result?.settings?.aura;
        Settings.appOnly = data?.result?.settings?.appOnly;

        setNoticeLoaded(true);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
