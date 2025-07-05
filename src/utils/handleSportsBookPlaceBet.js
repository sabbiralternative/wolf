export const handleSportsBookPlaceBet = (
  column,
  item,
  sportsBook,
  setOpenBetSlip,
  setPlaceBetValues
) => {
  setOpenBetSlip(true);
  setPlaceBetValues({});
  setPlaceBetValues({
    price: column?.Price?.toFixed(2),
    side: 0,
    selectionId: column?.Id,
    btype: "SPORTSBOOK",
    placeName: column?.Name,
    eventTypeId: sportsBook?.eventTypeId,
    betDelay: sportsBook?.betDelay,
    marketId: item?.Id,
    maxLiabilityPerMarket: item?.maxLiabilityPerMarket,
    maxLiabilityPerBet: item?.maxLiabilityPerBet,
    isBettable: sportsBook?.isBettable,
    isWeak: sportsBook?.isWeak,
    marketName: item?.Name,
    eventId: sportsBook?.eventId,
  });
};
