import React, { useState, useEffect } from "react";
import axios from "axios";
import { Save, RefreshCw, ThermometerSun, Waves, Settings } from "lucide-react";

const SettingsPage = () => {
  const [temperatureThreshold, setTemperatureThreshold] = useState("");
  const [waterThreshold, setWaterThreshold] = useState("");
  const [defaultMode, setDefaultMode] = useState("AUTO");
  const [notifications, setNotifications] = useState(true);
  const [loading, setLoading] = useState(true);

  const API_SETTINGS_URL = "https://aqua-track-server-side.vercel.app/api/settings";

  // Fetch current settings
  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_SETTINGS_URL);
      if (res.data) {
        setTemperatureThreshold(res.data.temperatureThreshold);
        setWaterThreshold(res.data.waterThreshold);
        setDefaultMode(res.data.defaultMode);
        setNotifications(res.data.notifications);
      }
      setLoading(false);
    } catch (err) {
      console.error("❌ Error fetching settings", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const saveSettings = async () => {
    try {
      await axios.post(API_SETTINGS_URL, {
        temperatureThreshold,
        waterThreshold,
        defaultMode,
        notifications,
      });
      alert("Settings saved successfully!");
    } catch (err) {
      console.error("❌ Error saving settings", err);
      alert("Failed to save settings.");
    }
  };

  const resetSettings = () => {
    setTemperatureThreshold("");
    setWaterThreshold("");
    setDefaultMode("AUTO");
    setNotifications(true);
  };

  return (
    <div className="p-6 w-full max-w-4xl mx-auto flex flex-col gap-8">
      <h1 className="text-4xl font-bold text-gray-700 text-center mb-6">Settings</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Settings className="animate-spin text-blue-600" size={48} />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Temperature Threshold */}
          <div className="backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 shadow-2xl rounded-2xl p-6 flex flex-col gap-4 border border-white/20">
            <div className="flex items-center gap-2">
              <ThermometerSun className="text-orange-500" size={28} />
              <h2 className="text-xl font-semibold text-gray-700">Temperature Threshold</h2>
            </div>
            <input
              type="number"
              value={temperatureThreshold}
              onChange={(e) => setTemperatureThreshold(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              placeholder="Set temperature in °C"
            />
          </div>

          {/* Water Level Threshold */}
          <div className="backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 shadow-2xl rounded-2xl p-6 flex flex-col gap-4 border border-white/20">
            <div className="flex items-center gap-2">
              <Waves className="text-blue-500" size={28} />
              <h2 className="text-xl font-semibold text-gray-700">Water Level Threshold</h2>
            </div>
            <input
              type="number"
              value={waterThreshold}
              onChange={(e) => setWaterThreshold(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Set water level in cm"
            />
          </div>

          {/* Default Mode */}
          <div className="backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 shadow-2xl rounded-2xl p-6 flex flex-col gap-4 border border-white/20">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Default Mode</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setDefaultMode("AUTO")}
                className={`flex-1 p-3 rounded-xl font-medium transition ${
                  defaultMode === "AUTO" ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md" : "bg-gray-200 dark:bg-gray-700 text-gray-700"
                }`}
              >
                AUTO
              </button>
              <button
                onClick={() => setDefaultMode("MANUAL")}
                className={`flex-1 p-3 rounded-xl font-medium transition ${
                  defaultMode === "MANUAL" ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md" : "bg-gray-200 dark:bg-gray-700 text-gray-700"
                }`}
              >
                MANUAL
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 shadow-2xl rounded-2xl p-6 flex flex-col gap-4 border border-white/20">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Notifications</h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="w-5 h-5 accent-blue-500"
              />
              <span className="text-gray-700 font-medium">Enable Alerts</span>
            </label>
          </div>
        </div> ,
        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={saveSettings}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md transition"
          >
            <Save size={20} /> Save Settings
          </button>
          <button
            onClick={resetSettings}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md transition"
          >
            <RefreshCw size={20} /> Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
