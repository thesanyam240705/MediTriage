import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 font-sans">

      {/* HERO */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-12 pt-16 gap-10">

        {/* LEFT TEXT */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            About <span className="text-blue-900">MediTriage</span>
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            MediTriage is an intelligent healthcare support platform designed to
            help people quickly assess medical symptoms and connect with blood
            donors during emergencies.
          </p>

          <p className="text-gray-600 text-lg mb-6">
            Our AI-driven triage system analyzes symptoms to determine the
            severity of a medical situation and suggests the most appropriate
            action — whether self-care, doctor consultation, or immediate
            emergency attention.
          </p>

          <p className="text-gray-600 text-lg mb-8">
            In parallel, MediTriage solves a critical problem in emergency
            healthcare: finding blood donors quickly. The platform enables
            real-time donor matching, helping patients access compatible blood
            faster when every second matters.
          </p>

          <button
            className="bg-blue-900 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-800 transition-all duration-300"
            onClick={() => navigate("/consultation")}
          >
            Try the AI Consultation
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-[1.2] flex justify-center relative">
          <div className="absolute -z-10 w-96 h-96 bg-blue-200 blur-3xl opacity-30 rounded-full"></div>

          <img
            src="https://tediselmedical.com/wp-content/uploads/2023/02/5_tendencias_tecnologicas_sanidad_2022_pic01_20230223_blog_tedisel_medical-1170x624.jpg"
            alt="Healthcare Technology"
            className="w-full h-[450px] object-cover rounded-xl shadow-2xl"
          />
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="px-12 py-16 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">
          Our Mission
        </h2>

        <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
          Our mission is to make healthcare assistance faster, smarter, and more
          accessible using artificial intelligence. By combining symptom
          analysis with real-time blood donor coordination, MediTriage aims to
          reduce delays in medical response and ensure that critical patients
          receive help when they need it the most.
        </p>
      </section>

      {/* FEATURES */}
      <section className="px-12 pb-20">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
          What Makes MediTriage Powerful
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">
              🤖 AI Symptom Analysis
            </h3>
            <p className="text-gray-600">
              Advanced AI models evaluate symptoms to determine urgency and
              recommend the next medical action.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">
              🩸 Emergency Blood Requests
            </h3>
            <p className="text-gray-600">
              Instantly connect patients with compatible blood donors during
              emergencies through smart matching.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">
              ⚡ Fast Decision Support
            </h3>
            <p className="text-gray-600">
              Helps patients make informed healthcare decisions quickly and
              reduces unnecessary hospital visits.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}