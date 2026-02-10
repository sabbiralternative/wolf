import { useEffect } from "react";
import useContextState from "../../hooks/useContextState";
import { useSettingsMutation } from "../../hooks/settings";

const SettingsLayout = ({ children }) => {
  const { token } = useContextState();
  const { mutate } = useSettingsMutation();

  useEffect(() => {
    mutate();
  }, [token, mutate]);

  return children;
};

export default SettingsLayout;
