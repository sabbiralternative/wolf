import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useContextState from "./useContextState";
import { API, Settings } from "../api";
import useLanguage from "./useLanguage";

/* go casino api(aura) */
const useGoCasino = () => {
  const { language } = useLanguage();
  const { token } = useContextState();
  const {
    data,
    refetch: refetchLiveCasino,
    isLoading,
  } = useQuery({
    queryKey: ["goCasinoWolf"],

    queryFn: async () => {
      let payload = {
        gameList: "All",
        product: "All",
        isHome: true,
      };
      if (Settings.language) {
        payload.language = language;
      }
      const res = await axios.post(API.mac88, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = res?.data;

      if (result?.success) {
        return result?.data;
      }
    },
    refetchOnWindowFocus: false,
  });
  return { data, refetchLiveCasino, isLoading };
};

export default useGoCasino;
