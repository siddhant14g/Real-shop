import axios from "axios";

// API Configuration
// For production: Set VITE_API_BASE_URL in Vercel environment variables
// Format: https://your-backend.onrender.com/api
const getApiBaseURL = () => {
  // Priority 1: Environment variable (set in Vercel)
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Priority 2: Auto-detect production (if not localhost)
  if (typeof window !== "undefined" && 
      window.location.hostname !== "localhost" && 
      window.location.hostname !== "127.0.0.1") {
    // Production backend URL (fallback if env variable not set)
    return "https://realshop-backend-z5v4.onrender.com/api";
  }
  
  // Priority 3: Local development
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

