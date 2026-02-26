import { useState, useEffect } from "react";
import { socket } from "../../socket";

function FuelTypeC() {
    const [id, setId] = useState("");

    const HandleCancel = () => {
        setId("");
        socket.emit('cancel-request');
    };

    const request = (fuelId) => {
        socket.emit('request', { id: fuelId, socketId: socket.id });
    };

    useEffect(() => {
        socket.on('cancel-now',() => {
            setId("");
        })
        socket.on('response-request', () => {
            setId("");
        });
        return () => {
            socket.off('connect');
            socket.off('response-request');
            socket.off('cancel-now')
        };
    }, []);

    return (
        <div className="flex flex-col justify-center items-center mx-auto pt-20 p-6">
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {id === 'gasohol95' ? (
                    <div id='gasohol95' className="w-full w-[250px] sm:w-[450px] sm:h-[300px] h-[250px] rounded-2xl border border-gray-300 shadow-xl flex flex-col items-center justify-center gap-4 p-4 bg-white transform transition-all hover:scale-105 hover:-translate-y-1">
                        <p className="text-xl font-semibold text-gray-700">Requesting...</p>
                        <button className="bg-red-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-red-600 transition duration-200" onClick={HandleCancel}>
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div id='gasohol95' className="w-full w-[250px] sm:w-[450px] sm:h-[300px] h-[250px] rounded-lg border border-gray-300 shadow-lg flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:translate-y-[-5px] cursor-pointer" onClick={() => { setId("gasohol95"); request("gasohol95"); }}>
                        <img className="w-full h-full object-cover" src="https://d1baueb6wfhxkz.cloudfront.net/60642e1f7a1ad7058bc047e5/large/163608515981581.png" alt="" />
                    </div>
                )}
                {id === 'gasohol91' ? (
                    <div id='gasohol91' className="w-full w-[250px] sm:w-[450px] sm:h-[300px] h-[250px] rounded-2xl border border-gray-300 shadow-xl flex flex-col items-center justify-center gap-4 p-4 bg-white transform transition-all hover:scale-105 hover:-translate-y-1">
                        <p className="text-xl font-semibold text-gray-700">Requesting...</p>
                        <button className="bg-red-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-red-600 transition duration-200" onClick={HandleCancel}>
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div id='gasohol91' className="w-full w-[250px] sm:w-[450px] sm:h-[300px] h-[250px] rounded-lg border border-gray-300 shadow-lg flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:translate-y-[-5px] cursor-pointer" onClick={() => { setId('gasohol91'); request('gasohol91'); }}>
                        <img className="w-full h-full object-cover" src="https://d1baueb6wfhxkz.cloudfront.net/60642e1f7a1ad7058bc047e5/large/1636085123407807.png" alt="" />
                    </div>
                )}
                {id === 'gasoholE85' ? (
                    <div id='gasoholE85' className="w-full w-[250px] sm:w-[450px] sm:h-[300px] h-[250px] rounded-2xl border border-gray-300 shadow-xl flex flex-col items-center justify-center gap-4 p-4 bg-white transform transition-all hover:scale-105 hover:-translate-y-1">
                        <p className="text-xl font-semibold text-gray-700">Requesting...</p>
                        <button className="bg-red-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-red-600 transition duration-200" onClick={HandleCancel}>
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div id='gasoholE85' className="w-full w-[250px] sm:w-[450px] sm:h-[300px] h-[250px] rounded-lg border border-gray-300 shadow-lg flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:translate-y-[-5px] cursor-pointer" onClick={() => { setId('gasoholE85'); request('gasoholE85'); }}>
                        <img className="w-full h-full object-cover" src="https://d1baueb6wfhxkz.cloudfront.net/60642e1f7a1ad7058bc047e5/large/1636085431577284.png" alt="" />
                    </div>
                )}
                {id === 'gasoholE20' ? (
                    <div id='gasoholE20' className="w-full w-[250px] sm:w-[450px] sm:h-[300px] h-[250px] rounded-2xl border border-gray-300 shadow-xl flex flex-col items-center justify-center gap-4 p-4 bg-white transform transition-all hover:scale-105 hover:-translate-y-1">
                        <p className="text-xl font-semibold text-gray-700">Requesting...</p>
                        <button className="bg-red-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-red-600 transition duration-200" onClick={HandleCancel}>
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div id='gasoholE20' className="w-full w-[250px] sm:w-[450px] sm:h-[300px] h-[250px] rounded-lg border border-gray-300 shadow-lg flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:translate-y-[-5px] cursor-pointer" onClick={() => { setId('gasoholE20'); request('gasoholE20'); }}>
                        <img className="w-full h-full object-cover" src="https://d1baueb6wfhxkz.cloudfront.net/60642e1f7a1ad7058bc047e5/large/1636085238467579.png" alt="" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default FuelTypeC;
