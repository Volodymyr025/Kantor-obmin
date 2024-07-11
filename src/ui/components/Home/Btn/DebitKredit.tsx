"use client";
import SendDebitCredit from "../../Dialog/SendDebitCredit";
import BtnWrapper from "./BtnWrapper/BtnWrapper";

export default function DebitCreditBtn() {
  return <BtnWrapper Window={SendDebitCredit} title="Дебет/Кредит" />;
}
