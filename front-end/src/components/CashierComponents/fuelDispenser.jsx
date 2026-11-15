import { useState, useRef, useEffect } from "react";

function NumberPad({ FuelType }) {
    const [input, setInput] = useState("0");
    const [price, setPrice] = useState(0);
    const [fuelAmount, setFuelAmount] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const startTime = useRef(null);
    const fuelRate = 0.2;
    const [fuelPrice,setFuelPrice] = useState(35);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [typeFuel, setTypeFuel] = useState(FuelType);

    // ฟังก์ชันสำหรับรีเซ็ตข้อมูลทั้งหมด
    const handleReset = () => {
        setPrice(0);
        setInput("0");
        setFuelAmount(0);
    };

    // ฟังก์ชันสำหรับกดตัวเลข
    const handleNumberClick = (number) => {
        setInput((prev) => prev === "0" ? number.toString() : prev + number);
    };

    // ฟังก์ชันสำหรับลบตัวเลข
    const handleBackspace = () => {
        setInput((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    };
    useEffect(() => {
        setTypeFuel(FuelType);
    }, [FuelType]);
    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch("http://localhost:3000/apiPrice", { credentials: "include" });
                const result = await response.json();
                if (response.ok) {
                    switch (FuelType) {
                        case "gasohol95":
                            setFuelPrice(result.gasohol95);
                            break;
                        case "gasohol91":
                            setFuelPrice(result.gasohol91);
                            break;
                        case "gasoholE85":
                            setFuelPrice(result.e85);
                            break;
                        case "gasoholE20":
                            setFuelPrice(result.e20);
                            break;
                        default:
                            console.warn("Unknown fuel type:", FuelType);
                    }
                }
                
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchPrices();
    }, []);

    // ฟังก์ชันสำหรับตกลง
    const handleSubmit = () => {
        const data = {
            typeFuel,
            price: parseFloat(price.toFixed(2)), // แปลงกลับเป็นตัวเลข
            fuelAmount: parseFloat(fuelAmount.toFixed(2)), // แปลงกลับเป็นตัวเลข
            paymentMethod,
            transactionDate: new Date()
        };
        // ฟังก์ชันเพื่อส่งข้อมูลไปยังเซิร์ฟเวอร์
        const fetchGetData = async () => {
            try {
                const response = await fetch("http://localhost:3000/apiFinance", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ data }),
                    credentials: 'include',
                });

                const result = await response.json();

                if (response.ok) {
                    // การตอบกลับจากเซิร์ฟเวอร์สำเร็จ
                    alert("Data submitted successfully");
                } else {
                    // ถ้ามีข้อผิดพลาดจากเซิร์ฟเวอร์
                    alert("Error: " + result.message + "1");
                }
            } catch (error) {
                // จัดการข้อผิดพลาดในกรณีที่การเชื่อมต่อไม่สำเร็จ
                console.error("Error:", error);
                alert("Error: " + error.message);
            }
        };

        fetchGetData();
        handleReset(); // รีเซ็ตข้อมูลหลังจากส่ง
    };

    // ฟังก์ชันเริ่มการจ่ายน้ำมัน
    const startRefuel = () => {
        if (input === '0') {
            startRefuelUnlimited();
        } else {
            startRefuelLimited();
        }
    };

    // ฟังก์ชันเริ่มการจ่ายน้ำมันแบบไม่จำกัด
    const startRefuelUnlimited = () => {
        startTime.current = Date.now();
        const id = setInterval(() => {
            const elapsedTime = (Date.now() - startTime.current) / 1000;
            const refueledAmount = elapsedTime * fuelRate;

            setFuelAmount(refueledAmount);
            setInput((refueledAmount * fuelPrice).toFixed(2).toString());
            setPrice(refueledAmount * fuelPrice);
        }, 100);
        setIntervalId(id);
    };

    // ฟังก์ชันเริ่มการจ่ายน้ำมันแบบจำกัด
    const startRefuelLimited = () => {
        startTime.current = Date.now();
        const targetAmount = parseFloat(input) / fuelPrice;

        const id = setInterval(() => {
            const elapsedTime = (Date.now() - startTime.current) / 1000;
            const refueledAmount = elapsedTime * fuelRate;

            if (refueledAmount >= targetAmount) {
                setFuelAmount(targetAmount);
                setPrice(targetAmount * fuelPrice);
                clearInterval(id);
            } else {
                setFuelAmount(refueledAmount);
                setPrice(refueledAmount * fuelPrice);
            }
        }, 100);

        setIntervalId(id);
    };

    // ฟังก์ชันหยุดการจ่ายน้ำมัน
    const stopRefuel = () => {
        if (intervalId) {
            clearInterval(intervalId); // หยุดการอัปเดตเมื่อปล่อยปุ่ม
        }
        startTime.current = null;
    };


    return (
        <div className="flex flex-col justify-center items-center mx-auto pt-20 p-6">
            <div className="w-full max-w-[300px] mb-4">
                <input
                    type="text"
                    value={parseFloat(input).toFixed(2)}
                    readOnly
                    className="w-full p-4 text-right text-xl border border-gray-300 rounded-lg"
                />
            </div>
            <div className="w-full max-w-[300px] mb-4">
                <input
                    type="text"
                    value={fuelAmount.toFixed(2)} // แสดงจำนวนทศนิยม 2 ตำแหน่ง
                    readOnly
                    className="w-full p-4 text-right text-xl border border-gray-300 rounded-lg"
                />
            </div>

            <div className="grid grid-cols-3 gap-4">
                {[...Array(9)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => handleNumberClick(i + 1)}
                        className="p-4 bg-gray-200 rounded-lg text-xl hover:bg-gray-300 transition"
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => handleNumberClick(0)}
                    className="p-4 bg-gray-200 rounded-lg text-xl hover:bg-gray-300 transition"
                >
                    0
                </button>
                <button
                    onClick={handleBackspace}
                    className="p-4 bg-red-500 text-white rounded-lg text-xl hover:bg-red-600 transition"
                >
                    ลบ
                </button>
                <button
                    onClick={handleSubmit}
                    className="p-4 bg-green-500 text-white rounded-lg text-xl hover:bg-green-600 transition"
                >
                    ตกลง
                </button>
                <button
                    onClick={handleReset}
                    className="p-4 bg-green-500 text-white rounded-lg text-xl hover:bg-green-600 transition"
                >
                    reset
                </button>
                <button
                    onMouseDown={startRefuel} // เริ่มการจ่ายน้ำมันเมื่อกดปุ่ม
                    onMouseUp={stopRefuel} // หยุดการจ่ายน้ำมันเมื่อปล่อยปุ่ม
                    onMouseLeave={stopRefuel} // หยุดการจ่ายน้ำมันเมื่อเมาส์ออกจากปุ่ม
                    className="p-4 bg-blue-500 text-white rounded-lg text-xl hover:bg-blue-600 transition"
                >
                    จ่ายน้ำมัน
                </button>
            </div>

            {/* แสดงปริมาณน้ำมันที่จ่าย */}
            {fuelAmount > 0 && (
                <div className="mt-4">
                    <p>น้ำมันที่จ่ายไป: {fuelAmount.toFixed(2)} ลิตร</p>
                    <p>ราคา: {price.toFixed(2)} บาท</p>
                </div>
            )}

            <div>
                <select
                    name="paymentMethod"
                    id="paymentMethod"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option value="Cash">Cash</option>
                    <option value="Banking">Banking</option>
                    <option value="CreditCard">Credit Card</option>
                </select>
            </div>
        </div>
    );
}

export default NumberPad;
