const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// ใช้ middleware
app.use(cors());
app.use(bodyParser.json());

// ข้อมูลลานจอดรถ (ตัวอย่าง)
let parkingData = [
    { id: 1, occupied: false },
    { id: 2, occupied: false },
    { id: 3, occupied: false },
    { id: 4, occupied: false },
    { id: 5, occupied: false },
    { id: 6, occupied: false },
    { id: 7, occupied: false },
    { id: 8, occupied: false },
];

// Endpoint สำหรับรับข้อมูลจาก Arduino
app.post('/api/parking', (req, res) => {
    const { sensorId, status } = req.body; // รับข้อมูลจาก Arduino
    if (sensorId !== undefined && status !== undefined) {
        // อัปเดตสถานะการจอดรถ
        parkingData[sensorId - 1].occupied = status; 
        console.log(`Sensor ${sensorId} updated to ${status}`);
        
        // ส่งข้อมูลกลับไป
        res.json({ message: 'Data received', parkingData });
    } else {
        res.status(400).json({ message: 'Invalid data' });
    }
});

// Endpoint สำหรับส่งข้อมูลสถานะที่จอดรถ (GET)
app.get('/api/parking', (req, res) => {
    res.json(parkingData); // ส่งข้อมูลสถานะกลับไปยัง client
});

// ฟังก์ชันเพื่อรีเฟรชข้อมูล
function refreshData() {
    console.log("Refreshing data...");
    // ที่นี่สามารถเพิ่มโค้ดที่อ่านค่าจากเซนเซอร์ได้
    // สมมติว่าเราต้องการอ่านค่าจากเซนเซอร์ใหม่และอัปเดตข้อมูล
    // ตัวอย่าง: 
    parkingData.forEach((slot, index) => {
        // แทนที่ค่าด้วยข้อมูลใหม่จากเซนเซอร์
        // slot.occupied = readSensorValue(index); // ฟังก์ชันนี้ควรอ่านค่าจากเซนเซอร์
    });
}

// ตั้งค่าให้ refreshData ทำงานทุก ๆ วินาที
setInterval(refreshData, 1000); // 1000 milliseconds = 1 second

// รันเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});