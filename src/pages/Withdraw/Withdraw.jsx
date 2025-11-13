/* eslint-disable react/no-unknown-property */

import { useState } from "react";
import ChooseAmount from "./ChoseAmount";
import BankAccount from "./BankAccount";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [tab, setTab] = useState("choseAmount");
  return (
    <div
      _ngcontent-ng-c943649379=""
      className="page-body demoID "
      style={{ height: "100vh" }}
    >
      {tab === "choseAmount" && (
        <ChooseAmount amount={amount} setAmount={setAmount} setTab={setTab} />
      )}
      {tab === "bank" && <BankAccount amount={amount} />}
    </div>
  );
};

export default Withdraw;
