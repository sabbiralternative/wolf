export const handlePlaceBet = (
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
          name: rnr?.name,
          updatedExposure: pnl?.pnl,
        });
      } else {
        updatedPnl.push({
          exposure: 0,
          id: rnr?.id,
          isBettingOnThisRunner: rnr?.id === runner?.id,
          name: rnr?.name,
        });
      }
    });
    if (item?.btype) {
      price = betType === "back" ? runner?.back[0].price : runner?.lay[0].price;
    } else {
      price =
        betType === "back"
          ? runner?.ex?.availableToBack?.[0]?.price
          : runner?.ex?.availableToLay?.[0]?.price;
    }
    setOpenBetSlip(true);
    setPlaceBetValues({});
    setPlaceBetValues({
      price,
      side: betType === "back" ? 0 : 1,
      selectionId: runner?.id || runner?.selectionId,
      btype: item?.btype,
      eventTypeId: item?.eventTypeId || item?.marketId,
      betDelay: item?.betDelay,
      marketId: item?.id || item?.selectionId,
      lay: betType === "lay",
      back: betType === "back",
      selectedBetName: runner?.name,
      name: item.runners.map((runner) => runner.name),
      runnerId: item.runners.map((runner) => runner.id || runner.selectionId),
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
