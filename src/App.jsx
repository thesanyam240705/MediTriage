export default function App() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 font-sans">

      {/* ================= NAVBAR ================= */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="flex justify-between items-center px-12 py-5">

          {/* LOGO */}
          <div className="flex items-center text-blue-900 font-bold text-xl">
            💙 <span className="ml-2">MediTriage</span>
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-10">

            <div className="flex gap-8 text-gray-700 font-medium">
              <a href="#" className="hover:text-blue-900 transition">Home</a>
              <a href="#" className="hover:text-blue-900 transition">How It Works</a>
              <a href="#" className="hover:text-blue-900 transition">Hospitals</a>
              <a href="#" className="hover:text-blue-900 transition">About</a>
            </div>

            <div className="flex gap-4">
              <button className="px-4 py-2 rounded-lg border border-blue-900 text-blue-900 font-semibold hover:bg-blue-50 transition">
                Login
              </button>
              <button className="px-5 py-2 rounded-lg bg-blue-900 text-white font-semibold shadow-md hover:bg-blue-800 hover:scale-105 transition-all duration-300">
                Register
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
    <section className="flex flex-col lg:flex-row items-center justify-between px-12 pt-10 gap-8">

        {/* LEFT TEXT */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Smart <span className="text-blue-900">AI-Based</span><br />
            Healthcare &<br />
            Emergency Blood<br />
            Support
          </h1>

          <p className="text-gray-600 text-lg mb-8">
            Instant symptom analysis, intelligent severity detection,
            and rapid donor coordination — all in one secure platform.
          </p>

          <div className="flex flex-nowrap items-center gap-6">
            <button className="bg-[#1F8F7A] text-white px-6 py-3 rounded-full font-semibold whitespace-nowrap shadow-[0_10px_25px_rgba(31,143,122,0.35)] hover:bg-[#187665] hover:scale-105 transition-all duration-300">
              🩺 Start Medical Consultation
            </button>

            <button className="bg-[#E53935] text-white px-6 py-3 rounded-full font-semibold whitespace-nowrap shadow-[0_10px_25px_rgba(229,57,53,0.35)] hover:bg-[#C62828] hover:scale-105 transition-all duration-300">
              🩸 Request Blood Urgently
            </button>
          </div>
        </div>

  {/* RIGHT BIG IMAGE */}
<div className="flex-[1.3] flex justify-start relative -ml-8">

  <div className="absolute -z-10 w-96 h-96 bg-blue-200 blur-3xl opacity-30 rounded-full"></div>

  <img
    src="https://blog.cloudxlab.com/wp-content/uploads/2025/03/8.png"
    alt="Healthcare AI"
    className="w-full h-[500px] object-cover shadow-2xl"
  />

</div>
      </section>

      {/* ================= STATS / FEATURE ROW ================= */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-12 px-12 pt-6 pb-10 text-gray-700 font-medium">

        <div className="flex items-center gap-3">
          <span className="text-blue-900 font-bold text-lg">✔ 97% Accuracy</span>
        </div>

        <div className="flex items-center gap-3">
          <span>🤖 AI Powered Decision Prioritisation System</span>
        </div>

        <div className="flex items-center gap-3">
          <span>🔄 Real-Time Donor Matching</span>
        </div>

      </section>

    </div>
  );
}