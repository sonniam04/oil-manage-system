import { useEffect, useState } from 'react';
//components
import Nav from '../../../components/main/navBar';
import Sidebar from '../../../components/main/sideBar';
import FuelTypeM from '../../../components/ManagerComponents/fuelTypeM';
import Dashboard from '../../../components/ManagerComponents/dashboard';
import FuelPriceManager from '../../../components/ManagerComponents/fuelPriceManger';
import FuelStock from '../../../components/ManagerComponents/stock';
//API 
import { fetchGetData } from '../ManagerApi/ManagerMainApi';
//Socket
import { socket } from '../../../socket';

function ManagerMain() {
    const [Username, setUsername] = useState("");
    const [position, setPosition] = useState("");
    const [page, setPage] = useState("Fuel Dispenser")

    useEffect(() => {
        socket.on('page-res', (data) => {
            console.log("Received page update:", data.current);
            setPage(data.current);
        });
        //ย้ายไปหน้าจ่ายน้ำมัน
        const fetchData = async () => {
            const result = await fetchGetData()
            if (result) {

                setUsername(result.user.name);
                setPosition(result.user.position);
            }
        }
        fetchData();
        return () => {
            socket.off('goto-interface');
            socket.off('page-res');
        };
    }, []);
    const userdata = { position, Username };
    return (
        <>
            <Sidebar {...userdata} />
            <Nav {...userdata} />
            {page === 'Fuel Dispenser' ? (
                <FuelTypeM />
            ) : page === 'Set Price Fuel' ? (
                <FuelPriceManager />
            ) : page === 'Fuel Stock' ? (
                <FuelStock />
            ) : (
                <Dashboard />
            )}


        </>
    )
}

export default ManagerMain;