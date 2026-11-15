import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardDetail from './dashboardDetail'; // Import the DashboardDetail component

const ChartComponent = ({ title, data, setView }) => {
  const handleClick = () => {
    setView(title); // Set the view to the clicked chart's title
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-2" onClick={handleClick}>
        {title}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#facc15" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const SalesCharts = ({ data, setView }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
    <ChartComponent title="Today" data={data.today} setView={setView} />
    <ChartComponent title="Yesterday" data={data.yesterday} setView={setView} />
    <ChartComponent title="Last Week" data={data.lastWeek} setView={setView} />
  </div>
);

const Dashboard = () => {
  const [data, setData] = useState({
    today: [],
    yesterday: [],
    lastWeek: [],
  });
  const [dataProp, setDataProp] = useState({});  // Fix the dataProp state
  const [view, setView] = useState(""); // To handle the view state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/apiFinance", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
        });

        const result = await response.json();
        if (response.ok) {
          // ✅ จัดรูปแบบข้อมูลก่อนตั้งค่า
          const formattedData = {
            today: Object.values(
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
            ),
            yesterday: Object.values(
              result.yesterday.reduce((acc, item) => {
                const type = item.typeFuel;
                const sales = parseFloat(item.price);

                if (acc[type]) {
                  acc[type].sales += sales;
                } else {
                  acc[type] = { type, sales };
                }

                return acc;
              }, {})
            ),
            lastWeek: []  // You can add data for lastWeek similarly
          };

          const formattedData1 = {
            today: result.today.map(item => ({
              type: item.typeFuel,
              sales: parseFloat(item.price),
              fuelAmount: item.fuelAmount,
              PaymentMethod: item.paymentMethod
            })),
            yesterday: result.yesterday.map(item => ({
              type: item.typeFuel,
              sales: parseFloat(item.price),
              fuelAmount: item.fuelAmount,
              paymentMethod: item.paymentMethod
            })),
            lastWeek: []  // You can add data for lastWeek similarly
          };

          setDataProp(formattedData1);
          setData(formattedData);
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

  // Conditional rendering based on the `view` state
  return (
    <div className="p-6 mr-10">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {view === "Today" || view === "Yesterday" || view === "Last Week" ? (
        <DashboardDetail dataProp={dataProp[view.toLowerCase()]} data={data[view.toLowerCase()]} />
      ) : (
        <SalesCharts data={data} setView={setView} />
      )}
    </div>
  );
};

export default Dashboard;
