"use client";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { format } from "date-fns";

declare var documet: any;

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(null);

  function getLunarPhase(day: any) {
    const lunarDay = day % 30; // รอบจันทรคติ 30 วัน
    let phase = "";
    let waxingPercent = 0;
    let waningPercent = 0;

    if (lunarDay <= 15) {
      phase = `ขึ้น ${lunarDay} ค่ำ`;
      waxingPercent = (lunarDay / 15) * 100;
      waningPercent = 100 - waxingPercent;
    } else {
      phase = `แรม ${lunarDay - 15} ค่ำ`;
      waningPercent = ((lunarDay - 15) / 15) * 100;
      waxingPercent = 100 - waningPercent;
    }

    return { phase, waxingPercent: waxingPercent.toFixed(2), waningPercent: waningPercent.toFixed(2) };
  }

  function calculateTideStatus(lunarPhase: any) {
    if (lunarPhase.includes("15 ค่ำ")) {
      return "⚠️ น้ำขึ้นสูง มีความเสี่ยงน้ำทะเลหนุน!";
    } else {
      return "✅ น้ำขึ้นน้ำลงปกติ";
    }
  }

  const predictTide = () => {
    const date = selectedDate;
    if (!date) {
      alert("กรุณาเลือกวันที่");
      return;
    }

    const day = new Date(date).getDate();
    const formattedDate = format(new Date(date), "dd/MM/yyyy");
    const { phase, waxingPercent, waningPercent } = getLunarPhase(day);
    const tideStatus = calculateTideStatus(phase);

    let message = `<h2>พยากรณ์วันที่ ${formattedDate}</h2>`;
    message += `<p>🌙 เฟสของดวงจันทร์: <b>${phase}</b></p>`;
    message += `<p>📈 ข้างขึ้น: <b>${waxingPercent}%</b></p>`;
    message += `<p>📉 ข้างแรม: <b>${waningPercent}%</b></p>`;
    message += `<p>${tideStatus}</p>`;
    const resultElement = document.getElementById("result");
    if (resultElement) {
      resultElement.innerHTML = message;
    }
  }


  return (
    <div className="flex justify-center">

      <div className="bg-white mt-5 p-3 rounded-4xl text-black text-center shadow-lg" style={{ width: "500px", marginTop: 100 }}>
        <h1 className="font-bold text-[40px]">Sea level forecast</h1>
        <div className="bg-white p-3 rounded-2x1 text-black text-center">
          <DatePicker label="Basic date picker"
            onChange={(newValue: any) => {
              console.log("Selected Date:", newValue);
              setSelectedDate(newValue);
            }} />
          <div className="mt-3 text-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={predictTide} >Search</button>
          </div>
          <div id="result" className='text-left mt-5'>

          </div>
        </div>
      </div>

    </div>
  );
}
