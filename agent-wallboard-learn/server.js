// server.js
const express = require('express');
const app = express();
const PORT = 3001;

// ข้อมูลตัวอย่าง agent
const agents = [
    {
        code: "A001",
        name: "Nattakit",
        status: "Available"
    },
    {
        code: "A002",
        name: "John",
        status: "Active"
    },
     {
        code: "A003",
        name: "Jijoo",
        status: "Active"
    }
];

// หน้าแรก
app.get('/', (req, res) => {
    res.send("Hello Agent Wallboard!");
});

// หน้า hello
app.get('/hello', (req, res) => {
    res.send("สวัสดี");
});

// ตรวจสอบสุขภาพ server
app.get('/health', (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date().toISOString()
    });
});

// แสดงข้อมูล agents ทั้งหมด
app.get('/api/agents', (req, res) => {
    res.json({
        success: true,
        data: agents,
        count: agents.length,
        timestamp: new Date().toISOString()
    });
});

// แสดงข้อมูล agent รายคน
app.get('/api/agents/:code', (req, res) => {
    const agent = agents.find(a => a.code === req.params.code);
    if(agent){
        res.json({
            success: true,
            data: agent,
            timestamp: new Date().toISOString()
        });
    } else {
        res.status(404).json({
            success: false,
            message: "Agent not found",
            timestamp: new Date().toISOString()
        });
    }
});

// เริ่ม server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
