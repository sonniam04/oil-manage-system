const express = require('express');
const router = express.Router();
const Price = require('../models/priceFuelModel')

router.get('/apiPrice', async (req, res) => {
    try {
        // ดึงข้อมูลล่าสุดจากฐานข้อมูล
        const data = await Price.find({}).sort({ createdAt: -1 }).limit(1);
        
        // ตรวจสอบว่ามีข้อมูลหรือไม่
        if (data.length === 0) {
            return res.status(404).json({ message: 'No price data found' });
        }

        // ดึงข้อมูลจากแถวแรกของอาร์เรย์
        const latestData = data[0];

        // จัดรูปแบบข้อมูลที่ต้องการส่ง
        const formatData = {
            gasohol95: latestData.gasohol95,
            gasohol91: latestData.gasohol91,
            e85: latestData.gasoholE85,
            e20: latestData.gasoholE20
        };

        // ส่งข้อมูลที่จัดรูปแบบแล้วกลับไปยัง client
        res.json(formatData);
    } catch (error) {
        // จัดการกรณีเกิดข้อผิดพลาด
        console.error('Error fetching price data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/apiUpdatePrice', async (req, res) =>{
    const {type,price} = req.body
    console.log(type)
    console.log(price)
    await Price.updateOne({}, { $set: { [type]: price } })
    res.json({message: "ok"})
})
module.exports = router