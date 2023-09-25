"use client"

import { useEffect, useState } from "react";

export default function Nakami(){
  const [purpose,setPurpose] = useState<string>("");
  const [payType,setPayType] = useState<number>(1);

  const [money,setMoeny] = useState<number>(0);
  const [useMonth,setUseMonth] = useState<number>(0);
  const [span,setSpan] = useState<number>(0);

  const [csv,setCsv] = useState<string>("");

  useEffect(()=>{
    let _csv = `purpose,${purpose}\n`;
    _csv += `money,${money}yen\n`
    _csv += `pay type,${(payType===1 ? "one time\n" : "subscribe\n")}`;
    _csv += `use month,${useMonth}month\n`;
    if(payType === 2){
      _csv += `pay span,${span}month\n`;
    }
    _csv += `like one time,${payType === 1 ? money:money*useMonth/span}yen\n`;
    _csv += `like subscribe,${payType === 1 ? money/useMonth : money/span}yen/month\n`;
    setCsv(_csv);
  },[payType,money,useMonth,span])
  return (
    <>
      <h1>Input</h1>
      <h2>Purpose</h2>
      <input type="text" value={purpose} onChange={(e)=>{setPurpose(e.target.value)}}/>
      <h2>How much?</h2>
      <input type="number" value={money} onChange={(e)=>{setMoeny(Number(e.target.value))}}/>yen
      <h2>Is this subscribe or one time?  </h2>
      <select defaultValue={payType} onChange={(e)=>{setPayType(Number(e.target.value))}}>
        <option value={1}>one time</option>
        <option value={2}>subscribe</option>
      </select>
      {
        payType === 2 &&
        <>
        <h2>How long the span?</h2>
        <input type="number" value={span} onChange={(e)=>{setSpan(Number(e.target.value))}} />month
        </>
      }
      <h2>How long use?</h2>
      <input type="number" value={useMonth} onChange={(e)=>{setUseMonth(Number(e.target.value))}}/>month
      
      <h1>Simulation</h1>
      <h2>Like one time</h2>
      {
        payType === 1 &&
        <p>{money}yen</p>
      }
      {
        payType === 2 &&
        <p>{money * useMonth/span}yen</p>
      }
      <h2>Like subscribe</h2>
      {
        payType === 1 &&
        <p>{money/useMonth}yen/month</p>
      }
      {
        payType === 2 &&
        <p>{money/span}yen/month</p>
      }
      <button
      onClick={()=>{
        const link = document.createElement('a');
        const blob = new Blob([csv],{type:'text/csv'});
        const fileUrl = window.URL.createObjectURL(blob);
        link.href = fileUrl;
        link.download = `${purpose}-price simulation.csv`;
        link.click();
      }}
      >
        CSV出力
      </button>
    </>
  )
}