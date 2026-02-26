import React, { useEffect, useState } from 'react';
//components
import Nav from '../../../components/main/navBar';
import Sidebar from '../../../components/main/sideBar';
import FuelTypeC from '../../../components/CashierComponents/fuelTypeC';
import NumberPad from '../../../components/CashierComponents/fuelDispenser';
//API
import { fetchGetData } from '../CashierApi/mainApi';
//Socket
import { socket } from '../../../socket';

function CashierPage() {
    const [Username, setUsername] = useState("");
    const [position, setPosition] = useState("");
    const [currentState, setCurrentState] = useState("");
    const user = { position, Username };
    const [FuelType, setFuelType] = useState("");
    useEffect(() => {
        socket.on('page-res', (data) => {
            console.log("Received page update:", data.current);
            setPage(data.current);
        });
        //ย้ายไปหน้าจ่ายน้ำมัน
        socket.on('goto-interface', (data) => {
            setCurrentState("State");
            console.log(111)
            setFuelType(data.id)
        });
        const fetchData = async () => {
            const result = await fetchGetData();
            if (result) {
                setUsername(result.user.name);
                setPosition(result.user.position);
            }
        };
        fetchData();
        return () => {
            socket.off('goto-interface');
            socket.off('page-res'); 
        };
    }, []);

    return (
        <>
            <Sidebar {...user} />
            <Nav {...user} />
            {currentState === 'State' ? (<NumberPad FuelType={FuelType} />) : (<FuelTypeC />)}
        </>
    );
}

export default CashierPage;
