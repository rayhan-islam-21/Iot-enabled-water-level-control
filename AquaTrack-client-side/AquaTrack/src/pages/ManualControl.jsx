import React, { useState, useEffect } from "react";
import axios from "axios";
import { Power, Fan, ThermometerSun, Waves, Loader2 } from "lucide-react";

const ManualControl = () => {
  const [mode, setMode] = useState("AUTO");
  const [motor1, setMotor1] = useState("OFF");
  const [motor2, setMotor2] = useState("OFF");
  const [temperature, setTemperature] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_PUMP_URL = "https://aqua-track-server-side.vercel.app/api/pump";
  const API_DATA_URL = "https://aqua-track-server-side.vercel.app/api/data";

  // ✅ Fetch pump state (mode + motors)
  const fetchPumpState = async () => {
    try {
      const res = await axios.get(API_PUMP_URL);
      setMode(res.data.mode);
      setMotor1(res.data.motor1);
      setMotor2(res.data.motor2);
    } catch (err) {
      console.error("❌ Error fetching pump state", err);
    }
  };

  // ✅ Fetch only sensor data (no mode/motor update)
  const fetchLatestData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_DATA_URL);
      if (res.data.length > 0) {
        const latest = res.data[0];
        setTemperature(latest.temperature?.toFixed(1));
        setDistance(latest.distance);
      }
      setLoading(false);
    } catch (err) {
      console.error("❌ Error fetching latest data", err);
      setLoading(false);
    }
  };

  // ✅ Toggle mode (optimistic UI update)
  const toggleMode = async () => {
    const newMode = mode === "AUTO" ? "MANUAL" : "AUTO";
    setMode(newMode); // instant UI
    try {
      await axios.post(API_PUMP_URL, { mode: newMode, motor1, motor2 });
    } catch (err) {
      console.error("❌ Error toggling mode", err);
      fetchPumpState(); // rollback if error
    }
  };

  // ✅ Toggle motors (only when MANUAL)
  const toggleMotor = async (motor) => {
    if (mode !== "MANUAL") return;

    let newMotor1 = motor1;
    let newMotor2 = motor2;

    if (motor === 1) newMotor1 = motor1 === "ON" ? "OFF" : "ON";
    if (motor === 2) newMotor2 = motor2 === "ON" ? "OFF" : "ON";

    setMotor1(newMotor1);
    setMotor2(newMotor2);

    try {
      await axios.post(API_PUMP_URL, { mode, motor1: newMotor1, motor2: newMotor2 });
    } catch (err) {
      console.error("❌ Error toggling motor", err);
      fetchPumpState(); // rollback
    }
  };

  useEffect(() => {
    fetchPumpState();
    fetchLatestData();
    const interval = setInterval(() => {
      fetchPumpState();
      fetchLatestData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 p-6 w-full">
      {/* Mode Toggle */}
      <div className="flex items-center gap-4">
        <span className="font-semibold text-lg text-gray-600">AUTO</span>
        <div
          onClick={toggleMode}
          className={`w-20 h-10 flex items-center rounded-full cursor-pointer shadow-lg transition-all duration-500 p-1
            ${mode === "AUTO" ? "bg-gradient-to-r from-blue-400 to-blue-600" : "bg-gradient-to-r from-purple-500 to-pink-600"}`}
        >
          <div
            className={`w-8 h-8 rounded-full bg-white shadow-md transform transition-all duration-500
              ${mode === "AUTO" ? "translate-x-0" : "translate-x-10"}`}
          ></div>
        </div>
        <span className="font-semibold text-lg text-gray-600">MANUAL</span>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-3xl">
        {/* Temperature */}
        <div className="backdrop-blur-lg bg-white/30 dark:bg-gray-800/30 shadow-lg rounded-2xl p-6 flex flex-col items-center gap-2 border border-white/20 min-h-[140px]">
          <ThermometerSun className="text-orange-500" size={36} />
          <p className="text-gray-700 dark:text-gray-200 text-sm">Temperature</p>
          {loading ? (
            <Loader2 className="animate-spin text-orange-600" size={28} />
          ) : (
            <p className="text-2xl font-bold text-orange-600">
              {temperature !== null ? `${temperature}°C` : "--"}
            </p>
          )}
        </div>

        {/* Water Level */}
        <div className="backdrop-blur-lg bg-white/30 dark:bg-gray-800/30 shadow-lg rounded-2xl p-6 flex flex-col items-center gap-2 border border-white/20 min-h-[140px]">
          <Waves className="text-blue-500" size={36} />
          <p className="text-gray-700 dark:text-gray-200 text-sm">Water Level</p>
          {loading ? (
            <Loader2 className="animate-spin text-blue-600" size={28} />
          ) : (
            <p className="text-2xl font-bold text-blue-600">
              {distance !== null ? `${distance} cm` : "--"}
            </p>
          )}
        </div>
      </div>

      {/* Motor Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        {/* Motor 1 */}
        <div
          className={`relative flex flex-col items-center gap-5 p-6 rounded-2xl shadow-2xl transition-all duration-500 border
          ${motor1 === "ON" ? "bg-green-50 border-green-400" : "bg-red-50 border-red-400"}`}
        >
          <div
            className={`absolute -top-4 w-16 h-16 rounded-full blur-lg opacity-40 
            ${motor1 === "ON" ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
          ></div>
          <Fan
            size={70}
            className={`${motor1 === "ON" ? "text-green-600 animate-spin" : "text-red-500"}`}
          />
          <h2 className="text-lg font-bold">Motor 1</h2>
          <button
            onClick={() => toggleMotor(1)}
            disabled={mode !== "MANUAL"}
            className={`px-6 py-2 flex items-center gap-2 rounded-xl shadow-md transition
              ${motor1 === "ON"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"} 
              text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            <Power size={20} />
            {motor1}
          </button>
        </div>

        {/* Motor 2 */}
        <div
          className={`relative flex flex-col items-center gap-5 p-6 rounded-2xl shadow-2xl transition-all duration-500 border
          ${motor2 === "ON" ? "bg-green-50 border-green-400" : "bg-red-50 border-red-400"}`}
        >
          <div
            className={`absolute -top-4 w-16 h-16 rounded-full blur-lg opacity-40 
            ${motor2 === "ON" ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
          ></div>
          <Fan
            size={70}
            className={`${motor2 === "ON" ? "text-green-600 animate-spin" : "text-red-500"}`}
          />
          <h2 className="text-lg font-bold">Motor 2</h2>
          <button
            onClick={() => toggleMotor(2)}
            disabled={mode !== "MANUAL"}
            className={`px-6 py-2 flex items-center gap-2 rounded-xl shadow-md transition
              ${motor2 === "ON"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"} 
              text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            <Power size={20} />
            {motor2}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualControl;
