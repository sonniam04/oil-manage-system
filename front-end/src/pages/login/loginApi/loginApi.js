export const fetchApi = async (username, password) => {
    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, password: password }),
            credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
            alert("Login Success");
            return data;
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error: " + error.message);
    }
};