import { useState, useEffect } from "react";

function FuelPriceManager() {
    // State สำหรับเก็บราคาน้ำมัน
    const [gasohol95, setGasohol95] = useState(0);
    const [gasohol91, setGasohol91] = useState(0);
    const [e85, setE85] = useState(0);
    const [e20, setE20] = useState(0);

    // State ราคาที่ตั้งโดยปั๊ม
    const [rgasohol95, setRGasohol95] = useState(32.50);
    const [rgasohol91, setRGasohol91] = useState(30.00);
    const [re85, setRE85] = useState(20.00);
    const [re20, setRE20] = useState(25.50);

    // State สำหรับช่องกรอกราคา
    const [inputPrices, setInputPrices] = useState({
        gasohol95: rgasohol95,
        gasohol91: rgasohol91,
        gasoholE85: re85,
        gasoholE20: re20,
    });

    // ฟังก์ชันเปลี่ยนค่า input
    const handlePriceChange = (e, title) => {
        const newPrice = parseFloat(e.target.value);
        setInputPrices((prev) => ({ ...prev, [title]: newPrice }));
    };

    // ฟังก์ชันบันทึกข้อมูล
    const savePrice = async (title) => {
        const newPrice = inputPrices[title];
        try {
            const response = await fetch("http://localhost:3000/apiUpdatePrice", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: title, price: newPrice }),
                credentials: "include",
            });

            const result = await response.json();
            if (response.ok) {
                alert(`บันทึก ${title} สำเร็จ!`);
                // อัปเดตค่าที่ปั๊มตั้ง
                switch (title) {
                    case "gasohol95": setRGasohol95(newPrice); break;
                    case "gasohol91": setRGasohol91(newPrice); break;
                    case "gasoholE85": setRE85(newPrice); break;
                    case "gasoholE20": setRE20(newPrice); break;
                    default: break;
                }
            } else {
                alert("Error: " + result.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error: " + error.message);
        }
    };

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch("http://localhost:3000/apiPrice", { credentials: "include" });
                const result = await response.json();
                if (response.ok) {
                    setRGasohol95(result.gasohol95);
                    setRGasohol91(result.gasohol91);
                    setRE85(result.e85);
                    setRE20(result.e20);
                }
            } catch (error) {
                console.error("Error:", error);
            }

            try {
                const response = await fetch("http://localhost:3000/apiPriceFuel", { credentials: "include" });
                const result = await response.json();
                if (response.ok) {
                    setGasohol95(parseFloat(result.gasohol95));
                    setGasohol91(parseFloat(result.gasohol91));
                    setE85(parseFloat(result.E85));
                    setE20(parseFloat(result.E20));
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchPrices();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center mx-auto pt-20 p-6">
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {[
                    { name: "Gasohol 95", key: "gasohol95", price: gasohol95, rPrice: rgasohol95 },
                    { name: "Gasohol 91", key: "gasohol91", price: gasohol91, rPrice: rgasohol91 },
                    { name: "e85", key: "gasoholE85", price: e85, rPrice: re85 },
                    { name: "e20", key: "gasoholE20", price: e20, rPrice: re20 },
                ].map((fuel) => (
                    <div key={fuel.key} className="flex flex-col items-center justify-center p-6 bg-gray-100 h-[300px]">
                        <h1 className="text-2xl font-bold mb-6">{fuel.name}</h1>

                        {/* แสดงราคาน้ำมันกลาง */}
                        <div className="mb-4">
                            <p className="text-lg">ราคาน้ำมันกลาง: ฿{fuel.price.toFixed(2)}</p>
                        </div>

                        {/* แสดงราคาน้ำมันที่ปั๊มตั้ง */}
                        <div className="mb-4">
                            <p className="text-lg">ราคาน้ำมันที่ตั้งโดยปั๊ม: ฿{fuel.rPrice.toFixed(2)}</p>
                        </div>

                        {/* ช่องกรอกราคา */}
                        <div className="mb-4">
                            <input
                                type="number"
                                value={inputPrices[fuel.key]}
                                onChange={(e) => handlePriceChange(e, fuel.key)}
                                className="p-2 border rounded"
                                min={fuel.price * 0.98}
                                max={fuel.price * 1.02}
                            />
                            <p className="text-sm text-gray-500">กรอกราคาใหม่ (ไม่เกิน 2% ของราคากลาง)</p>
                        </div>

                        {/* ปุ่มบันทึก */}
                        <button
                            onClick={() => savePrice(fuel.key)}
                            className="bg-blue-500 text-white p-2 rounded"
                        >
                            บันทึก
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FuelPriceManager;
