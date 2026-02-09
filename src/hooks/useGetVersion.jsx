import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { settingsAPI } from "../constant/constant";
const useGetVersion = () => {
  const { data: version, refetch: refetchVersion } = useQuery({
    queryKey: ["version"],
    queryFn: async () => {
      const res = await axios.post(settingsAPI);
      const data = res?.data;
      if (data?.success) {
        return data?.result;
      }
    },
    refetchOnWindowFocus: false,
  });
  return { version, refetchVersion };
};

export default useGetVersion;
