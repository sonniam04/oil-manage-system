import { useEffect, useState } from "react";
import { socket } from "../../socket";
function FuelTypeM() {
    const [id, setId] = useState("")
    const [socketId, setSocketId] = useState("");
    const cancelHandle = () => {
        socket.emit('cancel-res')
        setId("")
    }
    const acceptHandle = () => {
        socket.emit('goto-interface-confirm', { id: id })
        setId("")
    }
    useEffect(() => {
        socket.on('request-Fuel', (data) => {
            setId(data.id)
        });
        socket.on('cancel-Fuel', () => {
            setId("")
        })
        return () => {
            socket.off('connect');
            socket.off('cancel-Fuel');
            socket.off('request-Fuel');
        };
    }, []);
    return (
        <div className="flex flex-col justify-center items-center mx-auto pt-20 p-6">
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {id === 'gasohol95' ? (
                    <div className="w-full w-[250px] sm:w-[450px] sm:h-[300px] h-[250px] rounded-lg border border-gray-300 shadow-lg flex items-center justify-center">
                        <p className="text-xl font-semibold text-gray-700">Have Request...</p>
                        <div>
                            <button className="bg-red-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-red-600 transition duration-200" onClick={acceptHandle}>
                                Accept
                            </button>
                            <button className="bg-red-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-red-600 transition duration-200" onClick={cancelHandle} >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (<div className="w-full w-[250px] sm:w-[450px] sm:h-[300px] h-[250px] rounded-lg border border-gray-300 shadow-lg flex items-center justify-center">
                    <img className="w-full h-full object-cover" src="https://d1baueb6wfhxkz.cloudfront.net/60642e1f7a1ad7058bc047e5/large/163608515981581.png" alt="" />
                </div>)}
                {id === 'gasohol91' ? (
                    <div className="w-full w-[250px] sm:w-[450px] sm:h-[300px] h-[250px] rounded-lg border border-gray-300 shadow-lg flex items-center justify-center">
                        <p className="text-xl font-semibold text-gray-700">Have Request...</p>
                        <div>
                            <button className="bg-red-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-red-600 transition duration-200" onClick={acceptHandle}>
                                Accept
                            </button>
                            <button className="bg-red-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-red-600 transition duration-200" onClick={cancelHandle} >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (<div className="w-full w-[250px] sm:w-[450px] sm:h-[300px] h-[250px] rounded-lg border border-gray-300 shadow-lg flex items-center justify-center">
                    <img className="w-full h-full object-cover" src="https://d1baueb6wfhxkz.cloudfront.net/60642e1f7a1ad7058bc047e5/large/1636085123407807.png" alt="" />
                </div>)}
                {id === 'gasoholE85' ? (
                    <div className="w-full w-[250px] sm:w-[450px] sm:h-[300px] h-[250px] rounded-lg border border-gray-300 shadow-lg flex items-center justify-center">
                        <p className="text-xl font-semibold text-gray-700">Have Request...</p>
                        <div>
                            <button className="bg-red-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-red-600 transition duration-200" onClick={acceptHandle}>
                                Accept
                            </button>
                            <button className="bg-red-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-red-600 transition duration-200" onClick={cancelHandle}>
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (<div className="w-full w-[250px] sm:w-[450px] sm:h-[300px] h-[250px] rounded-lg border border-gray-300 shadow-lg flex items-center justify-center">
                    <img className="w-full h-full object-cover" src="https://d1baueb6wfhxkz.cloudfront.net/60642e1f7a1ad7058bc047e5/large/1636085431577284.png" alt="" />
                </div>)}
                {id === 'gasoholE20' ? (
                    <div className="w-full w-[250px] sm:w-[450px] sm:h-[300px] h-[250px] rounded-lg border border-gray-300 shadow-lg flex items-center justify-center">
                        <p className="text-xl font-semibold text-gray-700">Have Request...</p>
                        <div>
                            <button className="bg-red-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-red-600 transition duration-200" onClick={acceptHandle}>
                                Accept
                            </button>
                            <button className="bg-red-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-red-600 transition duration-200" onClick={cancelHandle} >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (<div className="w-full w-[250px] sm:w-[450px] sm:h-[300px] h-[250px] rounded-lg border border-gray-300 shadow-lg flex items-center justify-center">
                    <img className="w-full h-full object-cover" src="https://d1baueb6wfhxkz.cloudfront.net/60642e1f7a1ad7058bc047e5/large/1636085238467579.png" alt="" />
                </div>)}
            </div>
        </div>
    );
}


export default FuelTypeM;