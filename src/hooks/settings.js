import { useMutation } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API, Settings } from "../api";
import { settingsAPI } from "../constant/constant";
import useContextState from "./useContextState";
import assets from "../assets";

export const useSettingsMutation = () => {
  const { setIcon, setLogo } = useContextState();
  return useMutation({
    mutationKey: ["settings"],
    mutationFn: async () => {
      const { data } = await AxiosSecure.post(settingsAPI);

      if (data?.success) {
        if (data?.result) {
          const { endpoint = {}, ...settings } = data.result;

          Object.keys(endpoint).forEach((key) => {
            API[key] = endpoint[key];
          });

          Object.keys(settings).forEach((key) => {
            Settings[key] = settings[key];
          });
        }

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
          const logo = `${API.assets}/${Settings.siteUrl}/logo.${Settings.logo_format}`;
          setLogo(logo);
        } else {
          setLogo(`/assets/img/logo.${Settings.logo_format}`);
        }

        /* Dynamically append  favicon  */
        const FavIconLink = document.createElement("link");
        FavIconLink.rel = "icon";
        FavIconLink.type = "image/png";
        FavIconLink.href = `${API.assets}/${Settings.siteUrl}/favicon.png`;
        document.head.appendChild(FavIconLink);
      }
      return data;
    },
  });
};
