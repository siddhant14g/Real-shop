import axios from "axios";

// Use environment variable for production, fallback to localhost for development
const getApiBaseURL = () => {
  // Check if we're in production (Vercel)
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  // Check if we're on a deployed domain (not localhost)
  if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
    // This will be set after backend deployment
    return "https://your-backend-url.onrender.com/api";
  }
  // Default to localhost for local development
  return "http://localhost:5000/api";
};

const api = axios.create({
  baseURL: getApiBaseURL(),
});

export default api;
// import axios from "axios";

// const LOCAL_IP = "192.168.117.103"; // your Mac IP
// const backendBaseURL =
//   import.meta.env.VITE_API_BASE_URL ||
//   `http://${["localhost", "::1"].includes(window.location.hostname)
//     ? LOCAL_IP
//     : window.location.hostname
//   }:5000`;

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
//    baseURL: "http://192.168.117.103:5000/api",
// });

// export const imageBaseURL = backendBaseURL;
// export default api;

