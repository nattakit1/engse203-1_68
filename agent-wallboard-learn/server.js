// server.js
const express = require('express');
const app = express();
const PORT = 3001;

// Middleware สำหรับอ่าน JSON body
app.use(express.json());

// ข้อมูลตัวอย่าง agents
const agents = [
    { code: "A001", name: "Nattakit", status: "Available" },
    { code: "A002", name: "๋John", status: "Active" },
    { code: "A003", name: "๋Jinny", status: "Active" },
];

// ===================
// Routes
// ===================

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

// อัพเดตสถานะ agent
app.put('/api/agents/:code/status', (req, res) => {
    const agentCode = req.params.code;
    const newStatus = req.body.status;

    const agent = agents.find(a => a.code === agentCode);

    if (!agent) {
        return res.status(404).json({
            success: false,
            message: "Agent not found",
            timestamp: new Date().toISOString()
        });
    }

    const validStatuses = ["Available", "Active", "Wrap Up", "Not Ready", "Offline"];
    if (!validStatuses.includes(newStatus)) {
        return res.status(400).json({
            success: false,
            message: `Invalid status. Valid statuses: ${validStatuses.join(", ")}`,
            timestamp: new Date().toISOString()
        });
    }

    const oldStatus = agent.status;
    agent.status = newStatus;

    res.json({
        success: true,
        message: `Agent ${agent.code} status updated from '${oldStatus}' to '${newStatus}'`,
        data: agent,
        timestamp: new Date().toISOString()
    });
});

// ===================
// Start server
// ===================
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
