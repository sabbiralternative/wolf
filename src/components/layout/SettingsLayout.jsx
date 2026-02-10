import { useEffect } from "react";
import useContextState from "../../hooks/useContextState";
import { useSettingsMutation } from "../../hooks/settings";
import { API, Settings } from "../../api";
import assets from "../../assets";

const SettingsLayout = ({ children }) => {
  const {
    token,
    setToken,
    setIsCheckedBonusToken,
    setTokenLoading,
    getToken,
    setIcon,
    setLogo,
    closePopupForForever,
  } = useContextState();
  const { mutate, isSuccess } = useSettingsMutation();

  useEffect(() => {
    mutate();
  }, [token, mutate]);

  /* Get token from locale storage */
  useEffect(() => {
    if (isSuccess) {
      const getToken = localStorage.getItem("token");
      const getBonusToken = localStorage.getItem("bonusToken");
      const getCheckedBonusToken = localStorage.getItem("checkedBonusToken");

      /* If check box true of bonus token and bonus token available then using bonus token in authorization headers */
      if (getCheckedBonusToken && getBonusToken) {
        /* Set bonus token */
        setToken(getBonusToken);
        /* Check box true of bonus */
        setIsCheckedBonusToken(true);
      } else {
        /* Set default token */
        setToken(getToken);
        /* Checkbox box false */
        setIsCheckedBonusToken(false);
      }

      if (token && (getToken === token || getBonusToken === token)) {
        /* handle loading for save crash website` */
        setTokenLoading(false);
      }
    }
  }, [
    getToken,
    token,
    isSuccess,
    setIsCheckedBonusToken,
    setToken,
    setTokenLoading,
  ]);

  useEffect(() => {
    if (isSuccess) {
      /* Dynamically get  footer logo  */
      if (Settings.build === "production") {
        const icon = `${API.assets}/${Settings.siteUrl}/nav-sprite.svg`;
        setIcon(icon);
      } else {
        setIcon(assets.navSprite);
      }

      /* Dynamically append  theme css  */
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      if (Settings.build === "production") {
        link.href = `${API.assets}/${Settings.siteUrl}/theme.css`;
        document.head.appendChild(link);
      } else {
        link.href = `/assets/css/theme.css`;
        document.head.appendChild(link);
      }

      /*Dynamically append Logo */
      if (Settings.build === "production") {
        const logo = `${API.assets}/${Settings.siteUrl}/logo.${Settings.logoFormat}`;
        setLogo(logo);
      } else {
        setLogo(`/assets/img/logo.${Settings.logoFormat}`);
      }

      /* Dynamically append  favicon  */
      const FavIconLink = document.createElement("link");
      FavIconLink.rel = "icon";
      FavIconLink.type = "image/png";
      FavIconLink.href = `${API.assets}/${Settings.siteUrl}/favicon.png`;
      document.head.appendChild(FavIconLink);
      /* Site title */
      if (Settings.appOnly && !closePopupForForever) {
        document.title = window.location.hostname;
      } else {
        document.title = Settings.siteTitle;
      }
    }
  }, [closePopupForForever, isSuccess, setIcon, setLogo]);

  if (!isSuccess) {
    return null;
  }

  return children;
};

export default SettingsLayout;
