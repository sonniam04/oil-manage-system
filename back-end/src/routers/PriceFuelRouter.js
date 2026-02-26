const express = require('express');
const router = express.Router();
const Price = require('../models/PriceModel')
const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeGasPrice() {
    const url = 'https://gasprice.kapook.com/gasprice.php';  // URL ที่ต้องการดึงข้อมูล
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    
    
    const result = [];

    // ดึงข้อมูลจาก article ที่มี class gasprice-ptt
    $('article.gasprice.ptt').each((i, el) => {

        $(el).find('ul li').each((index, li) => {
            const price = $(li).find('em').text().trim(); 
            if (price) {  // ถ้ามีข้อมูลก็เพิ่มลงใน array
                result.push({ price });
            }
        });
    });
    
        // ดึงข้อมูลจาก <em> (ราคาน้ำมัน)
    return result;
}

router.get('/apiPriceFuel', async (req, res) => {
    const data = await scrapeGasPrice()
    const formatData = {
        gasohol95: data[0].price,
        gasohol91: data[3].price,
        E20: data[1].price,
        E85: data[2].price
    }
    res.json(formatData)
})


module.exports = router