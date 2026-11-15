import { useState, useEffect } from "react";
import { socket } from "../../socket";

function Sidebar({ position }) {
    const [menuItems, setMenuItems] = useState([]);
    const [isOpen, setIsOpen] = useState(true);
    const [stateModel, setStateModel] = useState("");

    useEffect(() => {
        if (position === "Cashier") {
            setMenuItems(["Fuel Dispenser"]);
        } else if (position === "Manager") {
            setMenuItems(["Fuel Dispenser", "Sale Report", "Set Price Fuel", "Fuel Stock"]);
        }

        // โหลดค่าจาก localStorage
        const savedState = localStorage.getItem("sidebarState");
        if (savedState) {
            setIsOpen(JSON.parse(savedState));
        }
    }, [position]);

    // ฟังก์ชั่น toggle Sidebar
    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    // บันทึกสถานะ Sidebar ลง localStorage
    useEffect(() => {
        localStorage.setItem("sidebarState", JSON.stringify(isOpen));
    }, [isOpen]);

    // ฟังก์ชันเปลี่ยนหน้า
    const changePage = (item) => {
        setStateModel(item);
    };

    // ส่งข้อมูลไปยัง socket เมื่อ stateModel เปลี่ยน
    useEffect(() => {
        if (stateModel) {
            console.log("Changing page to:", stateModel);
            socket.emit("changePage", { current: stateModel });
        }
    }, [stateModel]);

    return (
        <div
            className={`${isOpen ? "w-[250px]" : "w-[50px]"
                } h-full bg-gradient-to-b from-blue-500 to-blue-700 fixed top-0 left-0 z-20 border-r-2 border-solid border-gray-500 transition-all duration-300`}
        >
            <div className="w-full flex justify-center p-4">
                {isOpen && (
                    <img
                        src="https://www.pttplc.com/uploads/About/logo_PTT_3.png"
                        alt="Logo"
                        className="w-20"
                    />
                )}
            </div>

            {/* ปุ่ม toggle */}
            <div className="absolute top-4 right-0">
                <button
                    onClick={toggleSidebar}
                    className="bg-blue-600 text-white px-2 py-1 rounded-md shadow-md"
                >
                    {isOpen ? "X" : ">"}
                </button>
            </div>

            {/* เมนู */}
            <div className="mt-8">
                {menuItems.map((item, index) => (
                    <div key={index} className="w-full flex justify-center p-4">
                        {isOpen && (
                            <p className="text-white cursor-pointer" onClick={() => changePage(item)}>
                                {item}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
