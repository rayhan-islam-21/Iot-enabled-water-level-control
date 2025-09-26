import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThermometerSun, Waves, Loader2, Zap } from "lucide-react";

const HistoryPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_DATA_URL = "https://aqua-track-server-side.vercel.app/api/data";

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_DATA_URL);
      const sorted = res.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setData(sorted);
      setLoading(false);
    } catch (err) {
      console.error("❌ Error fetching history data", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="p-6 w-full max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-700 mb-8 text-center">Pump History</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-blue-600" size={48} />
        </div>
      ) : data.length === 0 ? (
        <p className="text-gray-500 text-center">No history available</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {data.map((item) => (
            <div
              key={item._id}
              className="relative backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 shadow-2xl rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300"
            >
              {/* Timestamp */}
              <p className="text-sm text-gray-500 mb-3 text-right">{new Date(item.timestamp).toLocaleString()}</p>

              {/* Temp & Water */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <ThermometerSun className="text-orange-500" size={28} />
                  <span className="text-orange-600 font-bold text-lg">{item.temperature.toFixed(1)}°C</span>
                </div>
                <div className="flex items-center gap-2">
                  <Waves className="text-blue-500" size={28} />
                  <span className="text-blue-600 font-bold text-lg">{item.distance} cm</span>
                </div>
              </div>

              {/* Motors & Mode */}
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <div className={`flex items-center gap-1 font-semibold ${item.motor1 === "ON" ? "text-green-600" : "text-red-500"}`}>
                    <Zap size={18} /> Motor 1: {item.motor1}
                  </div>
                  <div className={`flex items-center gap-1 font-semibold ${item.motor2 === "ON" ? "text-green-600" : "text-red-500"}`}>
                    <Zap size={18} /> Motor 2: {item.motor2}
                  </div>
                </div>
                <span className="text-gray-700 dark:text-gray-200 font-semibold bg-gradient-to-r from-purple-400 to-pink-500 text-white px-3 py-1 rounded-xl shadow-md">
                  {item.mode}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
