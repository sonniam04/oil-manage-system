const express = require('express');
const router = express.Router();
const Finance = require('../models/financeModel');
const { now } = require('mongoose');

router.post('/apiFinance', async (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(400).json({ message: "Not have data" });
    }
    const { typeFuel, price, fuelAmount, paymentMethod, transactionDate } = data;
    // ตรวจสอบว่า typeFuel, price, fuelAmount, paymentMethod มีค่าหรือไม่
    console.log(typeFuel)
    if (!typeFuel || !price || !fuelAmount || !paymentMethod) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // แทรกข้อมูลลงในฐานข้อมูล
        const result = await Finance.insertOne({
            typeFuel,
            price,
            fuelAmount,
            paymentMethod,
            transactionDate
        });
        return res.status(201).json({ message: "Saved", id: result._id });
    } catch (error) {
        // จัดการข้อผิดพลาดในการแทรกข้อมูล
        console.error("Error inserting data:", error);
        return res.status(500).json({ message: "Error inserting data" });
    }
});

router.get('/apiFinance', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        // ค้นหาข้อมูลของวันนี้ และเรียงตามเวลา

        const dataToday = await Finance.find({
            transactionDate: { $gte: today, $lt: tomorrow }
        }).sort({ transactionDate: 1 });

        const dataYesterday = await Finance.find({
            transactionDate: { $gte: yesterday, $lt: today }
        }).sort({ transactionDate: 1 });
        // แปลงวันที่เป็น "DD/MM/YYYY" แล้วส่งออก
        const formattedDataToday = dataToday.map(item => ({
            typeFuel: item.typeFuel,
            price: item.price,
            fuelAmount: item.fuelAmount,
            paymentMethod: item.paymentMethod,
            transactionDate: new Date(item.transactionDate).toLocaleDateString("en-GB")
        }));

        const formattedDataYesterday = dataYesterday.map(item => ({
            typeFuel: item.typeFuel,
            price: item.price,
            fuelAmount: item.fuelAmount,
            paymentMethod: item.paymentMethod,
            transactionDate: new Date(item.transactionDate).toLocaleDateString("en-GB")
        }));

        res.json({
            today: formattedDataToday,
            yesterday: formattedDataYesterday
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get('/apiFinanceAll', async (req, res) => {
    try {
        const data = await Finance.find({})
        const formattedData = data.map(item => ({
            typeFuel: item.typeFuel,
            price: item.price,
            fuelAmount: item.fuelAmount,
            paymentMethod: item.paymentMethod,
            transactionDate: new Date(item.transactionDate).toLocaleDateString("en-GB")
        }));
        res.json({today: formattedData });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;