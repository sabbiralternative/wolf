export const handleHorsePlaceBet = (
  item,
  runner,
  betType,
  setOpenBetSlip,
  setPlaceBetValues,
  pnlBySelection,
  setShowLoginWarn,
  token
) => {
  if (token) {
    let price;
    const updatedPnl = [];
    item?.runners?.forEach((rnr) => {
      const pnl = pnlBySelection?.find((p) => p?.RunnerId === rnr?.id);
      if (pnl) {
        updatedPnl.push({
          exposure: pnl?.pnl,
          id: pnl?.RunnerId,
          isBettingOnThisRunner: rnr?.id === runner?.id,
          name: rnr?.horse_name,
          updatedExposure: pnl?.pnl,
        });
      } else {
        updatedPnl.push({
          exposure: 0,
          id: rnr?.id,
          isBettingOnThisRunner: rnr?.id === runner?.id,
          name: rnr?.horse_name,
        });
      }
    });

    price = betType === "back" ? runner?.back[0].price : runner?.lay[0].price;

    setOpenBetSlip(true);
    setPlaceBetValues({});
    setPlaceBetValues({
      price,
      side: betType === "back" ? 0 : 1,
      selectionId: runner?.id,
      btype: item?.btype,
      eventTypeId: item?.eventTypeId,
      betDelay: item?.betDelay,
      marketId: item?.id,
      lay: betType === "lay",
      back: betType === "back",
      selectedBetName: runner?.horse_name,
      name: item.runners.map((runner) => runner.horse_name),
      runnerId: item.runners.map((runner) => runner.id),
      isWeak: item?.isWeak,
      maxLiabilityPerMarket: item?.maxLiabilityPerMarket,
      isBettable: item?.isBettable,
      maxLiabilityPerBet: item?.maxLiabilityPerBet,
      exposure: updatedPnl,
      marketName: item?.name,
      eventId: item?.eventId,
    });
  } else {
    setShowLoginWarn("Please log in to play.");
  }
};
