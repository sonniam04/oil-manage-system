export const fetchGetData = async () => {
    try {
        const response = await fetch("http://localhost:3000/main/Cashier", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            alert("Login Failed: " + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error: " + error.message);
    }
};