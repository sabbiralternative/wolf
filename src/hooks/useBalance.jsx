import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import useContextState from "./useContextState";
import { API } from "../api";
import { handleLogOut } from "../utils/handleLogOut";

/* Balance api */
const useBalance = () => {
  const { token, setGetToken, tokenLoading, setTokenLoading } =
    useContextState();
  const { data: balanceData = {}, refetch: refetchBalance } = useQuery({
    queryKey: ["balance"],
    enabled: !tokenLoading,
    queryFn: async () => {
      if (!token) {
        return;
      }
      const res = await AxiosSecure.post(API.balance);
      if (res?.data?.success === false && token) {
        /* Logout if success false  */
        handleLogOut();

        setTokenLoading(true);
        /* Get current token */
        setGetToken((prev) => !prev);
      }
      if (res?.data?.success && token) {
        const data = res.data?.result;
        return data;
      }
    },
    /* Refetch after 6 second */
  });

  return { balanceData, refetchBalance };
};

export default useBalance;
