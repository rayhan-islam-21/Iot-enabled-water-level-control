IoT-Enabled Water Level Control System 💧⚡

An ESP32-based IoT smart water management system with automatic/manual pump control, temperature monitoring, and real-time data logging.
The system uses ultrasonic sensors, a temperature sensor, and relays to control a water pump and cooling fan.

🚀 Features

📡 WiFi-enabled ESP32 — connects to backend via REST API.

🤖 AUTO mode:

Pump ON when water level between lowLevel and fullLevel.

Pump OFF when tank empty or full.

Fan ON when temperature > 30°C or < 15°C.

🧑‍💻 MANUAL mode: Control pump and fan directly from backend dashboard.

📊 Data logging: Sends temperature, water level, and motor status to backend every 5s.

🖥️ LCD Display: Shows system mode, temperature, and tank level.

🛠️ Hardware Used

ESP32 WiFi development board

HC-SR04 Ultrasonic Sensor (water level measurement)

DS18B20 Temperature Sensor

I2C 16x2 LCD (display mode, temp, distance)

Relay Module (controls pump + fan)

Water Pump & Cooling Fan

🔌 Pin Connections
Component	ESP32 Pin
Ultrasonic TRIG	14
Ultrasonic ECHO	27
Temp Sensor (DQ)	26
Pump Relay	19
Fan Relay	18
LCD (I2C)	SDA/SCL
📡 API Endpoints

POST /api/data → Send sensor readings + motor status

GET /api/pump → Get mode (AUTO/MANUAL) and pump/fan commands

⚙️ Installation

Clone this repo:

git clone https://github.com/your-username/Iot-enabled-water-level-control.git
cd Iot-enabled-water-level-control


Open the project in Arduino IDE or PlatformIO.

Install required libraries:

WiFi.h

HTTPClient.h

LiquidCrystal_I2C.h

OneWire.h

DallasTemperature.h

ArduinoJson.h

Flash to ESP32.


🧑‍💻 Author

Developed by Rayhan Islam
Live Demo : https://aqua-track-6fff1.web.app/
