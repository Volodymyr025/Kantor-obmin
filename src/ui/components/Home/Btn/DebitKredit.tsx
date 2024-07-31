"use client";
import SendDebitCredit from "../../Window/SendDebitCredit";
import BtnWrapper from "./BtnWrapper/BtnWrapper";

export default function DebitCreditBtn() {
  return <BtnWrapper Window={SendDebitCredit} title="Дебет/Кредит" />;
}
