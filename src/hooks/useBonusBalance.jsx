import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UseEncryptData from "./UseEncryptData";
import UseTokenGenerator from "./UseTokenGenerator";
import useContextState from "./useContextState";
import { API } from "../api";
import { useEffect } from "react";
import { handleLogOut } from "../utils/handleLogOut";
import { useSettingsMutation } from "./settings";

const useBonusBalance = () => {
  const { mutate } = useSettingsMutation();
  const { setGetToken, isCheckedBonusToken, setTokenLoading } =
    useContextState();
  const bonusToken = localStorage.getItem("bonusToken");
  const language = localStorage.getItem("language");
  /* Bonus balance api */
  const { data: bonusBalanceData, refetch: bonusRefetchBalance } = useQuery({
    queryKey: ["bonusBalance"],
    enabled: isCheckedBonusToken,
    queryFn: async () => {
      const generatedToken = UseTokenGenerator();
      const encryptedData = UseEncryptData({
        token: generatedToken,
        language,
      });
      const res = await axios.post(API.balance, encryptedData, {
        headers: {
          Authorization: `Bearer ${bonusToken}`,
        },
      });
      /* Logout if success false */
      if (res?.data?.success === false && bonusToken) {
        handleLogOut();
        mutate();
        setTokenLoading(true);
        setGetToken((prev) => !prev);
      } else if (res?.data?.success && bonusToken) {
        const data = res.data?.result;
        return data;
      }
    },
    /* Refetch after 6 second */
    refetchInterval: 6000,
  });

  useEffect(() => {
    if (bonusToken) {
      bonusRefetchBalance();
    }
  }, [bonusToken, bonusRefetchBalance]);

  return { bonusBalanceData, bonusRefetchBalance };
};

export default useBonusBalance;
