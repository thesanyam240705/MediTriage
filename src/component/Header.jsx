import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="flex justify-between items-center px-12 py-5">
        
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center text-blue-900 font-bold text-xl cursor-pointer"
        >
          💙 <span className="ml-2">MediTriage</span>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex gap-8 text-gray-700 font-medium">
            <button onClick={() => navigate("/")} className="hover:text-blue-900">
              Home
            </button>
            <button className="hover:text-blue-900">How It Works</button>
            <button className="hover:text-blue-900">Hospitals</button>
            <button className="hover:text-blue-900">About</button>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-lg border border-blue-900 text-blue-900 font-semibold hover:bg-blue-50"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-5 py-2 rounded-lg bg-blue-900 text-white font-semibold hover:bg-blue-800"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}