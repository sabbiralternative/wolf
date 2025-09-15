import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

const useDepositBreakdown = () => {
  return useQuery({
    queryKey: ["deposit-breakdown"],
    queryFn: async (payload) => {
      const { data } = await AxiosSecure.post(
        `${API.depositBreakdown}`,
        payload
      );

      if (data.success) {
        return data.result;
      }
    },
  });
};

export default useDepositBreakdown;
