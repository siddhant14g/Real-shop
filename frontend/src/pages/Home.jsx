import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") navigate("/admin-dashboard");
      else navigate("/client-dashboard");
    } else {
      fetchAds();
    }
  }, [user]);

  const fetchAds = async () => {
    try {
      const res = await api.get("/advertisements");
      setAds(res.data);
    } catch (err) {
      console.error("Failed to fetch ads:", err);
    }
  };

  // Carousel auto-slide
  useEffect(() => {
    if (ads.length > 0) {
      const timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % ads.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [ads]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-indigo-300 via-rose-100 to-indigo-200 text-center">
      
      {/* ===== Hero Section ===== */}
      <div className="flex flex-col items-center justify-center px-4 mt-16 sm:mt-20">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Welcome to <span className="text-indigo-700">OnlineShop 🛒 </span>
        </h1>
        <p className="text-gray-600 mb-8 max-w-md leading-relaxed text-lg">
          Order directly from your Place.
        </p>

        {/* ===== Advertisement Carousel ===== */}
        {ads.length > 0 && (
          <div className="relative w-full max-w-3xl h-56 sm:h-72 rounded-2xl overflow-hidden shadow-lg mb-8">
            {ads.map((ad, index) => (
              <img
                key={ad._id}
                src={ad.imageUrl}
                alt="Advertisement"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  index === current ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Dots Navigation */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
              {ads.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === current ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* ===== CTA Buttons ===== */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm justify-center mb-8">
          <Link
            to="/login"
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl text-lg font-medium shadow-md hover:shadow-lg transition-all"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl text-lg font-medium shadow-md hover:shadow-lg transition-all"
          >
            Register
          </Link>
        </div>
      </div>

      {/* ===== Footer (Contact Info) ===== */}
      <footer className="w-full bg-pink-50 shadow-inner py-6 mt-10">
        <div className="flex flex-col items-center text-gray-700">
          <p className="font-semibold text-lg">Contact No: Shreyash Gandhi</p>
          <a
            href="tel:+917666326066"
            className="text-indigo-700 hover:underline mt-1 font-medium"
          >
            📞 +91 76663 26066
          </a>
          <p className="text-gray-500 text-sm mt-2">
            © {new Date().getFullYear()} SwapnilKirana. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
