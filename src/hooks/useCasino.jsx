import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useContextState from "./useContextState";
import { API, Settings } from "../api";
import useLanguage from "./useLanguage";
/* Get casino */
const useCasino = () => {
  const { language } = useLanguage();
  const { token } = useContextState();

  const {
    data,
    refetch: refetchLiveCasino,
    isLoading,
  } = useQuery({
    queryKey: ["casinoWolf"],
    queryFn: async () => {
      let payload = {
        gameList: "All",
        product: "All",
        isHome: true,
      };
      if (Settings?.language) {
        payload.language = language;
      }
      const res = await axios.post(API.slotsWolf, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = res?.data;
      if (result?.status === "success") {
        return result?.data;
      }
    },
    refetchOnWindowFocus: false,
  });
  return { data, refetchLiveCasino, isLoading };
};

export default useCasino;
