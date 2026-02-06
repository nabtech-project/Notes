const API_URL =
    import.meta.env.MODE === "development"
        ? "http://localhost:5000/api"
        : "https://notes-sk00.onrender.com/api";

export default API_URL;
