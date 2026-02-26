import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//API
import { fetchApi } from '../loginApi/loginApi';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert("Enter Username and Password");
            return;
        }

        const result = await fetchApi(username, password);
        if (result) {
            navigate(`/main/${result.payload}`);
        } else {
            alert("Login Failed: " + result.message);
        }

        setUsername("");
        setPassword("");
    };

    return (
        <div className="w-[400px] h-[500px] bg-white rounded-2xl shadow-xl flex flex-col justify-center items-center mx-auto mt-20 p-6">
            <h2 className="text-2xl font-semibold mb-6">Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white rounded-xl py-3 hover:bg-green-600 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
