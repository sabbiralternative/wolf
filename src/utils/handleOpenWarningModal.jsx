import { Settings } from "../api";

const handleOpenWarningModal = async (
  sportsType,
  id,
  name,
  token,
  navigate,
  setGameId,
  setShowWarning,
) => {
  if (token) {
    if (Settings.casino_currency !== "AED" || sportsType === "aura") {
      navigate(`/casino/${name.replace(/ /g, "")}/${id}`);
    } else {
      setGameId("");
      setGameId(id);
      setShowWarning(true);
    }
  } else {
    setShowWarning(true);
  }
};

export default handleOpenWarningModal;
