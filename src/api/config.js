import axios from "axios";
import { API, Settings } from "./index";
import notice from "../../notice.json";
import { AxiosSecure } from "../lib/AxiosSecure";
import { settingsAPI } from "../constant/constant";

export const getSetApis = async (setNoticeLoaded, baseUrl) => {
  const site = notice?.result?.settings?.siteUrl;
  const url = baseUrl ? `${baseUrl}/notice.json` : "/notice.json";
  const { data: settingsResponse } = await axios.get(url);
  const { data: dataResponse } = await AxiosSecure.post(settingsAPI, { site });

  if (dataResponse?.result) {
    const { endpoint = {}, ...rest } = dataResponse.result;
    // Dynamically update API object
    Object.keys(endpoint).forEach((key) => {
      API[key] = endpoint[key];
    });
    Object.keys(rest).forEach((key) => {
      Settings[key] = rest[key];
    });
  }

  if (settingsResponse?.result) {
    // Destructure API endpoints and Settings
    const { settings = {} } = settingsResponse.result;
    // Dynamically update Settings object
    Object.keys(settings).forEach((key) => {
      if (key === "logo") {
        Settings.logoHeight = settings?.["logo"]?.height;
        Settings.logoWidth = settings?.["logo"]?.width;
        Settings.logoFormat = settings?.["logo"]?.format;
      } else {
        Settings[key] = settings[key];
      }
    });

    setNoticeLoaded(true);
  }
};
