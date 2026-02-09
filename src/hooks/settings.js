import { useMutation } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API, Settings } from "../api";
import { settingsAPI } from "../constant/constant";
import notice from "../../notice.json";

export const useSettingsMutation = () => {
  const site = notice?.result?.settings?.siteUrl;
  return useMutation({
    mutationKey: ["settings"],
    mutationFn: async () => {
      const { data } = await AxiosSecure.post(settingsAPI, { site });
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
      }
      return data;
    },
  });
};
