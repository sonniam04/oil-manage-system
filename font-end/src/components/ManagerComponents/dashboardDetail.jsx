import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function DashboardDetail({ dataProp, data }) {
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [filteredChartData, setFilteredChartData] = useState([]);
    const [date, setDate] = useState();
    const [dataAllChart, setDataAllChart] = useState([]);
    const [dataAll, setDataAll] = useState([]);
    const [displayData, setDisplayData] = useState([])
    const [displayDataChart, setDisplayDataChart] = useState([])
    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
        // Filter data for the selected date
        console.log(dataAll.data[0].transactionDate)
        const filteredData = dataAll.data.filter(item => {
            const formattedTransactionDate = item.transactionDate.split("/").reverse().join("-");
            console.log(formattedTransactionDate===selectedDate) // แปลงเป็น YYYY-MM-DD
            return formattedTransactionDate === selectedDate; // เปรียบเทียบ
        });
        console.log('Filtered Data:', filteredData);  // Log to check the filtered data
        
        if (filteredData.length === 0) {
            console.log('No data for this date');
        }
    
        // Formatting data for display (table)
        const dataFormat = {
            data: filteredData.map(item => ({
                type: item.type,
                sales: parseFloat(item.sales),
                fuelAmount: parseFloat(item.fuelAmount),
                PaymentMethod: item.PaymentMethod,
                transactionDate: item.transactionDate
            }))
        };
        
        // Aggregating data for the chart
        const formattedData = {
            data: Object.values(
                filteredData.reduce((acc, item) => {
                    const type = item.type;
                    const sales = parseFloat(item.sales);
                    if (acc[type]) {
                        acc[type].sales += sales;
                    } else {
                        acc[type] = { type, sales };
                    }
                    return acc;
                }, {})
            )
        };
        console.log(data)
        // Update state after data formatting
        setDisplayData(dataFormat.data);
        setDisplayDataChart(formattedData.data)
        console.log(dataFormat.data)
    };


    useEffect(() => {
        setFilteredTransactions(dataProp);
        setFilteredChartData(data);
    }, [dataProp, data]);

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/apiFinanceAll", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                });

                const result = await response.json();
                if (response.ok) {
                    
                    const formattedData = {
                        data: Object.values(
                            result.today.reduce((acc, item) => {
                                const type = item.typeFuel;
                                const sales = parseFloat(item.price);
                                if (acc[type]) {
                                    acc[type].sales += sales;
                                } else {
                                    acc[type] = { type, sales };
                                }
                                return acc;
                            }, {})
                        )
                    }
                    const formattedData1 = {
                        data: result.today.map(item => ({
                            type: item.typeFuel,
                            sales: parseFloat(item.price),
                            fuelAmount: item.fuelAmount,
                            PaymentMethod: item.paymentMethod,
                            transactionDate: item.transactionDate
                        }))
                    }
                    setDataAllChart(formattedData);
                    setDataAll(formattedData1);
                } else {
                    alert("Error: " + result.message);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Error: " + error.message);
            }
        };

        fetchData();
    }, []);

    // useEffect(() => {
    //     if (date) {
    //         const transactionsForDate = dataAll.filter(item => item.transactionDate === date);
    //         setFilteredTransactions(transactionsForDate);

    //         const aggregatedChartData = transactionsForDate.reduce((acc, item) => {
    //             const type = item.typeFuel;
    //             const sales = item.fuelAmount;

    //             if (acc[type]) {
    //                 acc[type].sales += sales;
    //             } else {
    //                 acc[type] = { type, sales };
    //             }

    //             return acc;
    //         }, {});

    //         setFilteredChartData(Object.values(aggregatedChartData));
    //     }
    // }, [date, dataAll]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            {/* Input Date */}
            <input
                type="date"
                value={date}
                onChange={handleDateChange}
                className="mb-4 p-2 border rounded"
            />

            {/* Container for Chart & Table */}
            <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-[800px]">
                {/* Chart Section */}
                <div className="mb-6 text-center">
                    <h2 className="text-xl font-bold mb-4">{date || "Select a Date"}</h2>
                    {data.length > 0 && !date? (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data}>
                                <XAxis dataKey="type" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="sales" fill="#facc15" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={displayDataChart}>
                                <XAxis dataKey="type" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="sales" fill="#facc15" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto">
                    {filteredTransactions.length > 0 ? (
                        <table className="min-w-full table-auto border-collapse text-center">
                            <thead>
                                <tr className="border-b bg-gray-200">
                                    <th className="px-4 py-2">Type</th>
                                    <th className="px-4 py-2">Price</th>
                                    <th className="px-4 py-2">Fuel Amount</th>
                                    <th className="px-4 py-2">Payment Method</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(date ? displayData : filteredTransactions).map((item, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="px-4 py-2">{item.type}</td>
                                        <td className="px-4 py-2">{item.sales}</td>
                                        <td className="px-4 py-2">{item.fuelAmount}</td>
                                        <td className="px-4 py-2">{item.PaymentMethod}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500 mt-4">No transactions found for the selected date.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DashboardDetail;
