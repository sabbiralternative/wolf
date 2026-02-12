import { useEffect } from "react";
import useContextState from "../../hooks/useContextState";
import { useSettingsMutation } from "../../hooks/settings";
import { API } from "../../api";

const SettingsLayout = ({ children }) => {
  const { token } = useContextState();
  const { mutate } = useSettingsMutation();

  useEffect(() => {
    mutate();
  }, [token, mutate]);

  if (!API.login) {
    return null;
  }

  return children;
};

export default SettingsLayout;
