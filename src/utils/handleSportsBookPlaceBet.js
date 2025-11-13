import { isRunnerSuspended } from "./isRunnerSuspended";

export const handleSportsBookPlaceBet = (
  column,
  item,
  sportsBook,
  setOpenBetSlip,
  setPlaceBetValues
) => {
  if (!isRunnerSuspended(item, column)) {
    setOpenBetSlip(true);
    setPlaceBetValues({});
    setPlaceBetValues({
      price: column?.Price?.toFixed(2),
      side: 0,
      back: true,
      selectionId: column?.Id,
      btype: "SPORTSBOOK",
      placeName: column?.Name,
      eventTypeId: sportsBook?.eventTypeId,
      betDelay: sportsBook?.betDelay,
      marketId: item?.Id,
      maxLiabilityPerMarket: item?.maxLiabilityPerMarket,
      maxLiabilityPerBet: item?.maxLiabilityPerBet,
      minLiabilityPerBet: item?.minLiabilityPerBet,
      isBettable: sportsBook?.isBettable,
      isWeak: sportsBook?.isWeak,
      marketName: item?.Name,
      eventId: sportsBook?.eventId,
    });
  }
};
